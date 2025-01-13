export default function HeroSection({}) {
    return (
        <>
            <div className="w-phone mx-auto lg:w-tablet xl:w-notepad 2xl:w-desktop">
                <div class="hero-main pt-32 xl:pt-10">
                    <div className="w-phone h-350 flex items-center justify-center border rounded-full border-white mb-9 lg:w-737 lg:h-737 lg:mx-auto lg:-mb-7 xl:-mb-14">
                        <h1 className="text-h1 font-bold text-white tracking-tighter lg:text-h1-lg xl:text-h1-xl 2xl:text-h1-2xl">YEGOURT</h1>
                    </div>

                    <div className="lg:flex lg:items-end lg:justify-between lg:pb-24 xl:pb-10 xl:px-20">
                        <div className="lg:w-80">
                            <h3 className="text-2xl text-white font-medium tracking-tighter mb-5 lg:text-p-lg xl:w-450">Добро пожаловать в мир, где мода встречает технологии</h3>
                            <p className="text-white font-medium text-p w-52 mb-28 tracking-tighter lg:text-lg lg:w-60 lg:mb-0 xl:w-max">Готовы увидеть как инновации меняют стиль?</p>
                        </div>

                        <a className="flex items-center mx-auto pb-12 w-max lg:pb-0 lg:mx-0 cursor-pointer group" href='/catalog'>
                            <p className="text-white font-medium text-button uppercase rounded-button border-white border-2 py-8 px-20 w-min lg:text-2xl lg:px-28 group-hover:bg-white group-hover:text-gray">Каталог</p>
                            <div className="border-white border-2 rounded-full p-6 group-hover:bg-white"><img src="/arrow.svg" className="w-43 h-43 group-hover:invert group-hover:opacity-40"></img></div>
                        </a>
                    </div>
                    
                    <div class="hero-under"></div>
                </div>
                <div className="h-1"></div>
                <hr className="w-phone mx-auto border-gray pb-10 mt-10 lg:w-tablet lg:mt-8 xl:w-notepad xl:mt-5 xl:pb-16 2xl:w-desktop"></hr>

            </div>
            
        </>
    )
}