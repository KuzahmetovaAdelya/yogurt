export default function CollabSection() {
    return (
        <>
            <div className="w-350 mx-auto mt-20 lg:w-tablet lg:mt-40 lg:mb-20 xl:w-notepad xl:mt-64 2xl:w-desktop">
                <div className="lg:flex lg:justify-between lg:items-center lg:mb-10 xl:mb-5">
                    <p className="text-white font-medium text-lg w-80 tracking-tighter hidden lg:block">Наш бренд всегда открыт к сотрудничеству и классным коллабам</p>
                    <h2 className="uppercase text-white text-2xl font-semibold tracking-tighter lg:text-p-lg xl:text-number-lg leading-tight">Коллаборации</h2>
                </div>
                <div className="flex justify-between items-start mb-6 lg:hidden">
                    <p className="text-white font-medium text-p w-52 tracking-tighter">Наш бренд всегда открыт к сотрудничеству и классным коллабам</p>
                    <button className="flex items-center">
                        <div className="border-white border-2 rounded-full p-2.5"><img src="/arrow.svg" className="w-19 h-19"></img></div>
                    </button>
                </div>
                <div className="flex justify-between">
                    <div>
                        <img src="/photo.png" className="w-350 lg:w-30 lg:h-60 xl:w-870 xl:h-600 object-contain"></img>
                        <p className="text-white font-medium text-p tracking-tighter text-center opacity-60 lg:text-left lg:text-lg lg:mt-2.5">Музыкант / DJ / Biicla</p>
                    </div>
                    
                    <div className="w-424 lg:mt-0 xl:mt-10 flex flex-col justify-between">
                        <div>
                            <p className="text-white font-medium text-lg tracking-tighter">Продюсер, диджей и автор песен Виталий Жариков (Biicla) попал в лонг-лист рейтинга «З0 до 30», который ежегодно составляет российский Forbes. В этот список попадают те, кто к 30 годам получили признание в профессиональном сообществе и стали известны на всероссийском или даже глобальном уровне. Сейчас стартовало голосование в каждой из 10 номинаций. Biicla, как нетрудно догадаться, борется за победу в категории «Музыка».</p>
                            <p className="hidden xl:block text-white font-medium text-p tracking-tighter text-center opacity-60 lg:text-left lg:text-lg lg:mt-10">Музыкант / DJ / Biicla</p>
                        </div>

                        <div className="flex items-center gap-10 h-min *:cursor-pointer lg:justify-evenly lg:mt-20 xl:gap-7 lg:top-full xl:justify-start">
                            <a href="" className="group"><img src="/insta.svg" className="group-hover:opacity-40 w-10 lg:w-11 lg:h-11 xl:w-11 2xl:w-12 2xl:h-12"></img></a>
                            <a href="" className="group"><img src="/telega.svg" className="group-hover:opacity-40 w-10 lg:w-11 lg:h-11 xl:w-11 2xl:w-12 2xl:h-12"></img></a>
                            <a href="" className="group"><img src="/vk.svg" className="group-hover:opacity-40 w-10 lg:w-11 xl:w-11 2xl:w-12 2xl:h-12"></img></a>
                            <a href="" className="group"><img src="/utube.svg" className="group-hover:opacity-40 w-10 lg:w-11 lg:h-11 xl:w-11 2xl:w-12"></img></a>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}