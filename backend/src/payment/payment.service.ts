import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

interface Customer {
    full_name: string;
    email: string;
    phone: string;
}

interface PaymentItem {
    name: string;
    price: number;
    quantity: number;
}

@Injectable()
export class PaymentService implements OnModuleInit {
    private readonly logger = new Logger(PaymentService.name);
    private readonly shopId: string;
    private readonly secretKey: string;
    private readonly apiUrl = 'https://api.yookassa.ru/v3';

    constructor(private configService: ConfigService) {
        const shopId = "1068846"
        const secretKey = "test_ssVY_xQTKsXSgfWvuMCr2pSfReL3GnpE_IBxXmpIZT8"

        if (!shopId || !secretKey) {
            throw new Error('YooKassa credentials are not configured');
        }

        this.shopId = shopId;
        this.secretKey = secretKey;
    }

    onModuleInit() {
        this.logger.log('PaymentService initialized with shop ID: ' + this.shopId);
    }

    async createPayment(amount: number, description: string, orderId: string, customer: Customer, items: PaymentItem[]) {
        this.logger.debug(`Creating payment for order ${orderId} with amount ${amount}`);
        try {
            const requestData = {
                amount: {
                    value: amount.toFixed(2),
                    currency: 'RUB'
                },
                capture: true,
                confirmation: {
                    type: 'redirect',
                    return_url: 'http://localhost:3000/basket'
                },
                description: description,
                metadata: {
                    orderId: orderId
                },
                receipt: {
                    customer: {
                        full_name: customer.full_name,
                        email: customer.email,
                        phone: customer.phone
                    },
                    items: items.map(item => ({
                        description: item.name,
                        quantity: item.quantity.toFixed(2),
                        amount: {
                            value: item.price.toFixed(2),
                            currency: 'RUB'
                        },
                        vat_code: 1,
                        payment_mode: 'full_prepayment',
                        payment_subject: 'commodity'
                    }))
                }
            };

            this.logger.debug('Payment request data:', requestData);

            const response = await axios.post(
                `${this.apiUrl}/payments`,
                requestData,
                {
                    headers: {
                        'Idempotence-Key': `${orderId}-${Date.now()}`,
                        'Content-Type': 'application/json'
                    },
                    auth: {
                        username: this.shopId,
                        password: this.secretKey
                    }
                }
            );

            this.logger.debug(`Payment created successfully: ${JSON.stringify(response.data)}`);
            return response.data;
        } catch (error) {
            this.logger.error('Error creating payment:', {
                error: error.response?.data || error.message,
                orderId,
                amount
            });
            throw error;
        }
    }

    async getPaymentStatus(paymentId: string) {
        this.logger.debug(`Getting payment status for payment ID: ${paymentId}`);
        try {
            const response = await axios.get(
                `${this.apiUrl}/payments/${paymentId}`,
                {
                    auth: {
                        username: this.shopId,
                        password: this.secretKey
                    }
                }
            );

            this.logger.debug(`Payment status retrieved: ${JSON.stringify(response.data)}`);
            return response.data;
        } catch (error) {
            this.logger.error('Error getting payment status:', {
                error: error.response?.data || error.message,
                paymentId
            });
            throw error;
        }
    }
} 