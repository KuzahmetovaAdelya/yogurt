import SmallCard from "./SmallCard";
import BigCard from "./BigCard";

export default function CatalogSection({}) {
    return (
        <>
            <div className="w-350 mx-auto mt-16 lg:w-tablet xl:w-notepad xl:mt-36 2xl:w-desktop" id="catalog">
                <div className="flex items-center justify-between mb-6 xl:mb-10">
                    <h2 className="uppercase text-white text-2xl font-semibold tracking-tighter lg:text-p-lg xl:text-number-lg">Каталог</h2>

                    <a className="flex items-center lg:gap-2.5 cursor-pointer group" href='/catalog'>
                        <p className="text-white font-medium text-button tracking-tighter mr-1 lg:text-lg group-hover:text-gray 2xl:text-2xl">Просмотреть все</p>
                        <div className="border-white border-2 rounded-full p-2.5 group-hover:border-gray group-hover:bg-white"><img src="/arrow.svg" className="w-19 h-19 lg:w-25 lg:h-25 group-hover:invert group-hover:opacity-40"></img></div>
                    </a>
                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:gap-10">
                    <BigCard />
                    <BigCard />
                </div>

                <hr className="w-phone mx-auto border-gray my-5 lg:w-tablet lg:mb-10 lg:mt-11 xl:w-notepad xl:mt-16 2xl:w-desktop"></hr>

                <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 lg:gap-10 xl:grid-cols-4">
                    <SmallCard />
                    <SmallCard />
                    <SmallCard />
                    <SmallCard />
                    <div className="xl:hidden"><SmallCard /></div>
                    <div className="xl:hidden"><SmallCard /></div>
                    </div>

                <hr className="w-phone mx-auto border-gray mt-5 lg:w-tablet lg:mt-10 xl:w-notepad xl:mt-5 2xl:w-desktop"></hr>
            </div>
        </>
    )
}