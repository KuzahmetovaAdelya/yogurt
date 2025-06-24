export default function BigCard({item}) {
    if (!item) {
        return null;
    }

    return (
        <a className="group" href={`/item/${item.id}`}>
            <div className="cursor-pointer">
                <div className="hero-main mb-2.5 lg:mb-5">
                    <div className="bg-gray h-80 w-full flex justify-center items-center xl:h-500">
                        {item.image && item.image[0] ? (
                            <img src={`http://localhost:3001/images/${item.image[0]}`} className="w-72 h-56 lg:w-400 lg:h-300 xl:w-575 xl:h-500 object-contain"></img>
                        ) : (
                            <div className="w-72 h-56 lg:w-400 lg:h-300 xl:w-575 xl:h-500 bg-gray"></div>
                        )}
                    </div>
                    <div className="hero-under"></div>
                </div>

                <div className="flex justify-between items-center lg:items-start">
                    <h3 className="text-white text-lg font-medium tracking-tighter uppercase w-2/3 leading-5 lg:text-2xl lg:leading-tight xl:text-p-lg xl:w-max group-hover:text-gray">{item.name}</h3>
                    <p className="font-bold text-white text-number tracking-tighter xl:font-semibold group-hover:text-gray">
                        {item.discount ? Math.ceil(item.price - item.price / 100 * item.discount) : item.price}
                    </p>
                </div>
            </div>
        </a>
    )
}