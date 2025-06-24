import BasketCard from "./BasketCard"
import SmallCard from "./SmallCard"
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import host from "../host";

interface Item {
    id: number;
    name: string;
    price: number;
    discount: number;
    type: string;
    material: string;
    description: string;
    image: string[];
}

interface BasketItem {
    id: number;
    userId: number;
    itemId: number;
    count: number;
    item: Item;
}

interface BasketMainSectionProps {
    onBuyClick: () => void;
    refreshTrigger: number;
}

const BasketMainSection: React.FC<BasketMainSectionProps> = ({ onBuyClick, refreshTrigger }) => {
    const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
    const [otherItems, setOtherItems] = useState<Item[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const calculateTotalPrice = (items: BasketItem[]) => {
        return items.reduce((sum, basketItem) => {
            const item = basketItem.item;
            const price = item.discount !== 0 
                ? Math.ceil(item.price - item.price / 100 * item.discount)
                : item.price;
            return sum + (price * basketItem.count);
        }, 0);
    };

    const fetchBasketItems = useCallback(async () => {
        try {
            const userId = localStorage.getItem("user")?.split(",")[0]?.split(":")[1];
            if (!userId) return;

            // Получаем товары из корзины
            const basketResponse = await axios.get(`${host}basket?userId=${userId}`);
            const basketData = basketResponse.data;
            setBasketItems(basketData);

            // Получаем все товары для рекомендаций
            const itemsResponse = await axios.get(`${host}items`);
            const allItems = itemsResponse.data;

            // Фильтруем товары, которых нет в корзине
            const basketItemIds = basketData.map((item: BasketItem) => item.itemId);
            const otherItems = allItems
                .filter((item: Item) => !basketItemIds.includes(item.id))
                .slice(0, 4);
            setOtherItems(otherItems);

            // Рассчитываем общую стоимость
            const total = calculateTotalPrice(basketData);
            setTotalPrice(total);
        } catch (error) {
            console.error('Error fetching basket items:', error);
        }
    }, []);

    useEffect(() => {
        fetchBasketItems();
    }, [refreshTrigger, fetchBasketItems]);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`${host}basket/${id}`);
            await fetchBasketItems(); // Обновляем корзину после удаления
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleUpdateCount = async (basketId: number, newCount: number) => {
        try {
            const userId = localStorage.getItem("user")?.split(",")[0]?.split(":")[1];
            if (!userId) {
                console.error('User ID not found');
                return;
            }

            const basketItem = basketItems.find(item => item.id === basketId);
            if (!basketItem) {
                // Элемент не найден — обновляем корзину
                await fetchBasketItems();
                return;
            }

            await axios.put(`${host}basket/update`, {
                id: basketId,
                userId: Number(userId),
                itemId: basketItem.itemId,
                count: newCount
            });
            await fetchBasketItems(); // Обновляем корзину после изменения количества
        } catch (error) {
            await fetchBasketItems();
            console.error('Error updating count:', error);
        }
    };

    return (
        <div className="w-phone mx-auto mb-20 lg:w-tablet xl:w-notepad 2xl:w-desktop">
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
                {basketItems.map((basketItem) => (
                    <BasketCard 
                        key={basketItem.id} 
                        basketId={basketItem.id}
                        item={basketItem.item} 
                        onQuantityChange={handleUpdateCount}
                        initialQuantity={basketItem.count}
                        onDelete={() => handleDelete(basketItem.id)}
                    />
                ))}
            </div>
            
            <div className="mt-12 lg:mt-10">
                <h3 className="text-gray text-2xl font-medium tracking-tighter 2xl:text-p-lg">Итого</h3>
                <p className="text-white text-number font-bold tracking-tighter 2xl:text-number-lg">{totalPrice}</p>
                <a 
                    className={`flex items-center mx-auto w-max mt-5 group ${basketItems.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} lg:justify-start lg:mx-0`}
                    onClick={basketItems.length > 0 ? onBuyClick : undefined}
                >
                    {basketItems.length !== 0 && 
                    <p className={`text-white font-medium text-button rounded-button border-white border-2 py-2.5 w-max ${basketItems.length > 0 && 'px-120 group-hover:bg-white group-hover:text-gray'} lg:text-2xl lg:py-5`}>
                        Купить
                    </p>
                    }
                    {basketItems.length === 0 &&
                    <p className={`text-white font-medium text-button rounded-button border-white border-2 py-2.5 w-max px-90 lg:text-2xl lg:py-5`}>
                        Корзина пуста
                    </p>
                    }
                    <div className={`border-white border-2 rounded-full p-2.5 ${basketItems.length > 0 && 'group-hover:bg-white'} lg:p-4`}>
                        <img src="/arrow.svg" className={`w-25 h-25 ${basketItems.length > 0 && 'group-hover:invert group-hover:opacity-40'} lg:w-43 lg:h-43`}></img>
                    </div>
                </a>
            </div>

            <div className="hidden lg:block lg:w-tablet lg:overflow-auto styled-overflow xl:hidden 2xl:w-desktop lg:mt-16">
                <p className="hidden lg:block lg:text-p-lg lg:text-gray lg:font-normal lg:mb-5">Другие товары</p>
                <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:w-max lg:mb-2.5 xl:w-notepad 2xl:w-desktop">
                    {otherItems.map((item) => (
                        <SmallCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BasketMainSection;