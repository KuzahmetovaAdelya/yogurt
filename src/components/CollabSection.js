export default function CollabSection() {
    return (
        <>
            <div className="w-350 mx-auto mt-20 lg:w-tablet lg:mt-40 lg:mb-20 xl:w-notepad xl:mt-64 2xl:w-desktop">
                <div className="lg:flex lg:justify-between lg:items-center lg:mb-10 xl:mb-5">
                    <p className="text-white font-medium text-lg w-80 tracking-tighter hidden lg:block">Наш бренд всегда открыт к сотрудничеству и классным коллабам</p>
                    <h2 className="uppercase text-white text-2xl font-semibold tracking-tighter mb-5 lg:text-p-lg xl:text-number-lg">Коллаборации</h2>
                </div>
                <div className="flex justify-between items-start mb-6 lg:hidden">
                    <p className="text-white font-medium text-p w-52 tracking-tighter">Наш бренд всегда открыт к сотрудничеству и классным коллабам</p>
                    <button className="flex items-center">
                        <div className="border-white border-2 rounded-full p-2.5"><img src="arrow.svg" className="w-19 h-19"></img></div>
                    </button>
                </div>
                <div>
                    <div className="lg:relative">
                        <img src="photo.png" className="w-350 mb-3 lg:w-tablet xl:w-notepad 2xl:w-desktop"></img>
                        <div className="lg:absolute lg:bottom-0 lg:left-5 xl:left-75">
                            <button className="lg:flex items-center hidden lg:ml-7 lg:mb-7 xl:ml-0 cursor-pointer group">
                                <div className="border-white border-4 rounded-full p-5 group-hover:bg-white"><img src="arrow.svg" className="w-43 h-43 group-hover:invert group-hover:opacity-40"></img></div>
                            </button>
                            <div className="flex gap-2.5 overflow-hidden -ml-10 mb-1 lg:ml-0 2xl:gap-5">
                                <h3 className="text-red font-medium tracking-tighter text-4xl">BICLA</h3>
                                <h3 className="text-red font-medium tracking-tighter text-4xl">BICLA</h3>
                                <h3 className="text-red font-medium tracking-tighter text-4xl">BICLA</h3>
                                <h3 className="text-red font-medium tracking-tighter text-4xl">BICLA</h3>
                                <h3 className="text-red font-medium tracking-tighter text-4xl">BICLA</h3>
                                <h3 className="text-red font-medium tracking-tighter text-4xl">BICLA</h3>
                                <h3 className="text-red font-medium tracking-tighter text-4xl">BICLA</h3>
                                <h3 className="text-red font-medium tracking-tighter text-4xl">BICLA</h3>
                                <h3 className="text-red font-medium tracking-tighter text-4xl hidden xl:block">BICLA</h3>
                                <h3 className="text-red font-medium tracking-tighter text-4xl hidden xl:block">BICLA</h3>
                                <h3 className="text-red font-medium tracking-tighter text-4xl hidden xl:block">BICLA</h3>
                                <h3 className="text-red font-medium tracking-tighter text-4xl hidden 2xl:block">BICLA</h3>
                                <h3 className="text-red font-medium tracking-tighter text-4xl hidden 2xl:block">BICLA</h3>
                            </div>
                        </div>
                    </div>

                    <p className="text-white font-medium text-p tracking-tighter text-center lg:text-right lg:text-lg lg:mt-5">Музыкант / DJ / Biicla</p>
                </div>

            </div>
        </>
    )
}