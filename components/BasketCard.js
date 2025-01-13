export default function BasketCard() {
    return (
        <>
            <div>
                <div className="flex justify-between gap-3.5 mb-5 mt-5 flex-col 2xl:gap-0">
                    <div className="2xl:relative">
                        <div class="hero-main w-40 h-44 mb-5 lg:w-full lg:h-80">
                            <div className="bg-gray flex justify-center items-center h-44 w-full lg:h-80">
                                <img src="/ipods2.png" className=""></img>
                            </div>
                            <div class="hero-under"></div>
                        </div>

                        <div className="flex gap-1 *:cursor-pointer 2xl:absolute 2xl:right-0">
                            <div className="border-white border-2 py-2.5 px-4 rounded-basket group hover:bg-white">
                                <p className="text-white text-base font-medium tracking-tighter group-hover:text-gray">-</p>
                            </div>
                            <div className="border-white border-2 py-2.5 px-7 rounded-basket group hover:bg-white">
                                <p className="text-white text-base font-medium tracking-tighter group-hover:text-gray">1</p>
                            </div>
                            <div className="border-white border-2 py-2.5 px-4 rounded-basket group hover:bg-white">
                                <p className="text-white text-base font-medium tracking-tighter group-hover:text-gray">+</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white text-p uppercase font-medium tracking-tighter mb-5 lg:text-2xl lg:w-220 2xl:text-lg">Headphone Case \ Liquid Web</h4>
                        <p className="text-gray text-2xl font-bold tracking-tighter line-through">2225 Р</p>
                        <p className="text-white text-number font-bold tracking-tighter lg:text-big-para">2225 Р</p>
                        <p className="text-white text-p font-medium tracking-tighter opacity-80 h-11 text-ellipsis overflow-hidden w-44 mb-5 lg:w-full lg:h-max">Who doesn’t enjoy reading inspiring short love stories from all over the world?  Who doesn’t enjoy reading inspiring short love stories from all over the world?</p>
                        <div className="p-1.5 border-white border-2 rounded-basket w-max group hover:bg-white cursor-pointer">
                            <img src="/delete.svg" className="group-hover:invert group-hover:opacity-40 xl:w-43 xl:h-43"></img>
                        </div>
                    </div>
                </div>

                <hr className="w-phone mx-auto border-gray lg:hidden xl:w-notepad 2xl:w-desktop"></hr>
            </div>
        </>
    )
}