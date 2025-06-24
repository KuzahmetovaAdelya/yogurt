import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

interface CdekAuthResponse {
    access_token: string;
    expires_in: number;
}

interface CdekResponse<T> {
    data: T;
}

interface CdekError {
    code: string;
    message: string;
    details?: any;
}

@Injectable()
export class CdekService {
    private readonly logger = new Logger(CdekService.name);
    private readonly CDEK_API_URL = 'https://api.edu.cdek.ru/v2';
    private readonly CDEK_CLIENT_ID = 'wqGwiQx0gg8mLtiEKsUinjVSICCjtTEP';
    private readonly CDEK_CLIENT_SECRET = 'RmAmgvSgSl1yirlz9QupbzOJVqhCxcP5';
    private tokenCache: string | null = null;
    private tokenExpiry: number | null = null;

    constructor(private readonly httpService: HttpService) {}

    private handleCdekError(error: any): never {
        const errorResponse = error.response?.data;
        
        if (errorResponse?.errors) {
            // Handle validation errors
            const validationErrors = errorResponse.errors.map((err: any) => ({
                field: err.field || 'unknown',
                message: err.message || 'Validation error',
                code: err.code || 'VALIDATION_ERROR'
            }));
            
            throw new BadRequestException({
                message: 'CDEK validation error',
                errors: validationErrors
            });
        }

        // Handle other types of errors
        const errorMessage = errorResponse?.message || error.message || 'Unknown error';
        const errorCode = errorResponse?.code || 'INTERNAL_ERROR';
        
        this.logger.error('CDEK Error:', {
            message: errorMessage,
            code: errorCode,
            response: errorResponse,
            status: error.response?.status
        });

        throw new BadRequestException({
            message: errorMessage,
            code: errorCode
        });
    }

    private async getAuthToken(): Promise<string> {
        if (this.tokenCache && this.tokenExpiry && Date.now() < this.tokenExpiry) {
            return this.tokenCache;
        }

        try {
            this.logger.debug('Attempting to get CDEK auth token...');
            
            const params = new URLSearchParams();
            params.append('grant_type', 'client_credentials');
            params.append('client_id', this.CDEK_CLIENT_ID);
            params.append('client_secret', this.CDEK_CLIENT_SECRET);

            this.logger.debug(`Request params: ${params.toString()}`);

            const response = await firstValueFrom(
                this.httpService.post<CdekAuthResponse>(
                    `${this.CDEK_API_URL}/oauth/token`,
                    params,
                    {
                        headers: { 
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'application/json'
                        },
                        validateStatus: (status) => status < 500,
                    }
                )
            );

            if (response.status !== 200) {
                this.logger.error(`CDEK Auth Error: Status ${response.status}`, response.data);
                throw new Error(`CDEK Auth failed with status ${response.status}: ${JSON.stringify(response.data)}`);
            }

            this.tokenCache = response.data.access_token;
            this.tokenExpiry = Date.now() + (response.data.expires_in * 1000);
            this.logger.debug('Successfully obtained CDEK auth token');
            return this.tokenCache;
        } catch (error) {
            this.logger.error('CDEK Auth Error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                headers: error.response?.headers,
                config: {
                    url: error.config?.url,
                    method: error.config?.method,
                    headers: error.config?.headers,
                    data: error.config?.data
                }
            });
            throw error;
        }
    }

    async getCities(query: string) {
        try {
            const token = await this.getAuthToken();
            const response = await firstValueFrom(
                this.httpService.get<any>(
                    `${this.CDEK_API_URL}/location/cities?city=${encodeURIComponent(query)}`,
                    { 
                        headers: { 
                            Authorization: `Bearer ${token}`,
                            'Accept': 'application/json'
                        }
                    }
                )
            );
            return response.data;
        } catch (error) {
            this.logger.error('CDEK Cities Error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            throw error;
        }
    }

    async calculateDelivery(fromCityId: number, toCityId: number, weight: number) {
        try {
            this.logger.debug(`Calculating delivery from ${fromCityId} to ${toCityId} with weight ${weight}`);
            const token = await this.getAuthToken();
            
            const requestData = {
                from_location: {
                    code: fromCityId
                },
                to_location: {
                    code: toCityId
                },
                packages: [{
                    weight: weight,
                    length: 10,
                    width: 10,
                    height: 10
                }]
            };

            this.logger.debug(`Request data: ${JSON.stringify(requestData)}`);

            const response = await firstValueFrom(
                this.httpService.post<any>(
                    `${this.CDEK_API_URL}/calculator/tarifflist`,
                    requestData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    }
                )
            );

            this.logger.debug(`Calculation response: ${JSON.stringify(response.data)}`);
            return response.data;
        } catch (error) {
            this.logger.error('CDEK Delivery Calculation Error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                requestData: {
                    fromCityId,
                    toCityId,
                    weight
                }
            });
            throw error;
        }
    }

    async createOrder(orderData: any) {
        try {
            this.logger.debug(`Creating order with data: ${JSON.stringify(orderData)}`);
            
            // Validate required fields in the nested structure
            const requiredFields = {
                recipient: ['name', 'phones', 'email', 'address'],
                'recipient.address': ['code', 'address', 'location'],
                items: []
            };

            // Check recipient fields
            if (!orderData.recipient) {
                throw new BadRequestException({
                    message: 'Missing recipient information',
                    code: 'MISSING_RECIPIENT'
                });
            }

            const missingRecipientFields = requiredFields.recipient.filter(field => !orderData.recipient[field]);
            if (missingRecipientFields.length > 0) {
                throw new BadRequestException({
                    message: 'Missing required recipient fields',
                    errors: missingRecipientFields.map(field => ({
                        field: `recipient.${field}`,
                        message: `Recipient ${field} is required`,
                        code: 'REQUIRED_FIELD'
                    }))
                });
            }

            // Check recipient address fields
            if (!orderData.recipient.address) {
                throw new BadRequestException({
                    message: 'Missing recipient address information',
                    code: 'MISSING_ADDRESS'
                });
            }

            const missingAddressFields = requiredFields['recipient.address'].filter(field => !orderData.recipient.address[field]);
            if (missingAddressFields.length > 0) {
                throw new BadRequestException({
                    message: 'Missing required address fields',
                    errors: missingAddressFields.map(field => ({
                        field: `recipient.address.${field}`,
                        message: `Address ${field} is required`,
                        code: 'REQUIRED_FIELD'
                    }))
                });
            }

            // Check items
            if (!orderData.items || orderData.items.length === 0) {
                throw new BadRequestException({
                    message: 'Order must contain at least one item',
                    code: 'EMPTY_ORDER'
                });
            }

            const token = await this.getAuthToken();

            // Calculate total weight and cost
            const totalWeight = orderData.items.reduce((sum: number, item: any) => sum + (item.weight || 100), 0);
            const totalCost = orderData.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

            // Prepare items with proper cost and payment values
            const preparedItems = orderData.items.map((item: any, index: number) => {
                // Ensure we're using the correct price field
                const itemCost = Number(item.cost || item.price);
                const itemQuantity = Number(item.quantity);
                const itemTotalCost = itemCost * itemQuantity;

                if (isNaN(itemCost) || isNaN(itemQuantity) || isNaN(itemTotalCost)) {
                    this.logger.error('Invalid item values:', {
                        item,
                        cost: itemCost,
                        quantity: itemQuantity,
                        totalCost: itemTotalCost
                    });
                    throw new BadRequestException({
                        message: 'Invalid price or quantity values',
                        code: 'INVALID_VALUES',
                        details: {
                            item,
                            cost: itemCost,
                            quantity: itemQuantity,
                            totalCost: itemTotalCost
                        }
                    });
                }

                return {
                    name: item.name,
                    ware_key: `ITEM_${index + 1}`,
                    quantity: itemQuantity,
                    weight: Math.max(item.weight || 100, 100), // Минимальный вес товара 100г
                    cost: itemCost,
                    amount: itemQuantity,
                    payment: {
                        value: itemTotalCost
                    }
                };
            });

            const requestData = {
                type: 1,
                number: `ORDER_${Date.now()}`,
                tariff_code: 139,
                from_location: {
                    code: 270,
                    address: "ул. Примерная, д. 1"
                },
                to_location: {
                    code: orderData.recipient.address.code,
                    address: orderData.recipient.address.address
                },
                sender: {
                    company: "YEGOURT",
                    name: "Администратор",
                    phones: [{ number: "+79001234567" }],
                    email: "admin@yegourt.com"
                },
                recipient: {
                    name: orderData.recipient.name,
                    phones: [{ number: orderData.recipient.phones[0]?.number }],
                    email: orderData.recipient.email
                },
                packages: [{
                    number: `PACK_${Date.now()}`,
                    weight: Math.max(totalWeight, 1000), // Минимальный вес 1 кг
                    length: 10,
                    width: 10,
                    height: 10,
                    items: preparedItems
                }],
                delivery_recipient_cost: {
                    value: 0
                },
                services: [{
                    code: "INSURANCE",
                    parameter: "1"
                }],
                payment: {
                    value: totalCost
                }
            };

            this.logger.debug(`Order request data: ${JSON.stringify(requestData)}`);

            const response = await firstValueFrom(
                this.httpService.post<any>(
                    `${this.CDEK_API_URL}/orders`,
                    requestData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        validateStatus: (status) => status < 500
                    }
                )
            );

            // Handle successful response (200 or 202)
            if (response.status === 200 || response.status === 202) {
                this.logger.debug(`Order creation response: ${JSON.stringify(response.data)}`);
                
                // Safely extract response data
                const responseData = response.data || {};
                const entity = responseData.entity || {};
                const requests = responseData.requests || [];
                const firstRequest = requests[0] || {};

                if (!entity.uuid) {
                    throw new BadRequestException({
                        message: 'Invalid response from CDEK service',
                        error: 'Missing order UUID in response',
                        response: responseData
                    });
                }

                return {
                    success: true,
                    orderUuid: entity.uuid,
                    requestUuid: firstRequest.request_uuid || null,
                    status: firstRequest.state || 'UNKNOWN',
                    rawResponse: responseData
                };
            }

            // Handle error response
            this.logger.error('CDEK API Error Response:', {
                status: response.status,
                data: response.data
            });
            this.handleCdekError({ response });
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            this.logger.error('CDEK Order Creation Error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            this.handleCdekError(error);
        }
    }
} 