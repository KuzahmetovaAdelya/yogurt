import { useRef, useState } from "react";

export default function CollabSection({ collabs = [] }) {
    const scrollContainerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollLeft = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            if (scrollContainerRef.current) {
                const container = scrollContainerRef.current;
                const itemWidth = container.querySelector('.collab-item').offsetWidth;
                container.scrollTo({
                    left: (currentIndex - 1) * itemWidth,
                    behavior: 'smooth'
                });
            }
        }
    };

    const scrollRight = () => {
        if (currentIndex < collabs.length - 1) {
            setCurrentIndex(prev => prev + 1);
            if (scrollContainerRef.current) {
                const container = scrollContainerRef.current;
                const itemWidth = container.querySelector('.collab-item').offsetWidth;
                container.scrollTo({
                    left: (currentIndex + 1) * itemWidth,
                    behavior: 'smooth'
                });
            }
        }
    };

    if (!collabs || collabs.length === 0) {
        return null;
    }

    const currentCollab = collabs[currentIndex];

    return (
        <>
            <div className="w-350 mx-auto mt-20 lg:w-tablet lg:mt-40 lg:mb-20 xl:w-notepad xl:mt-64 2xl:w-desktop">
                <div className="lg:flex lg:justify-between lg:items-center lg:mb-10 xl:mb-5">
                    <div className="items-center gap-5 hidden lg:flex">
                        <p className="text-white font-medium text-lg w-80 tracking-tighter hidden lg:block">Наш бренд всегда открыт к сотрудничеству и классным коллабам</p>
                        <div className="flex items-center gap-5">
                            <div 
                                onClick={scrollLeft}
                                className={`border-white border-2 rounded-full p-2.5 hover:bg-white group ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                <img src='/arrow.svg' className='rotate-225 w-25 h-25 group-hover:invert group-hover:opacity-40'></img>
                            </div>
                            <div 
                                onClick={scrollRight}
                                className={`border-white border-2 rounded-full p-2.5 hover:bg-white group ${currentIndex === collabs.length - 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                <img src='/arrow.svg' className='rotate-45 w-25 h-25 group-hover:invert group-hover:opacity-40'></img>
                            </div>
                        </div>
                    </div>
                    
                    <h2 className="hidden lg:block uppercase text-white text-2xl font-semibold tracking-tighter lg:text-p-lg xl:text-number-lg leading-tight">Коллаборации</h2>
                    <h2 className="lg:hidden uppercase text-white text-2xl font-semibold tracking-tighter mb-5">Коллаборации</h2>
                </div>

                <div className="flex justify-between items-start mb-6 lg:hidden">
                    <p className="text-white font-medium text-p w-52 tracking-tighter">Наш бренд всегда открыт к сотрудничеству и классным коллабам</p>

                    <div className="flex items-center gap-5">
                        <div 
                            onClick={scrollLeft}
                            className={`border-white border-2 rounded-full p-2.5 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            <img src="/arrow.svg" className="w-19 h-19 rotate-225"></img>
                        </div>
                        <div 
                            onClick={scrollRight}
                            className={`border-white border-2 rounded-full p-2.5 ${currentIndex === collabs.length - 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            <img src="/arrow.svg" className="w-19 h-19 rotate-45"></img>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:flex justify-between">
                    <div className="collab-item">
                        <img 
                            src={currentCollab.image ? `http://localhost:3001/images/${currentCollab.image}` : "/photo.png"} 
                            className="w-350 lg:w-30 lg:h-60 xl:w-870 xl:h-600 object-contain"
                            alt={currentCollab.name}
                        />
                        {/* <p className="text-white font-medium text-p tracking-tighter text-center opacity-60 lg:text-left lg:text-lg lg:mt-2.5">{currentCollab.name}</p> */}
                    </div>
                    
                    <div className="w-270 xl:w-424 lg:mt-0 xl:mt-10 flex flex-col justify-between">
                        <div className="flex flex-col gap-3">
                            <p className="hidden lg:block text-white font-medium text-p tracking-tighter text-center opacity-60 lg:text-left lg:text-xl">{currentCollab.name}</p>
                            <p className="text-white font-medium lg:text-p lg:leading-5 xl:leading-7 xl:text-lg tracking-tighter">{currentCollab.description}</p>
                        </div>

                        <div className="flex items-center gap-10 h-min *:cursor-pointer lg:justify-evenly lg:mt-20 xl:gap-7 lg:top-full xl:justify-start">
                            {currentCollab.instagram && (
                                <a href={currentCollab.instagram} target="_blank" rel="noopener noreferrer" className="group">
                                    <img src="/insta.svg" className="transition group-hover:opacity-40 w-10 lg:w-11 lg:h-11 xl:w-11 2xl:w-12 2xl:h-12" alt="Instagram"></img>
                                </a>
                            )}
                            {currentCollab.telegram && (
                                <a href={currentCollab.telegram} target="_blank" rel="noopener noreferrer" className="group">
                                    <img src="/telega.svg" className="transition group-hover:opacity-40 w-10 lg:w-11 lg:h-11 xl:w-11 2xl:w-12 2xl:h-12" alt="Telegram"></img>
                                </a>
                            )}
                            {currentCollab.vkontakte && (
                                <a href={currentCollab.vkontakte} target="_blank" rel="noopener noreferrer" className="group">
                                    <img src="/vk.svg" className="transition group-hover:opacity-40 w-10 lg:w-11 xl:w-11 2xl:w-12 2xl:h-12" alt="VK"></img>
                                </a>
                            )}
                            {currentCollab.youtube && (
                                <a href={currentCollab.youtube} target="_blank" rel="noopener noreferrer" className="group">
                                    <img src="/utube.svg" className="transition group-hover:opacity-40 w-10 lg:w-11 lg:h-11 xl:w-11 2xl:w-12" alt="YouTube"></img>
                                </a>
                            )}
                            
                        </div>
                    </div>
                </div>

                <div className="lg:hidden">
                    <div className="collab-item">
                        <img 
                            src={currentCollab.image ? `http://localhost:3001/images/${currentCollab.image}` : "/photo.png"} 
                            className="w-350 mb-3"
                            alt={currentCollab.name}
                        />
                        <div>
                            <div className="flex w-screen gap-2.5 overflow-hidden mb-1 absolute left-0">
                                {[...Array(8)].map((_, index) => (
                                    <h3 key={index} className="text-red font-medium tracking-tighter text-4xl">{currentCollab.name}</h3>
                                ))}
                            </div>
                        </div>
                    </div>

                    <p className="text-white font-medium text-p tracking-tighter text-center mt-75">{currentCollab.description}</p>

                    <div className="flex items-center gap-10 h-min *:cursor-pointer justify-center mt-5">
                            {currentCollab.instagram && (
                                <a href={currentCollab.instagram} target="_blank" rel="noopener noreferrer" className="group">
                                    <img src="/insta.svg" className="group-hover:opacity-40 w-8 transition" alt="Instagram"></img>
                                </a>
                            )}
                            {currentCollab.telegram && (
                                <a href={currentCollab.telegram} target="_blank" rel="noopener noreferrer" className="group">
                                    <img src="/telega.svg" className="group-hover:opacity-40 w-8 transition" alt="Telegram"></img>
                                </a>
                            )}
                            {currentCollab.vkontakte && (
                                <a href={currentCollab.vkontakte} target="_blank" rel="noopener noreferrer" className="group">
                                    <img src="/vk.svg" className="group-hover:opacity-40 w-8 transition" alt="VK"></img>
                                </a>
                            )}
                            {currentCollab.youtube && (
                                <a href={currentCollab.youtube} target="_blank" rel="noopener noreferrer" className="group">
                                    <img src="/utube.svg" className="group-hover:opacity-40 w-8 transition" alt="YouTube"></img>
                                </a>
                            )}
                            
                        </div>
                </div>
            </div>
        </>
    )
}