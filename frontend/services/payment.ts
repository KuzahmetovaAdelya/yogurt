import axios from 'axios';
import host from '../host';

interface PaymentResponse {
    success: boolean;
    data?: any;
    error?: string;
}

export const createPayment = async (
    amount: number,
    description: string,
    orderId: string,
    customer: { full_name: string; email: string; phone: string },
    items: Array<{ name: string; price: number; quantity: number }>
): Promise<PaymentResponse> => {
    console.debug('Creating payment:', { amount, description, orderId, customer, items });

    if (!amount || amount <= 0) {
        throw new Error('Invalid payment amount');
    }
    if (!description) {
        throw new Error('Payment description is required');
    }
    if (!orderId) {
        throw new Error('Order ID is required');
    }
    if (!customer || !customer.email || !customer.phone) {
        throw new Error('Customer info is required');
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
        throw new Error('Items are required');
    }

    try {
        const response = await axios.post(`${host}payment/create`, {
            amount,
            description,
            orderId,
            customer,
            items
        });
        console.debug('Payment created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating payment:', {
            error: error.response?.data || error.message,
            requestData: { amount, description, orderId, customer, items }
        });
        throw error;
    }
};

export const getPaymentStatus = async (paymentId: string): Promise<PaymentResponse> => {
    console.debug('Getting payment status for ID:', paymentId);

    if (!paymentId) {
        throw new Error('Payment ID is required');
    }

    try {
        const response = await axios.get(`${host}payment/status/${paymentId}`);
        console.debug('Payment status retrieved:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error getting payment status:', {
            error: error.response?.data || error.message,
            paymentId
        });
        throw error;
    }
}; 