export default function AboutUsMainSection() {
    return (
        <>
            <div className="w-phone mx-auto lg:w-tablet xl:w-notepad 2xl:w-desktop">
                <h1 className="text-h1 font-bold text-white tracking-tighter text-center mb-5 mt-14 lg:text-h1-lg xl:text-h1-xl 2xl:text-h1-2xl 2xl:mb-24">YEGOURT</h1>
                <div className="space-y-5 2xl:space-y-0">
                    <p className="text-white font-medium text-p tracking-tighter text-center lg:font-normal lg:text-lg lg:uppercase lg:w-2/3 lg:font-normal lg:mx-auto 2xl:w-1/2">Начал свой творческий путь как граффити-художник в 2008-м году. Граффити стало его способом самовыражения, однако, со временем его увлечение начало перерастать во что-то большее. Он начинает придумывать и создавать иллюстрации со своими персонажами, вдохновленные бэкграундом уличной культуры</p>
                    <p className="text-white font-medium text-p tracking-tighter text-center lg:font-normal lg:text-lg lg:uppercase lg:w-2/3 lg:font-normal lg:mx-auto 2xl:w-1/2">Этот процесс захватил его настолько, что в 2020-м году он создает первую 3D-модель своего персонажа и начинает углубляться в мир коллекционных фигурок</p>
                </div>

                
                <div className="flex items-center justify-evenly mt-1/2 lg:justify-center lg:gap-7 xl:mt-10% 2xl:mt-20% *:cursor-pointer">
                    <a href="" className="group"><img src="insta.svg" className="w-10 lg:w-12 lg:h-12 group-hover:opacity-40"></img></a>
                    <a href="" className="group"><img src="telega.svg" className="w-10 lg:w-12 lg:h-12 group-hover:opacity-40"></img></a>
                    <a href="" className="group"><img src="vk.svg" className="w-10 lg:w-12 lg:h-12 group-hover:opacity-40"></img></a>
                    <a href="" className="group"><img src="utube.svg" className="w-10 lg:w-12 group-hover:opacity-40"></img></a>
                </div>

                <p className="hidden lg:block lg:text-lg lg:uppercase lg:font-normal lg:text-gray lg:-mt-9 2xl:text-2xl">yegourt 2024</p>
            </div>
        </>
    )
}