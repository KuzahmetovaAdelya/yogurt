import Head from "next/head";
import { useRouter } from "next/router";

export default function MenuPage({}) {
    const router = useRouter();

    function handleClick() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        router.push("/");
    }

    return (
        <>
            <Head>
                <meta name="description" content="Навигационное меню интернет магазина аксессуаров YEGOURT" />
                <meta name="keywords" content="yegourt, магазин аксессуаров, yogurt, 3Д, 3D, 3Д печать, 3D печать, интернет магазин, навигация, меню" />
                <title>Yegourt - Навигационное меню</title>
            </Head>
            <div className="w-phone h-screen mx-auto lg:w-tablet xl:w-notepad 2xl:w-desktop">
                <div className="h-px"></div>
                <div className="hero-main mt-20 h-5/6 relative">
                    <div className="flex justify-center *:cursor-pointer">
                        <a className="absolute w-75 h-75 -top-8 hover:opacity-40 2xl:w-90 2xl:h-90" href='/'>
                            <img src="/close.svg"></img>
                        </a>
                    </div>

                    <div className="absolute flex flex-col gap-5 items-center inset-0 top-60 h-min lg:gap-11 lg:top-30% xl:top-20% *:cursor-pointer 2xl:top-64">
                        <a className="text-white font-medium tracking-tighter text-2xl uppercase lg:text-p-lg hover:text-gray" href="/">Главная</a>
                        <a className="text-white font-medium tracking-tighter text-2xl uppercase lg:text-p-lg hover:text-gray" href="/catalog">Каталог</a>
                        <a className="text-white font-medium tracking-tighter text-2xl uppercase lg:text-p-lg hover:text-gray" href="/aboutUs">О нас</a>
                        <a className="text-white font-medium tracking-tighter text-2xl uppercase lg:text-p-lg hover:text-gray" href="/cooperation">сотрудничество</a>
                        <a className="text-white font-medium tracking-tighter text-2xl uppercase lg:text-p-lg hover:text-gray" href="/basket">корзина</a>
                        <a className="text-white font-medium tracking-tighter text-2xl uppercase lg:text-p-lg hover:text-gray" onClick={handleClick}>выйти</a>
                    </div>

                    <div className="absolute flex items-center justify-evenly inset-0 top-90% h-min lg:justify-center lg:gap-7 lg:top-full xl:top-90% 2xl:top-full *:cursor-pointer">
                        <a href="" className="group"><img src="/insta.svg" className="group-hover:opacity-40 w-10 xl:w-11 2xl:w-12 2xl:h-12"></img></a>
                        <a href="" className="group"><img src="/telega.svg" className="group-hover:opacity-40 w-10 xl:w-11 2xl:w-12 2xl:h-12"></img></a>
                        <a href="" className="group"><img src="/vk.svg" className="group-hover:opacity-40 w-10 xl:w-11 2xl:w-12 2xl:h-12"></img></a>
                        <a href="" className="group"><img src="/utube.svg" className="group-hover:opacity-40 w-10 xl:w-11 2xl:w-12"></img></a>
                    </div>
                    
                    <div className="hero-under"></div>
                </div>
            </div>
        </>
    )
}