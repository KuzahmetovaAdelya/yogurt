export default function AboutUsSection() {
    return (
        <>
            <div className="w-phone mx-auto mt-20 lg:w-tablet xl:w-notepad xl:mt-28 2xl:w-desktop">
                <div class="hero-main p-2.5 lg:relative lg:px-12 lg:py-8 lg:pb-0 xl:pb-8 xl:pr-20">
                    <p className="text-gray font-medium text-p mb-1.5 tracking-tighter text-center lg:text-base lg:text-left lg:mb-10 xl:text-right xl:text-lg">01010110101001100111001110010101010100001101</p>
                    <p className="hidden lg:block lg:text-p-lg lg:text-white lg:mb-10 xl:text-number-lg xl:-mt-20">ЧЁ ЗА ЙОГУРТ?</p>
                    <div className="w-full bg-gray mb-2.5 lg:w-400 lg:flex lg:justify-center lg:h-270 xl:w-550 xl:h-400">
                        <img src="cap1.png" className="w-270 lg:w-72 xl:w-400"></img>
                    </div>
                    <div className="flex items-center justify-between mb-4 lg:flex-col lg:items-start lg:absolute lg:top-8 lg:right-12 xl:top-24 xl:right-300 2xl:top-8 2xl:left-1/2">
                        <p className="text-gray font-medium text-p mb-1.5 tracking-tighter xl:text-lg">Latitude: 85.8891</p>
                        <p className="text-gray font-medium text-p mb-1.5 tracking-tighter xl:text-lg">Longitude: 34.5937</p>
                    </div>

                    <div className="space-y-5 mb-1.5 lg:mt-8">
                        <p className="text-white font-medium text-p tracking-tighter w-72 lg:text-lg lg:w-325">YEGOURT это бренд одежды и аксессуаров, идущий в ногу со временем, а иногда и опережающий его</p>
                        <p className="text-white font-medium text-p tracking-tighter w-64 lg:hidden">В создании своего стиля, мы используем передовые технологии</p>
                        <p className="text-white font-medium text-p tracking-tighter w-64 lg:hidden">Как при помощи 3D печати возможно подчеркнуть свою индивидуальность и стиль?</p>
                    </div>

                    <div className="hidden lg:flex lg:flex-col lg:gap-5 lg:float-right lg:-mt-395 xl:mr-10 xl:-mt-450 2xl:-mt-500 2xl:gap-7">
                        <p className="text-white font-medium text-p tracking-tighter w-64 lg:text-lg lg:w-325">В создании своего стиля, мы используем передовые технологии</p>
                        <p className="text-white font-medium text-p tracking-tighter w-64 lg:text-lg lg:w-325">Как при помощи 3D печати возможно подчеркнуть свою индивидуальность и стиль?</p>
                    </div>
                    
                    <div className="mt-16 lg:float-right lg:w-300 lg:-mt-44 lg:mr-7 xl:-mr-8 xl:-mt-60 xl:w-400">
                        <div className="bg-gray relative h-48 xl:h-52">
                            <img src="headphone1.png" className="z-10 absolute -top-16 lg:-top-11 xl:-top-20"></img>
                        </div>
                    </div>

                    <div className="lg:flex lg:flex-row-reverse lg:mb-2.5 lg:mt-12 lg:justify-between lg:items-end xl:mt-16">
                        <h6 className="text-gray text-big-para font-semibold tracking-tighter uppercase leading-8 mt-10 mb-2.5 lg:m-0 lg:mr-7 xl:-mr-10">The goal has been confirmed</h6>
                        <p className="text-gray font-medium text-p tracking-tighter w-64 lg:text-lg lg:mb-5 xl:mb-0">\\\\\\\\\\\\\\*$///////////</p>
                    </div>
                    
                    <div class="hero-under"></div>
                </div>
            </div>
        </>
    )
}