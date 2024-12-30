export default function ConceptsSection() {
    return (
        <>
            <div className="w-350 mx-auto mt-20 lg:w-tablet lg:mt-24 xl:w-notepad 2xl:w-desktop">
                <div className="xl:flex xl:items-center xl:justify-between xl:mb-10">
                    <h2 className="uppercase text-white text-2xl font-semibold tracking-tighter mb-5 lg:text-p-lg xl:text-number-lg xl:mb-0">концепты</h2>

                    <button className="hidden xl:flex items-center lg:gap-2.5 cursor-pointer group">
                        <p className="text-white font-medium text-button tracking-tighter mr-1 lg:text-lg group-hover:text-gray 2xl:text-2xl">Перейти</p>
                        <div className="border-white border-2 rounded-full p-2.5 group-hover:border-gray group-hover:bg-white"><img src="arrow.svg" className="w-19 h-19 lg:w-25 lg:h-25 5 group-hover:invert group-hover:opacity-40"></img></div>
                    </button>
                </div>

                <div className="lg:flex lg:items-start lg:relative xl:w-notepad 2xl:w-desktop">
                    <div className="hidden lg:block lg:absolute">
                        <img className="lg:h-575 xl:w-737 2xl:h-737" src="figure-fon.png"></img>
                    </div>
                    <div className="flex gap-x-8 overflow-auto lg:z-10 lg:ml-56 lg:pb-10 xl:ml-325">

                        <div className="w-400 lg:w-450 xl:w-325 2xl:w-440">
                            <div className="bg-fon-one-concept bg-100% w-400 h-500 flex items-center justify-center mb-4 lg:h-575 lg:w-450 xl:w-325 2xl:w-440 2xl:h-737">
                                <img src="headphones5.png" className="w-325 h-400 lg:h-450 xl:w-325 2xl:w-400 2xl:h-575"></img>
                            </div>
                            <div className="flex justify-between items-center lg:items-start">
                                <h3 className="text-white text-lg font-medium tracking-tighter uppercase w-2/3 leading-5 lg:text-2xl lg:leading-tight">The case is \ gold standard</h3>
                                <p className="font-bold text-white text-number tracking-tighter lg:text-big-para">4500</p>
                            </div>
                        </div>

                        <div className="w-400 lg:w-450 xl:w-350 2xl:w-440">
                            <div className="bg-fon-one-concept bg-100% w-350 h-500 flex items-center justify-center mb-4 lg:h-575 lg:w-450 xl:w-350 2xl:w-440 2xl:h-737">
                                <img src="cap3.png" className="w-400 h-400 lg:h-450 lg:w-450 xl:w-350 2xl:w-400 2xl:h-500"></img>
                            </div>
                            <div className="flex justify-between items-center lg:items-start">
                                <h3 className="text-white text-lg font-medium tracking-tighter uppercase w-2/3 leading-5 lg:text-2xl lg:leading-tight">Cap Wings</h3>
                                <p className="font-bold text-white text-number tracking-tighter lg:text-big-para">4300</p>
                            </div>
                        </div>

                        <div className="w-400 lg:w-450 xl:w-325 2xl:w-450 2xl:w-440">
                            <div className="bg-fon-one-concept bg-100% w-350 h-500 flex items-center justify-center mb-4 lg:h-575 lg:w-450 xl:w-325 2xl:w-440 2xl:h-737">
                                <img src="headphones6.png" className="w-64 h-400 lg:h-450 lg:w-72 xl:w-300 2xl:w-350 2xl:h-550"></img>
                            </div>
                            <div className="flex justify-between items-center lg:items-start">
                                <h3 className="text-white text-lg font-medium tracking-tighter uppercase w-2/3 leading-5 lg:text-2xl lg:leading-tight">Body kit fast street</h3>
                                <p className="font-bold text-white text-number tracking-tighter lg:text-big-para">4500</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="hidden lg:flex lg:gap-4 lg:-mt-24 xl:-mt-48 *:cursor-pointer">
                    <div className='border-white border-2 rounded-full p-2.5 hover:bg-white group'><img src='arrow.svg' className='rotate-225 w-25 h-25 group-hover:invert group-hover:opacity-40'></img></div>
                    <div className='border-white border-2 rounded-full p-2.5 hover:bg-white group'><img src='arrow.svg' className='rotate-45 w-25 h-25 group-hover:invert group-hover:opacity-40'></img></div>
                </div>
            </div>
        </>
    )
}