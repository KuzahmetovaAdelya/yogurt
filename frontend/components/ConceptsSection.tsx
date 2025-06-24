import { useRef, useState } from "react";

export default function ConceptsSection({ concepts = [] }) {
    const scrollContainerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollLeft = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            if (scrollContainerRef.current) {
                const container = scrollContainerRef.current;
                const itemWidth = container.querySelector('.concept-item').offsetWidth;
                container.scrollTo({
                    left: (currentIndex - 1) * itemWidth,
                    behavior: 'smooth'
                });
            }
        }
    };

    const scrollRight = () => {
        if (currentIndex < concepts.length - 1) {
            setCurrentIndex(prev => prev + 1);
            if (scrollContainerRef.current) {
                const container = scrollContainerRef.current;
                const itemWidth = container.querySelector('.concept-item').offsetWidth;
                container.scrollTo({
                    left: (currentIndex + 1) * itemWidth,
                    behavior: 'smooth'
                });
            }
        }
    };

    if (!concepts || concepts.length === 0) {
        return null; // or return a loading state/placeholder if preferred
    }

    return (
        <>
            <div className="w-350 mx-auto mt-20 lg:w-tablet lg:mt-24 xl:w-notepad 2xl:w-desktop">
                <div className="xl:flex xl:items-center xl:justify-between xl:mb-10">
                    <h2 className="uppercase text-white text-2xl font-semibold tracking-tighter mb-5 lg:text-p-lg xl:text-number-lg xl:mb-0">концепты</h2>

                    <button className="hidden xl:flex items-center lg:gap-2.5 cursor-pointer group">
                        <p className="text-white font-medium text-button tracking-tighter mr-1 lg:text-lg group-hover:text-gray 2xl:text-2xl">Перейти</p>
                        <div className="border-white border-2 rounded-full p-2.5 group-hover:border-gray group-hover:bg-white"><img src="/arrow.svg" className="w-19 h-19 lg:w-25 lg:h-25 5 group-hover:invert group-hover:opacity-40"></img></div>
                    </button>
                </div>

                <div className="lg:flex lg:items-start lg:relative xl:w-notepad 2xl:w-desktop">
                    <div className="hidden lg:block lg:absolute">
                        <img className="lg:h-575 xl:w-737 2xl:h-737" src="/figure-fon.png"></img>
                    </div>
                    <div 
                        ref={scrollContainerRef}
                        className="flex gap-x-8 overflow-auto lg:z-10 lg:ml-56 lg:pb-10 xl:ml-325 scrollbar-hide"
                    >
                        {concepts.map((concept) => (
                            <div key={concept.id} className="concept-item w-400 lg:w-450 xl:w-325 2xl:w-440 flex-shrink-0">
                                <div className="bg-fon-one-concept bg-100% w-400 h-500 flex items-center justify-center mb-4 lg:h-575 lg:w-450 xl:w-325 2xl:w-440 2xl:h-737">
                                    {concept.image ? (
                                        <img 
                                            src={`http://localhost:3001/images/${concept.image}`} 
                                            className="w-325 h-400 lg:h-450 xl:w-325 2xl:w-400 2xl:h-575 object-contain"
                                            alt={concept.name}
                                        />
                                    ) : (
                                        <div className="w-325 h-400 lg:h-450 xl:w-325 2xl:w-400 2xl:h-575 bg-gray"></div>
                                    )}
                                </div>
                                <div className="flex justify-between items-center lg:items-start">
                                    <h3 className="text-white text-lg font-medium tracking-tighter uppercase w-2/3 leading-5 lg:text-2xl lg:leading-tight">{concept.name}</h3>
                                    <p className="font-bold text-white text-number tracking-tighter lg:text-big-para">
                                        {concept.discount ? Math.ceil(concept.price - concept.price / 100 * concept.discount) : concept.price}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="hidden lg:flex lg:gap-4 lg:-mt-24 xl:-mt-48 *:cursor-pointer">
                    <div 
                        onClick={scrollLeft}
                        className={`border-white border-2 rounded-full p-2.5 hover:bg-white group ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <img src='/arrow.svg' className='rotate-225 w-25 h-25 group-hover:invert group-hover:opacity-40'></img>
                    </div>
                    <div 
                        onClick={scrollRight}
                        className={`border-white border-2 rounded-full p-2.5 hover:bg-white group ${currentIndex === concepts.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <img src='/arrow.svg' className='rotate-45 w-25 h-25 group-hover:invert group-hover:opacity-40'></img>
                    </div>
                </div>
            </div>
        </>
    )
}