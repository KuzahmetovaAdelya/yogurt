import { Controller, Get, Post, Body, Query, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { CdekService } from './cdek.service';

@Controller('cdek')
export class CdekController {
    private readonly logger = new Logger(CdekController.name);

    constructor(private readonly cdekService: CdekService) {}

    @Get('cities')
    async getCities(@Query('query') query: string) {
        try {
            this.logger.debug(`Getting cities for query: ${query}`);
            const result = await this.cdekService.getCities(query);
            this.logger.debug(`Cities result: ${JSON.stringify(result)}`);
            return result;
        } catch (error) {
            this.logger.error(`Error getting cities: ${error.message}`);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException({
                message: 'Failed to get cities',
                error: error.message
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('calculate')
    async calculateDelivery(
        @Body('fromCityId') fromCityId: number,
        @Body('toCityId') toCityId: number,
        @Body('weight') weight: number
    ) {
        try {
            this.logger.debug(`Calculating delivery from ${fromCityId} to ${toCityId} with weight ${weight}`);
            const result = await this.cdekService.calculateDelivery(fromCityId, toCityId, weight);
            this.logger.debug(`Calculation result: ${JSON.stringify(result)}`);
            return {
                success: true,
                data: result
            };
        } catch (error) {
            this.logger.error(`Error calculating delivery: ${error.message}`);
            if (error instanceof HttpException) {
                const response = error.getResponse() as any;
                throw new HttpException({
                    message: response.message || 'Failed to calculate delivery',
                    error: response.error || error.message,
                    status: error.getStatus()
                }, error.getStatus());
            }
            throw new HttpException({
                message: 'Failed to calculate delivery',
                error: error.message,
                status: HttpStatus.INTERNAL_SERVER_ERROR
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('orders')
    async createOrder(@Body() orderData: any) {
        try {
            this.logger.debug(`Creating order with data: ${JSON.stringify(orderData)}`);
            const result = await this.cdekService.createOrder(orderData);
            this.logger.debug(`Order creation result: ${JSON.stringify(result)}`);

            // Проверяем наличие необходимых полей в ответе
            if (!result || !result.orderUuid) {
                throw new HttpException({
                    message: 'Invalid response from CDEK service',
                    error: 'Missing order UUID in response'
                }, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            return {
                success: true,
                data: {
                    orderUuid: result.orderUuid,
                    requestUuid: result.requestUuid,
                    status: result.status
                }
            };
        } catch (error) {
            this.logger.error(`Error creating order: ${error.message}`);
            
            // Форматируем ошибку для клиента
            if (error instanceof HttpException) {
                const response = error.getResponse() as any;
                throw new HttpException({
                    message: response.message || 'Failed to create order',
                    error: response.error || error.message,
                    status: error.getStatus()
                }, error.getStatus());
            }

            throw new HttpException({
                message: 'Failed to create order',
                error: error.message,
                status: HttpStatus.INTERNAL_SERVER_ERROR
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
} 