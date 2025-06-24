import axios from 'axios';

const getAuthToken = async () => {
  const response = await axios.post(
    'https://api.edu.cdek.ru/v2/oauth/token',
    new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: 'YOUR_CLIENT_ID',
      client_secret: 'YOUR_CLIENT_SECRET',
    }),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );
  return response.data.access_token;
};

const calculateDelivery = async (fromCityId, toCityId, weight) => {
    const token = await getAuthToken();
    const response = await axios.post(
      'https://api.edu.cdek.ru/v2/calculator/tariff',
      {
        from_location: { code: fromCityId }, // Код города (например, 270 — Москва)
        to_location: { code: toCityId },     // Код города (например, 137 — СПб)
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
  };

  const getCities = async (query) => {
    const token = await getAuthToken();
    const response = await axios.get(
      `https://api.edu.cdek.ru/v2/location/cities?city=${query}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  };

  const createOrder = async (orderData) => {
    const token = await getAuthToken();
    const response = await axios.post(
      'https://api.edu.cdek.ru/v2/orders',
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
            code: 270, // Москва
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
  };

  const trackOrder = async (orderId) => {
    const token = await getAuthToken();
    const response = await axios.get(
      `https://api.edu.cdek.ru/v2/orders/${orderId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  };

export { getAuthToken, calculateDelivery, getCities, createOrder, trackOrder };