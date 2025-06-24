import SmallCard from "./SmallCard";
import { useEffect, useState } from "react";
import axios from "axios";
import host from "../host";
import { useRouter } from "next/router";

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

export default function ItemMainSection({item}: {item: Item | null}) {
    const [otherItems, setOtherItems] = useState([]);
    const [isInBasket, setIsInBasket] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!item?.id) return;
        
        // Проверяем, есть ли товар в корзине
        const checkBasket = async () => {
            try {
                const userId = localStorage.getItem("user")?.split(",")[0].split(":")[1];
                if (!userId) return;

                const response = await axios.get(`${host}basket?userId=${userId}`);
                const basketItems = response.data;
                const isItemInBasket = basketItems.some((basketItem: any) => basketItem.itemId === item.id);
                setIsInBasket(isItemInBasket);
            } catch (error) {
                console.error('Error checking basket:', error);
            }
        };

        checkBasket();
    }, [item]);

    useEffect(() => {
        // Fetch other items excluding the current item
        const fetchOtherItems = async () => {
            try {
                const response = await axios.get(`${host}items`);
                const filteredItems = response.data.filter(i => i.id !== item?.id).slice(0, 4);
                setOtherItems(filteredItems);
            } catch (error) {
                console.error('Error fetching other items:', error);
            }
        };

        if (item?.id) {
            fetchOtherItems();
        }
    }, [item]);

    if (!item) {
        return null; // or some loading state
    }

    async function handleClick(id: number) {
        const userStr = localStorage.getItem("user");
        let userId = null;
        if (userStr) {
            try {
                userId = JSON.parse(userStr).id || userStr.split(",")[0].split(":")[1];
            } catch {
                userId = userStr.split(",")[0].split(":")[1];
            }
        }
        if (!userId) {
            router.push('/auth'); // Перенаправляем на страницу авторизации, если пользователь не авторизован
            return;
        }

        if (isInBasket) {
            router.push('/basket');
            return;
        }

        try {
            await axios.post(`${host}basket/create`, {
                userId: parseInt(userId),
                itemId: id,
                count: 1
            });
            setIsInBasket(true);
        } catch (error) {
            console.error('Error adding to basket:', error);
        }
    }

    const renderButton = () => (
        <a className="flex items-center mx-auto w-max mb-5 lg:mb-0 lg:mx-0 group cursor-pointer" 
           onClick={() => handleClick(item.id)}>
            <p className="text-white font-medium text-button rounded-button border-white border-2 py-2.5 px-120 w-max lg:text-2xl lg:py-5 group-hover:bg-white group-hover:text-gray 2xl:uppercase">
                {isInBasket ? 'В корзине' : 'Купить'}
            </p>
            <div className="border-white border-2 rounded-full p-2.5 lg:p-4 group-hover:bg-white">
                <img src="/arrow.svg" className="w-25 h-25 lg:w-43 lg:h-43 group-hover:invert group-hover:opacity-40"></img>
            </div>
        </a>
    );

    return (
        <>
            <div className="w-phone mx-auto lg:w-tablet xl:w-notepad 2xl:w-desktop">
                <hr className="w-phone mx-auto border-gray lg:w-tablet hidden mb-5 lg:block xl:w-notepad xl:mb-10 2xl:w-desktop"></hr>

                <div className="lg:flex lg:flex-col-reverse xl:flex-row-reverse xl:justify-between">
                    <div className="lg:mt-5 xl:hidden">
                        <div className="lg:flex lg:justify-between">
                            <h2 className="uppercase text-white text-2xl font-semibold tracking-tighter w-56 lg:text-4xl lg:font-medium lg:w-2/5 lg:leading-tight">{item.name}</h2>
                            <div className="hidden lg:flex flex-col gap-5">
                                <p className="text-white font-medium text-lg tracking-tighter"><span className="opacity-70">Тип: </span><span className="opacity-100">{item.type}</span></p>
                                <p className="text-white font-medium text-lg tracking-tighter"><span className="opacity-70">Материал: </span><span className="opacity-100">{item.material}</span></p>
                            </div>
                        </div>
                        <div className="mt-2.5 lg:mt-5">
                        {item.discount !== 0 ?
                        <>
                            <p className="text-gray font-medium text-p tracking-tighter line-through leading-5 lg:text-2xl lg:leading-tight">{item.price}</p>
                            <p className="font-bold text-white text-number tracking-tighter leading-9 lg:text-number-lg lg:leading-tight">{Math.ceil(item.price - item.price / 100 * item.discount)}</p>
                        </> :
                            <p className="text-gray font-medium text-p tracking-tighter line-through leading-5 lg:text-2xl lg:leading-tight">{item.price}</p>
                        }
                            
                        </div>
                    </div>

                    <div className="mt-4 mb-8 lg:flex lg:flex-row-reverse lg:h-650 lg:justify-end lg:gap-14">
                        {item.image && item.image[0] ?
                            <div className="hero-main flex mb-2.5 lg:mb-0 lg:w-575 lg:h-650 2xl:w-737">
                                <div className="bg-black w-full flex justify-center items-center">
                                    <img src={`http://localhost:3001/images/${item.image[0]}`} className="h-full w-full"></img>
                                </div>
                                <div className="hero-under"></div>
                            </div>
                            :
                            <div className="hero-main flex mb-2.5 lg:mb-0 lg:w-575 lg:h-650 2xl:w-737">
                                <div className="bg-black w-full flex justify-center items-center">
                                    <div className="w-full h-full bg-gray"></div>
                                </div>
                                <div className="hero-under"></div>
                            </div> 
                        }
                        

                        <div className="flex justify-between items-center lg:flex-col">
                            {item.image && item.image[1] ?
                                <div className="small-hero-main flex w-24 h-24 lg:w-44 lg:h-44">
                                    <div className="bg-black flex justify-center items-center">
                                        <img src={`http://localhost:3001/images/${item.image[1]}`} className="w-full h-full"></img>
                                    </div>
                                    <div className="small-hero-under"></div>
                                </div>       
                                :
                                <div className="small-hero-main flex w-24 h-24 lg:w-44 lg:h-44">
                                    <div className="bg-black flex justify-center items-center">
                                        <div className="w-24 lg:w-44 h-full bg-gray"></div>
                                    </div>
                                    <div className="small-hero-under"></div>
                                </div>        
                            }

                            {item.image && item.image[2] ?
                                <div className="small-hero-main flex w-24 h-24 lg:w-44 lg:h-44">
                                    <div className="bg-black flex justify-center items-center">
                                        <img src={`http://localhost:3001/images/${item.image[2]}`} className="w-full h-full"></img>
                                    </div>
                                    <div className="small-hero-under"></div>
                                </div>      
                                :
                                <div className="small-hero-main flex w-24 h-24 lg:w-44 lg:h-44">
                                    <div className="bg-black flex justify-center items-center">
                                        <div className="w-24 lg:w-44 h-full bg-gray"></div>
                                    </div>
                                    <div className="small-hero-under"></div>
                                </div>         
                            }

                            {item.image && item.image[3] ?
                                <div className="small-hero-main flex w-24 h-24 lg:w-44 lg:h-44">
                                    <div className="bg-black flex justify-center items-center">
                                        <img src={`http://localhost:3001/images/${item.image[3]}`} className="w-full h-full"></img>
                                    </div>
                                    <div className="small-hero-under"></div>
                                </div>     
                                :
                                <div className="small-hero-main flex w-24 h-24 lg:w-44 lg:h-44">
                                    <div className="bg-black flex justify-center items-center">
                                        <div className="w-24 lg:w-44 h-full bg-gray"></div>
                                    </div>
                                    <div className="small-hero-under"></div>
                                </div>         
                            } 
                        </div>
                    </div>

                    <div className="hidden xl:flex xl:justify-between xl:mb-5 xl:flex-col">
                        <div>
                            <div className="mb-5">
                                <h2 className="uppercase text-white text-p-lg font-semibold tracking-tighter w-52 lg:text-p-lg lg:font-medium lg:w-300 lg:leading-tight">{item.name}</h2>
                                <div className="mt-12 lg:mt-5">
                                    {item.discount !== 0 ?
                                    <>
                                        <p className="text-gray font-medium text-p tracking-tighter line-through leading-5 lg:text-2xl lg:leading-tight 2xl:text-big-para">{item.price}</p>
                                        <p className="font-bold text-white text-number tracking-tighter leading-9 lg:text-number-lg lg:leading-tight xl:text-nubmer">{Math.ceil(item.price - item.price / 100 * item.discount)}</p>
                                    </> :
                                    <p className="font-bold text-white text-number tracking-tighter leading-9 lg:text-number-lg lg:leading-tight xl:text-nubmer">{item.price}</p>
                                    }
                                </div>
                            </div>

                            <div className="mb-9 lg:mb-0 xl:mb-5">
                                <p className="text-white font-medium text-p tracking-tighter w-5/6 lg:text-lg lg:w-80">{item.description}</p>
                            </div>

                            <div className="flex flex-col gap-5">
                                <p className="text-white font-medium text-lg tracking-tighter"><span className="opacity-70">Тип: </span><span className="opacity-100">{item.type}</span></p>
                                <p className="text-white font-medium text-lg tracking-tighter"><span className="opacity-70">Материал: </span><span className="opacity-100">{item.material}</span></p>
                            </div>
                        </div>

                        {renderButton()}
                    </div>
                </div>

                <div className="lg:flex lg:justify-between lg:items-end lg:mb-5 xl:hidden">
                    <div className="mb-9 lg:mb-0">
                        <p className="text-white font-medium text-p tracking-tighter w-5/6 lg:text-lg lg:w-80">{item.description}</p>
                        <div className="flex flex-col gap-5 mt-5 lg:hidden">
                            <p className="text-white font-medium text-p tracking-tighter"><span className="opacity-70">Тип: </span><span className="opacity-100">{item.type}</span></p>
                            <p className="text-white font-medium text-p tracking-tighter"><span className="opacity-70">Материал: </span><span className="opacity-100">{item.material}</span></p>
                        </div>
                    </div>

                    {renderButton()}
                </div>


                <hr className="w-phone mx-auto border-gray mb-10 lg:w-tablet xl:w-notepad xl:mt-10 xl:mb-14 2xl:w-desktop"></hr>

                <div className="lg:w-tablet lg:overflow-auto styled-overflow xl:w-notepad 2xl:w-desktop">
                    <p className="hidden lg:block lg:text-p-lg lg:text-gray lg:font-normal lg:mb-5">Другие товары</p>
                    <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:w-max lg:mb-2.5 xl:w-notepad 2xl:w-desktop">
                        {otherItems.map((otherItem) => (
                            <SmallCard 
                                key={otherItem.id}
                                item={otherItem}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}