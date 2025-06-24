import { useState, useEffect, useRef } from 'react';
import { getCities, calculateDelivery, createOrder } from '../forsdeck';
import { createPayment, getPaymentStatus } from '../services/payment';

interface DeliveryFormProps {
    items: Array<{
        name: string;
        quantity: number;
        weight: number;
        price: number;
    }>;
    onOrderCreated: (orderId: string) => void;
    onClose: () => void;
}

// Добавим глобальное объявление для TS
declare global {
    interface Window {
        YooMoneyCheckoutWidget?: any;
    }
}

export default function DeliveryForm({ items, onOrderCreated, onClose }: DeliveryFormProps) {
    const [city, setCity] = useState('');
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [deliveryCost, setDeliveryCost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [paymentId, setPaymentId] = useState(null);
    const widgetContainerRef = useRef<HTMLDivElement>(null);
    const [showWidget, setShowWidget] = useState(false);

    const totalWeight = items.reduce((sum, item) => sum + (item.weight * item.quantity), 0);
    const totalCost = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalAmount = totalCost + (deliveryCost || 0);

    useEffect(() => {
        if (city.length >= 3) {
            const timer = setTimeout(() => {
                getCities(city).then(data => {
                    setCities(data);
                });
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [city]);

    const handleCitySelect = async (cityData) => {
        setSelectedCity(cityData);
        setCity(cityData.city);
        setCities([]);
        
        try {
            const result = await calculateDelivery(270, cityData.code, totalWeight);
            setDeliveryCost(result.total_sum);
        } catch (error) {
            console.error('Error calculating delivery:', error);
            setError('Ошибка при расчете стоимости доставки');
        }
    };

    const normalizePhone = (phone: string) => {
        let digits = phone.replace(/\D/g, '');
        if (digits.length === 11 && digits[0] === '8') {
            digits = '7' + digits.slice(1);
        }
        if (digits.length === 10) {
            digits = '7' + digits;
        }
        return '+' + digits;
    };

    const handlePayment = async () => {
        try {
            const orderId = `ORDER_${Date.now()}`;
            const description = `Заказ ${orderId} - ${items.map(item => item.name).join(', ')}`;
            const customer = {
                full_name: name,
                email,
                phone: normalizePhone(phone)
            };

            // Формируем orderData заранее
            const formattedPhone = normalizePhone(phone);
            const orderData = {
                type: 1,
                number: orderId,
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
                    name: name,
                    phones: [{ number: formattedPhone }],
                    email: email,
                    address: {
                        code: selectedCity.code,
                        address: address || selectedCity.region,
                        location: selectedCity.city
                    }
                },
                packages: [{
                    number: `PACK_${Date.now()}`,
                    weight: Math.max(totalWeight, 1000),
                    length: 10,
                    width: 10,
                    height: 10,
                    items: items.map(item => ({
                        name: item.name,
                        quantity: item.quantity,
                        weight: Math.max(item.weight, 100),
                        cost: item.price,
                        payment: {
                            value: item.price * item.quantity
                        }
                    }))
                }],
                delivery_recipient_cost: {
                    value: 0
                },
                services: [{
                    code: "INSURANCE",
                    parameter: "1"
                }],
                payment: {
                    value: totalCost + (deliveryCost || 0)
                },
                items: items.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    weight: Math.max(item.weight, 100),
                    cost: item.price,
                    payment: {
                        value: item.price * item.quantity
                    }
                }))
            };

            console.debug('Initiating payment:', {
                orderId,
                description,
                totalAmount,
                customer,
                items
            });
            
            const paymentResponse = await createPayment(totalCost + (deliveryCost || 0), description, orderId, customer, items);
            
            if (paymentResponse.success) {
                const confirmationUrl = paymentResponse.data.confirmation?.confirmation_url;
                if (!confirmationUrl) {
                    throw new Error('Не удалось получить confirmation_url для оплаты');
                }
                setPaymentId(paymentResponse.data.id);
                // Сохраняем orderData и paymentId для создания заказа после оплаты
                localStorage.setItem('orderData', JSON.stringify(orderData));
                localStorage.setItem('paymentId', paymentResponse.data.id);
                window.location.href = confirmationUrl;
                return;
            } else {
                console.error('Payment creation failed:', paymentResponse.error);
                throw new Error(paymentResponse.error || 'Ошибка при создании платежа');
            }
        } catch (error) {
            console.error('Payment error:', {
                error: error.message,
                totalAmount,
                items
            });
            setError('Ошибка при создании платежа');
            throw error;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        console.debug('Starting order submission:', {
            selectedCity,
            items,
            totalAmount
        });

        if (!selectedCity) {
            setError('Пожалуйста, выберите город');
            setLoading(false);
            return;
        }

        if (!items || items.length === 0) {
            setError('Корзина пуста');
            setLoading(false);
            return;
        }

        try {
            await handlePayment();
            // После оплаты пользователь вернётся на return_url, где будет создан заказ
        } catch (error) {
            console.error('Error creating order:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
                errors: error.response?.data?.requests?.[0]?.errors
            });
            
            let errorMessage = 'Ошибка при создании заказа. ';
            
            if (error.response?.data?.requests?.[0]?.errors) {
                const errors = error.response.data.requests[0].errors;
                errorMessage += errors.map(err => err.message).join(', ');
            } else if (error.response?.data?.message) {
                errorMessage += error.response.data.message;
            } else {
                errorMessage += error.message || 'Пожалуйста, попробуйте снова.';
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = selectedCity && name && phone && email && items.length > 0;

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-6 bg-admin-black rounded-lg shadow-md relative">
            <button
                type="button"
                onClick={onClose}
                className="absolute top-2 right-2 text-white hover:text-gray transition"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <h2 className="text-2xl font-bold mb-6">Доставка</h2>
            
            <div className="mb-4">
                <label htmlFor='city' className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer">
                    Город
                </label>
                <input
                    type="text"
                    id='city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket"
                    placeholder="Введите город"
                />
                {cities.length > 0 && (
                    <ul className="mt-2 border rounded-lg">
                        {cities.map((city) => (
                            <li
                                key={city.code}
                                onClick={() => handleCitySelect(city)}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer hover:bg-admin-gray rounded-lg"
                            >
                                {city.city}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="mb-4">
                <label htmlFor='address' className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer">
                    Адрес
                </label>
                <input
                    type="text"
                    value={address}
                    id='address'
                    onChange={(e) => setAddress(e.target.value)}
                    className="font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket"
                    placeholder="Введите адрес"
                />
            </div>

            <div className="mb-4">
                <label htmlFor='name' className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer">
                    Имя
                </label>
                <input
                    type="text"
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket"
                    placeholder="Введите имя"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor='phone' className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer">
                    Телефон
                </label>
                <input
                    type="tel"
                    id='phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket"
                    placeholder="Введите телефон"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor='email' className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer">
                    Email
                </label>
                <input
                    type="email"
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket"
                    placeholder="Введите email"
                    required
                />
            </div>

            {deliveryCost && (
                <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                    <p className="font-bold">Стоимость доставки: {deliveryCost} ₽</p>
                    <p className="font-bold">Итоговая сумма: {totalAmount} ₽</p>
                </div>
            )}

            {error && (
                <div className="mb-4 p-4 bg-red-100 rounded-lg">
                    <p className="font-bold text-red-500">{error}</p>
                </div>
            )}

            <button
                type="submit"
                disabled={loading || !isFormValid}
                className="self-center justify-self-end bg-blue h-9 w-full rounded-basket hover:bg-white hover:text-blue transition"
            >
                {loading ? 'Оформление заказа...' : 'Оформить заказ'}
            </button>
        </form>
    );
}