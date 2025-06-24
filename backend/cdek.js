const axios = require('axios');

const CDEK_API_URL = 'https://api.edu.cdek.ru/v2';
const CDEK_CLIENT_ID = 'EMscd6r9JnFiQ3bLoyjJY6eM78JrJceI';
const CDEK_CLIENT_SECRET = 'PjLZkKBHEiLK3YsjtNrt3TGNG0ahs3kG';

let tokenCache = null;
let tokenExpiry = null;

const getAuthToken = async () => {
    // Check if we have a valid cached token
    if (tokenCache && tokenExpiry && Date.now() < tokenExpiry) {
        return tokenCache;
    }

    try {
        const response = await axios.post(
            `${CDEK_API_URL}/oauth/token`,
            new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: CDEK_CLIENT_ID,
                client_secret: CDEK_CLIENT_SECRET,
            }),
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }
        );

        // Cache the token
        tokenCache = response.data.access_token;
        tokenExpiry = Date.now() + (response.data.expires_in * 1000);
        return tokenCache;
    } catch (error) {
        console.error('CDEK Auth Error:', error.response?.data || error.message);
        throw error;
    }
};

const getCities = async (query) => {
    try {
        const token = await getAuthToken();
        const response = await axios.get(
            `${CDEK_API_URL}/location/cities?city=${query}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('CDEK Cities Error:', error.response?.data || error.message);
        throw error;
    }
};

const calculateDelivery = async (fromCityId, toCityId, weight) => {
    try {
        const token = await getAuthToken();
        const response = await axios.post(
            `${CDEK_API_URL}/calculator/tariff`,
            {
                from_location: { code: fromCityId },
                to_location: { code: toCityId },
                packages: [{ weight, length: 10, width: 10, height: 10 }],
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('CDEK Delivery Calculation Error:', error.response?.data || error.message);
        throw error;
    }
};

const createOrder = async (orderData) => {
    try {
        const token = await getAuthToken();
        const response = await axios.post(
            `${CDEK_API_URL}/orders`,
            {
                type: 1,
                number: `ORDER_${Date.now()}`,
                tariff_code: 139,
                sender: {
                    company: "YEGOURT",
                    name: "Администратор",
                    phones: [{ number: "+79001234567" }],
                    email: "admin@yegourt.com",
                    address: {
                        code: 270,
                        address: "ул. Примерная, д. 1",
                        location: "Москва"
                    }
                },
                recipient: {
                    name: orderData.recipientName,
                    phones: [{ number: orderData.recipientPhone }],
                    email: orderData.recipientEmail,
                    address: {
                        code: orderData.cityCode,
                        address: orderData.address,
                        location: orderData.city
                    }
                },
                packages: [{
                    number: `PACK_${Date.now()}`,
                    weight: orderData.weight,
                    length: 10,
                    width: 10,
                    height: 10,
                    items: orderData.items.map(item => ({
                        name: item.name,
                        quantity: item.quantity,
                        weight: item.weight,
                        cost: item.price
                    }))
                }]
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('CDEK Order Creation Error:', error.response?.data || error.message);
        throw error;
    }
};

module.exports = {
    getCities,
    calculateDelivery,
    createOrder
}; 