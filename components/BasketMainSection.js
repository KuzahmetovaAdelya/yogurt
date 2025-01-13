import BasketCard from "./BasketCard"
import SmallCard from "./SmallCard"

export default function BasketMainSection({}) {
    return (
        <>
            <div className="mt-5 mx-auto w-phone lg:w-tablet xl:w-notepad 2xl:w-desktop">
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
                    <BasketCard />
                    <BasketCard />
                    <BasketCard />
                    <BasketCard />
                    <BasketCard />
                </div>
                

                <div className="mt-12 lg:mt-10">
                    <h3 className="text-gray text-2xl font-medium tracking-tighter 2xl:text-p-lg">Итого</h3>
                    <p className="text-white text-number font-bold tracking-tighter 2xl:text-number-lg">16000</p>
                    <a className="flex items-center mx-auto w-max mt-5 group cursor-pointer lg:justify-start lg:mx-0 group">
                        <p className="text-white font-medium text-button rounded-button border-white border-2 py-2.5 px-120 w-max group-hover:bg-white group-hover:text-gray lg:text-2xl lg:py-5">Купить</p>
                        <div className="border-white border-2 rounded-full p-2.5 group-hover:bg-white lg:p-4"><img src="/arrow.svg" className="w-25 h-25 group-hover:invert group-hover:opacity-40 lg:w-43 lg:h-43"></img></div>
                    </a>
                </div>

                <div className="hidden lg:block lg:w-tablet lg:overflow-auto styled-overflow xl:hidden 2xl:w-desktop lg:mt-16">
                    <p className="hidden lg:block lg:text-p-lg lg:text-gray lg:font-normal lg:mb-5">Другие товары</p>
                    <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:w-max lg:mb-2.5 xl:w-notepad 2xl:w-desktop">
                        <SmallCard />
                        <SmallCard />
                        <SmallCard />
                        <SmallCard />
                    </div>
                </div>
            </div>
        </>
    )
}