import SmallCard from './SmallCard';

export default function CatalogMainSection({}) {

    return (
        <>
            <div className='w-phone mx-auto mb-20 lg:w-tablet xl:w-notepad 2xl:w-desktop'>
                <div className='grid grid-cols-2 gap-5 mb-5 lg:gap-20 xl:grid-cols-4 xl:gap-10 2xl:mb-10'>
                    <SmallCard />
                    <SmallCard />
                    <SmallCard />
                    <SmallCard />
                    <SmallCard />
                    <SmallCard />
                    <div className='hidden xl:block'><SmallCard /></div>
                    <div className='hidden xl:block'><SmallCard /></div>
                </div>
                <hr className="w-phone mx-auto border-gray mb-5 lg:w-tablet xl:w-notepad xl:mb-10 2xl:hidden"></hr>
                <div className='grid grid-cols-2 gap-5 mb-10 lg:gap-20 xl:grid-cols-4 xl:gap-10'>
                    <SmallCard />
                    <SmallCard />
                </div>

                <a className="flex items-center mx-auto w-max lg:hidden">
                    <p className="text-white font-medium text-button rounded-button border-white border-2 py-2.5 px-85 w-max">Загрузить ещё</p>
                    <div className="border-white border-2 rounded-full p-2.5"><img src="/arrow.svg" className="w-25 h-25"></img></div>
                </a>

                <hr className='hidden lg:block lg:w-tablet lg:mx-auto lg:border-gray lg:mb-5 xl:w-notepad 2xl:w-desktop'></hr>
                <div className='hidden lg:block lg:flex lg:justify-between lg:items-center'>
                    <div className='flex gap-5'>
                        <div className='border-white border-2 rounded-full p-2.5 group hover:bg-white cursor-pointer hover:border-gray'><img src='/arrow.svg' className='rotate-225 w-25 h-25 group-hover:invert group-hover:opacity-40'></img></div>
                        <div className='border-white border-2 rounded-full p-2.5 group hover:bg-white cursor-pointer hover:border-gray'><img src='/arrow.svg' className='rotate-45 w-25 h-25 group-hover:invert group-hover:opacity-40'></img></div>
                    </div>

                    <div className='flex gap-5'>
                        <p className='text-big-para text-white font-medium hover:text-white cursor-pointer'>1</p>
                        <p className='text-big-para text-gray font-medium hover:text-white cursor-pointer'>2</p>
                        <p className='text-big-para text-gray font-medium hover:text-white cursor-pointer'>3</p>
                    </div>
                </div>
            </div>
        </>
    )
}