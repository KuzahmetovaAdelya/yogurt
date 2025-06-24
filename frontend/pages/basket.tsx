import { useRef, useEffect, useState } from "react";
import Header from "../components/Header";
import Bread from "../components/Bread";
import ContactsSection from "../components/ContacsSection";
import Head from "next/head";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import DeliveryForm from "../components/DeliveryForm";
import axios from "axios";
import host from "../host";
import { getPaymentStatus } from '../services/payment';
import { createOrder } from '../forsdeck';

// Use dynamic import with ssr disabled since we're using localStorage
const BasketMainSectionWithNoSSR = dynamic(
    () => import("../components/BasketMainSection"),
    { ssr: false }
);

export default function BasketPage() {
    const router = useRouter();
    const refScrollUp = useRef<HTMLDivElement>(null);
    const [showDeliveryForm, setShowDeliveryForm] = useState(false);
    const [deliveryItems, setDeliveryItems] = useState([]);
    const [success, setSuccess] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth');
        }

        // Проверяем успешную оплату и создаём заказ
        const orderDataStr = localStorage.getItem('orderData');
        const paymentId = localStorage.getItem('paymentId');
        if (orderDataStr && paymentId) {
            getPaymentStatus(paymentId).then(async (res) => {
                if (res.success && res.data.status === 'succeeded') {
                    const orderData = JSON.parse(orderDataStr);
                    const result = await createOrder(orderData);
                    if (result.success) {
                        // Очистить корзину на сервере
                        const userId = localStorage.getItem('user').split(',')[0].split(':')[1];
                        await axios.delete(`${host}basket/clear`, { params: { userId } });
                        
                        // Показать сообщение об успехе
                        setSuccess(true);
                        
                        // Очистить данные о заказе
                        localStorage.removeItem('orderData');
                        localStorage.removeItem('paymentId');

                        // Обновить корзину и скрыть сообщение через 3 секунды
                        setTimeout(() => {
                            setSuccess(false);
                            setRefreshTrigger(t => t + 1);
                        }, 3000);
                    }
                }
            });
        }
    }, [router]);

    function handleScrollUp() {
        refScrollUp.current?.scrollIntoView({behavior: "smooth"})
    }

    const handleBuyClick = async () => {
        try {
            const userId = localStorage.getItem("user").split(",")[0].split(":")[1];
            if (!userId) {
                console.error('User ID not found');
                return;
            }

            // Получаем товары из корзины с сервера
            const response = await axios.get(`${host}basket?userId=${userId}`);
            const basketData = response.data;

            // Преобразуем данные в формат, нужный для формы доставки
            const items = basketData.map(item => ({
                name: item.item.name,
                quantity: item.count,
                weight: 100, // Минимальный вес товара
                price: item.item.discount !== 0 
                    ? Math.ceil(item.item.price - item.item.price / 100 * item.item.discount)
                    : item.item.price
            }));

            setDeliveryItems(items);
            setShowDeliveryForm(true);
        } catch (error) {
            console.error('Error fetching basket items:', error);
        }
    };

    const handleOrderCreated = async (orderId: string) => {
        try {
            const userId = localStorage.getItem("user").split(",")[0].split(":")[1];
            if (!userId) {
                console.error('User ID not found');
                return;
            }

            // Очищаем корзину на сервере
            await axios.delete(`${host}basket/clear`, {
                params: { userId }
            });
            
            setShowDeliveryForm(false);
            setRefreshTrigger(t => t + 1);
        } catch (error) {
            console.error('Error clearing basket:', error);
        }
    };

    return (
        <>
            <Head>
                <meta name="description" content="Корзина интернет магазина аксессуаров YEGOURT" />
                <meta name="keywords" content="yegourt, магазин аксессуаров, yogurt, 3Д, 3D, 3Д печать, 3D печать, интернет магазин, корзина" />
                <title>Yegourt - Корзина</title>
            </Head>
            <div ref={refScrollUp}>
                <Header />
            </div>
            <Bread breadText={"Корзина"} breadSecondText={""} />
            <BasketMainSectionWithNoSSR onBuyClick={handleBuyClick} refreshTrigger={refreshTrigger} />
            {showDeliveryForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-admin-gray rounded-lg p-6 max-w-md w-full mx-4">
                        <DeliveryForm
                            items={deliveryItems}
                            onOrderCreated={handleOrderCreated}
                            onClose={() => setShowDeliveryForm(false)}
                        />
                    </div>
                </div>
            )}
            {success && (
                <div className="fixed top-0 left-0 w-full flex justify-center z-50">
                    <div className="bg-green-500 text-white px-6 py-3 rounded-basket shadow-lg mt-4">
                        Заказ успешно оформлен и оплачен!
                    </div>
                </div>
            )}
            <ContactsSection scrollUp={handleScrollUp} />
        </>
    )
}