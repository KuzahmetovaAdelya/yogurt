import React, { useState, useEffect } from 'react';
import axios from 'axios';
import host from '../host';

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

interface BasketCardProps {
    basketId: number;
    item: Item;
    onQuantityChange: (basketId: number, quantity: number) => void;
    initialQuantity: number;
    onDelete: () => void;
}

export default function BasketCard({ basketId, item, onQuantityChange, initialQuantity, onDelete }: BasketCardProps) {
    const [quantity, setQuantity] = useState(initialQuantity);

    useEffect(() => {
        setQuantity(initialQuantity);
    }, [initialQuantity]);

    const handleDelete = async () => {
        try {
            const userId = localStorage.getItem("user").split(",")[0].split(":")[1];
            if (!userId) return;

            // Получаем ID записи в корзине
            const response = await axios.get(`${host}basket?userId=${userId}`);
            const basketItem = response.data.find((basketItem: any) => basketItem.itemId === item.id);
            
            if (basketItem) {
                await axios.delete(`${host}basket/${basketItem.id}`);
                onDelete(); // Вызываем функцию обновления данных
            }
        } catch (error) {
            console.error('Error deleting from basket:', error);
        }
    };

    const handleQuantityChange = async (change: number) => {
        const newQuantity = Math.max(1, quantity + change);
        setQuantity(newQuantity);
        onQuantityChange(basketId, newQuantity);
    };

    return (
        <div className="flex justify-between gap-3.5 mb-5 mt-5 flex-col 2xl:gap-0">
            <div className="2xl:relative">
                <div className="hero-main w-40 h-44 mb-5 lg:w-full lg:h-80">
                    <div className="bg-black flex justify-center items-center h-44 w-full lg:h-80">
                        {item.image && item.image[0] ? (
                            <img src={`http://localhost:3001/images/${item.image[0]}`} className="w-full h-full" />
                        ) : (
                            <div className="w-full h-full bg-gray"></div>
                        )}
                    </div>
                    <div className="hero-under"></div>
                </div>

                <div className="flex gap-1 *:cursor-pointer 2xl:absolute 2xl:right-0">
                    <div 
                        className="border-white border-2 py-2.5 px-4 rounded-basket group hover:bg-white"
                        onClick={() => handleQuantityChange(-1)}
                    >
                        <p className="text-white text-base font-medium tracking-tighter group-hover:text-gray">-</p>
                    </div>
                    <div className="border-white border-2 py-2.5 px-7 rounded-basket group hover:bg-white">
                        <p className="text-white text-base font-medium tracking-tighter group-hover:text-gray">{quantity}</p>
                    </div>
                    <div 
                        className="border-white border-2 py-2.5 px-4 rounded-basket group hover:bg-white"
                        onClick={() => handleQuantityChange(1)}
                    >
                        <p className="text-white text-base font-medium tracking-tighter group-hover:text-gray">+</p>
                    </div>
                </div>
            </div>

            <div>
                <h4 className="text-white text-p uppercase font-medium tracking-tighter mb-5 lg:text-2xl lg:w-220 2xl:text-lg">{item.name}</h4>
                {item.discount !== 0 ? (
                    <>
                        <p className="text-gray text-2xl font-bold tracking-tighter line-through">{item.price} Р</p>
                        <p className="text-white text-number font-bold tracking-tighter lg:text-big-para">
                            {Math.ceil(item.price - item.price / 100 * item.discount)} Р
                        </p>
                    </>
                ) : (
                    <p className="text-white text-number font-bold tracking-tighter lg:text-big-para">{item.price} Р</p>
                )}
                <p className="text-white text-p font-medium tracking-tighter opacity-80 h-11 text-ellipsis overflow-hidden w-44 mb-5 lg:w-full lg:h-max">{item.description}</p>
                <div 
                    className="p-1.5 border-white border-2 rounded-basket w-max group hover:bg-white cursor-pointer"
                    onClick={handleDelete}
                >
                    <img src="/delete.svg" className="group-hover:invert group-hover:opacity-40 xl:w-43 xl:h-43"></img>
                </div>
            </div>

            <hr className="w-phone mx-auto border-gray lg:hidden xl:w-notepad 2xl:w-desktop"></hr>
        </div>
    );
}