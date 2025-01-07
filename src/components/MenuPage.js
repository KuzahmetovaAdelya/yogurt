export default function MenuPage({setIsMenuOpen, setPage}) {
    return (
        <>
            <div className="w-phone h-screen mx-auto lg:w-tablet xl:w-notepad 2xl:w-desktop">
                <div className="h-px"></div>
                <div class="hero-main mt-20 h-5/6 relative">
                    <div className="flex justify-center *:cursor-pointer">
                        <img src="close.svg" className="absolute w-75 h-75 -top-8 hover:opacity-40 2xl:w-90 2xl:h-90" onClick={() => {setIsMenuOpen(false)}}></img>
                    </div>

                    <div className="absolute flex flex-col gap-5 items-center inset-0 top-60 h-min lg:gap-11 lg:top-40% xl:top-64 *:cursor-pointer 2xl:top-64">
                        <a className="text-white font-medium tracking-tighter text-2xl uppercase lg:text-p-lg hover:text-gray" onClick={() => {setPage('main'); setIsMenuOpen(false)}}>Главная</a>
                        <a className="text-white font-medium tracking-tighter text-2xl uppercase lg:text-p-lg hover:text-gray" onClick={() => {setPage('catalog'); setIsMenuOpen(false)}}>Каталог</a>
                        <a className="text-white font-medium tracking-tighter text-2xl uppercase lg:text-p-lg hover:text-gray" onClick={() => {setPage('about'); setIsMenuOpen(false)}}>О нас</a>
                        <a className="text-white font-medium tracking-tighter text-2xl uppercase lg:text-p-lg hover:text-gray" onClick={() => {setPage('cooperating'); setIsMenuOpen(false)}}>сотрудничество</a>
                        <a className="text-white font-medium tracking-tighter text-2xl uppercase lg:text-p-lg hover:text-gray" onClick={() => {setPage('basket'); setIsMenuOpen(false)}}>корзина</a>
                    </div>

                    <div className="absolute flex items-center justify-evenly inset-0 top-90% h-min *:cursor-pointer lg:justify-center lg:gap-7 lg:top-full *:cursor-pointer">
                        <a href="" className="group"><img src="insta.svg" className="group-hover:opacity-40 w-10 xl:w-11 2xl:w-12"></img></a>
                        <a href="" className="group"><img src="telega.svg" className="group-hover:opacity-40 w-10 xl:w-11 2xl:w-12"></img></a>
                        <a href="" className="group"><img src="vk.svg" className="group-hover:opacity-40 w-10 xl:w-11 2xl:w-12"></img></a>
                        <a href="" className="group"><img src="utube.svg" className="group-hover:opacity-40 w-10 xl:w-11 2xl:w-12"></img></a>
                    </div>
                    
                    <div class="hero-under"></div>
                </div>
            </div>
        </>
    )
}