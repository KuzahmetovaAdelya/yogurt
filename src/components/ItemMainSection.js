import SmallCard from "./SmallCard";

export default function ItemMainSection({setPage, scrollUp}) {
    return (
        <>
            <div className="w-phone mx-auto lg:w-tablet xl:w-notepad 2xl:w-desktop">
                <hr className="w-phone mx-auto border-gray lg:w-tablet hidden mb-5 lg:block xl:w-notepad xl:mb-10 2xl:w-desktop"></hr>

                <div className="lg:flex lg:flex-col-reverse xl:flex-row-reverse xl:justify-between">
                    <div className="lg:mt-5 xl:hidden">
                        <h2 className="uppercase text-white text-2xl font-semibold tracking-tighter w-52 lg:text-4xl lg:font-medium lg:w-2/5 lg:leading-tight">Headphone Case \ Liquid Web</h2>
                        <div className="mt-2.5 lg:mt-5">
                            <p className="text-gray font-medium text-p tracking-tighter line-through leading-5 lg:text-2xl lg:leading-tight">4000</p>
                            <p className="font-bold text-white text-number tracking-tighter leading-9 lg:text-number-lg lg:leading-tight">4000</p>
                        </div>
                    </div>

                    <div className="mt-4 mb-8 lg:flex lg:flex-row-reverse lg:h-650 lg:justify-end lg:gap-14">
                        <div class="hero-main mb-2.5 lg:mb-0 lg:w-575 lg:h-650 2xl:w-737">
                            <div className="bg-black w-full flex justify-center items-center">
                                <img src="headphones4.png" className="lg:w-500 lg:h-575 w-300 h-400"></img>
                            </div>
                            <div class="hero-under"></div>
                        </div>

                        <div className="flex justify-between items-center lg:flex-col">
                            <div class="small-hero-main w-24 lg:w-44 lg:h-44">
                                <div className="bg-black flex justify-center items-center">
                                    <img src="headphones4.png" className="w-20 h-24 lg:h-44 lg:w-36"></img>
                                </div>
                                <div class="small-hero-under"></div>
                            </div>

                            <div class="small-hero-main w-24 lg:w-44 lg:h-44">
                                <div className="bg-black flex justify-center items-center">
                                    <img src="headphones4.png" className="w-20 h-24 lg:h-44 lg:w-36"></img>
                                </div>
                                <div class="small-hero-under"></div>
                            </div>

                            <div class="small-hero-main w-24 lg:w-44 lg:h-44">
                                <div className="bg-black flex justify-center items-center">
                                    <img src="headphones4.png" className="w-20 h-24 lg:h-44 lg:w-36"></img>
                                </div>
                                <div class="small-hero-under"></div>
                            </div>
                        </div>
                    </div>

                    <div className="hidden xl:flex xl:justify-between xl:mb-5 xl:flex-col">
                        <div>
                            <div className="mb-5">
                                <h2 className="uppercase text-white text-p-lg font-semibold tracking-tighter w-52 lg:text-p-lg lg:font-medium lg:w-300 lg:leading-tight">Headphone Case \ Liquid Web</h2>
                                <div className="mt-12 lg:mt-5">
                                    <p className="text-gray font-medium text-p tracking-tighter line-through leading-5 lg:text-2xl lg:leading-tight 2xl:text-big-para">4000</p>
                                    <p className="font-bold text-white text-number tracking-tighter leading-9 lg:text-number-lg lg:leading-tight xl:text-nubmer">4000</p>
                                </div>
                            </div>

                            <div className="mb-9 lg:mb-0">
                                <p className="text-white font-medium text-p tracking-tighter w-5/6 lg:text-lg lg:w-80">Who doesn’t enjoy reading inspiring short love stories from all over the world?  Who doesn’t enjoy reading inspiring short love stories from all over the world?</p>
                            </div>
                        </div>

                        <a className="flex items-center mx-auto w-max mb-5 lg:mb-0 lg:mx-0 group cursor-pointer">
                            <p className="text-white font-medium text-button rounded-button border-white border-2 py-2.5 px-120 w-max lg:text-2xl lg:py-5 group-hover:bg-white group-hover:text-gray 2xl:uppercase">Купить</p>
                            <div className="border-white border-2 rounded-full p-2.5 lg:p-4 group-hover:bg-white"><img src="arrow.svg" className="w-25 h-25 lg:w-43 lg:h-43 group-hover:invert group-hover:opacity-40"></img></div>
                        </a>
                    </div>
                </div>

                <div className="lg:flex lg:justify-between lg:items-end lg:mb-5 xl:hidden">
                    <div className="mb-9 lg:mb-0">
                        <p className="text-white font-medium text-p tracking-tighter w-5/6 lg:text-lg lg:w-80">Who doesn’t enjoy reading inspiring short love stories from all over the world?  Who doesn’t enjoy reading inspiring short love stories from all over the world?</p>
                    </div>

                    <a className="flex items-center mx-auto w-max mb-5 lg:mb-0 lg:mx-0 group">
                        <p className="text-white font-medium text-button rounded-button border-white border-2 py-2.5 px-120 w-max lg:text-2xl lg:py-5 group-hover:bg-white group-hover:text-gray cursor-pointer">Купить</p>
                        <div className="border-white border-2 rounded-full p-2.5 lg:p-4 group-hover:bg-white cursor-pointer"><img src="arrow.svg" className="w-25 h-25 lg:w-43 lg:h-43 group-hover:invert group-hover:opacity-40"></img></div>
                    </a>
                </div>


                <hr className="w-phone mx-auto border-gray mb-10 lg:w-tablet xl:w-notepad xl:mt-10 xl:mb-14 2xl:w-desktop"></hr>

                <div className="lg:w-tablet lg:overflow-auto styled-overflow xl:w-notepad 2xl:w-desktop">
                    <p className="hidden lg:block lg:text-p-lg lg:text-gray lg:font-normal lg:mb-5">Другие товары</p>
                    <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:w-max lg:mb-2.5 xl:w-notepad 2xl:w-desktop">
                        <SmallCard setPage={setPage} scrollUp={scrollUp} />
                        <SmallCard setPage={setPage} scrollUp={scrollUp} />
                        <SmallCard setPage={setPage} scrollUp={scrollUp} />
                        <SmallCard setPage={setPage} scrollUp={scrollUp} />
                    </div>
                </div>
            </div>
        </>
    )
}