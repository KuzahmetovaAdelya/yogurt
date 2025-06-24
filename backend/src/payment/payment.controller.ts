import { Controller, Post, Body, Get, Param, Logger, BadRequestException } from '@nestjs/common';
import { PaymentService } from './payment.service';

interface CreatePaymentDto {
    amount: number;
    description: string;
    orderId: string;
    customer: {
        full_name: string;
        email: string;
        phone: string;
    };
    items: Array<{
        name: string;
        price: number;
        quantity: number;
    }>;
}

@Controller('payment')
export class PaymentController {
    private readonly logger = new Logger(PaymentController.name);

    constructor(private readonly paymentService: PaymentService) {}

    @Post('create')
    async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
        this.logger.debug('Creating payment with data:', createPaymentDto);

        if (!createPaymentDto.amount || createPaymentDto.amount <= 0) {
            throw new BadRequestException('Invalid amount');
        }
        if (!createPaymentDto.description) {
            throw new BadRequestException('Description is required');
        }
        if (!createPaymentDto.orderId) {
            throw new BadRequestException('Order ID is required');
        }
        if (!createPaymentDto.customer || !createPaymentDto.customer.email || !createPaymentDto.customer.phone) {
            throw new BadRequestException('Customer info is required');
        }
        if (!createPaymentDto.items || !Array.isArray(createPaymentDto.items) || createPaymentDto.items.length === 0) {
            throw new BadRequestException('Items are required');
        }

        try {
            const payment = await this.paymentService.createPayment(
                createPaymentDto.amount,
                createPaymentDto.description,
                createPaymentDto.orderId,
                createPaymentDto.customer,
                createPaymentDto.items
            );

            this.logger.debug('Payment created successfully:', payment);

            return {
                success: true,
                data: payment
            };
        } catch (error) {
            this.logger.error('Error creating payment:', {
                error: error.message,
                requestData: createPaymentDto
            });

            return {
                success: false,
                error: error.message || 'Failed to create payment'
            };
        }
    }

    @Get('status/:paymentId')
    async getPaymentStatus(@Param('paymentId') paymentId: string) {
        this.logger.debug('Getting payment status for ID:', paymentId);

        if (!paymentId) {
            throw new BadRequestException('Payment ID is required');
        }

        try {
            const status = await this.paymentService.getPaymentStatus(paymentId);
            
            this.logger.debug('Payment status retrieved:', status);

            return {
                success: true,
                data: status
            };
        } catch (error) {
            this.logger.error('Error getting payment status:', {
                error: error.message,
                paymentId
            });

            return {
                success: false,
                error: error.message || 'Failed to get payment status'
            };
        }
    }
} 