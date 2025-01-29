export default function SmallCard({}) {
    return (
        <>
            <div>
                <div className="hero-main mb-5 lg:w-76 lg:h-80 2xl:mb-2.5">
                    <div className="bg-gray h-44 w-full flex justify-center items-center lg:h-full">
                        <img src="/ipods2.png" className="w-32 lg:w-72 lg:h-60 h-28"></img>
                    </div>
                    <div className="hero-under"></div>
                </div>

                <div className="space-y-2.5 mb-2.5 lg:flex lg:justify-between lg:items-start lg:space-y-0 xl:mb-5">
                    <h4 className="text-white text-p font-medium tracking-tighter uppercase leading-5 lg:text-2xl lg:leading-tight lg:w-2/3 2xl:text-lg 2xl:w-1/2">Headphone Case \ Liquid Web</h4>
                    <p className="font-bold text-white text-2xl tracking-tighter lg:text-big-para 2xl:text-number">2225</p>
                </div>

                <a className="flex items-center mx-auto lg:w-full lg:mx-0 cursor-pointer group text-center" href='/item'>
                    <p className="text-white font-medium text-sm rounded-button border-white border-2 py-4 px-11 lg:text-2xl lg:w-full group-hover:bg-white group-hover:text-gray">В корзину</p>
                </a>
            </div>
        </>
    )
}