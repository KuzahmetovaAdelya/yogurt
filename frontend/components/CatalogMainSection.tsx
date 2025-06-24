import { useEffect, useState } from 'react';
import SmallCard from './SmallCard';
import { trackPromise } from 'react-promise-tracker';
import axios from 'axios';
import host from "../host";

const area = 'informationList';
const apiUrl = `${host}items`

export default function CatalogMainSection() {
    const [informationList, setInformationList] = useState([])
    const [catPage, setCatPage] = useState(1)
    const ITEMS_PER_PAGE = 8;

    useEffect(() => {
        trackPromise(axios.get(apiUrl), area).then(({ data }) => {
            setInformationList(data);
        }).catch((error) => {
            console.log(error)
        });
    }, []);

    const totalPages = Math.ceil(informationList.length / ITEMS_PER_PAGE);

    // Товары для текущей страницы
    const catalogList = informationList.slice(
        (catPage - 1) * ITEMS_PER_PAGE,
        catPage * ITEMS_PER_PAGE
    );

    function pagePlus() {
        if (catPage < totalPages) {
            setCatPage(catPage + 1);
        }
    }

    function pageMinus() {
        if (catPage > 1) {
            setCatPage(catPage - 1);
        }
    }

    return (
        <>
            <div className='w-phone mx-auto mb-20 lg:w-tablet xl:w-notepad 2xl:w-desktop'>
                <div className='grid grid-cols-2 gap-5 mb-5 lg:gap-20 xl:grid-cols-4 xl:gap-10 2xl:mb-10'>
                    {catalogList.map((item) => 
                        <SmallCard item={item} key={item.id} />
                    )}
                </div>

                <hr className='hidden lg:block lg:w-tablet lg:mx-auto lg:border-gray lg:mb-5 xl:w-notepad 2xl:w-desktop'></hr>
                <div className='hidden lg:flex lg:justify-between lg:items-center'>
                    <div className='flex gap-5'>
                        <div className='border-white border-2 rounded-full p-2.5 group hover:bg-white cursor-pointer hover:border-gray' onClick={pageMinus}><img src='/arrow.svg' className='rotate-225 w-25 h-25 group-hover:invert group-hover:opacity-40'></img></div>
                        <div className='border-white border-2 rounded-full p-2.5 group hover:bg-white cursor-pointer hover:border-gray' onClick={pagePlus}><img src='/arrow.svg' className='rotate-45 w-25 h-25 group-hover:invert group-hover:opacity-40'></img></div>
                    </div>

                    <div className='flex gap-5'>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) =>
                            <p
                                key={page}
                                className={`text-big-para font-medium hover:text-white cursor-pointer ${catPage === page ? 'text-white' : 'text-gray'}`}
                                onClick={() => setCatPage(page)}
                            >
                                {page}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}