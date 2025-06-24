import axios from 'axios';
import host from './host';

const getAuthToken = async () => {
  try {
    const response = await axios.post(
      'https://api.cdek.ru/v2/oauth/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: 'EMscd6r9JnFiQ3bLoyjJY6eM78JrJceI',
        client_secret: 'PjLZkKBHEiLK3YsjtNrt3TGNG0ahs3kG',
      }),
      {
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('CDEK API Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
    }
    throw error;
  }
};

const calculateDelivery = async (fromCityId: number, toCityId: number, weight: number) => {
    const response = await axios.post(`${host}cdek/calculate`, {
        fromCityId,
        toCityId,
        weight
    });
    return response.data;
};

const getCities = async (query: string) => {
    const response = await axios.get(`${host}cdek/cities?query=${query}`);
    return response.data;
};

const createOrder = async (orderData: any) => {
    try {
        const response = await axios.post(`${host}cdek/orders`, orderData);
        return response.data;
    } catch (error) {
        if (error.response) {
            // Сервер ответил с ошибкой
            throw {
                message: error.message,
                status: error.response.status,
                data: error.response.data
            };
        } else if (error.request) {
            // Запрос был отправлен, но ответ не получен
            throw {
                message: 'Не удалось получить ответ от сервера',
                request: error.request
            };
        } else {
            // Ошибка при настройке запроса
            throw {
                message: 'Ошибка при отправке запроса',
                error: error.message
            };
        }
    }
};

const trackOrder = async (orderId: string) => {
    const token = await getAuthToken();
    const response = await axios.get(
      `https://api.cdek.ru/v2/orders/${orderId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};

export { getAuthToken, calculateDelivery, getCities, createOrder, trackOrder }; 