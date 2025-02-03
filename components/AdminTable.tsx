import { useState } from "react";
import Modal from "./AdminModal";

export default function AdminTable({header, informationList}) {
    let pageName: string;

    if (header === 'Каталог') {
        pageName = 'catalog'
    } else if (header === 'Концепции') {
        pageName = 'concepts'
    } else {
        pageName = 'collabs'
    }

    let info: {pageName: string, titles: string[], data: any[]};


    for (let i in informationList) {
        if (informationList[i].pageName === pageName) {
            info = informationList[i];
        }
    }

    let [isModalOpen, setIsModalOpen] = useState(false)
    let [itemId, setItemId] = useState(1);

    function openModal(id: number) {
        setItemId(id);
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false)
    }



    return (
        <>  
            <table className="bg-black w-notepad mt-5 rounded-xl relative">
                <thead className="border-b border-b-full-black">
                    <tr>
                        {info.titles.map((title) => <>{
                            title === 'Описание' ?
                            <th key={title} className="py-5 text-white opacity-70 text-p text-center font-semibold w-96">{title}</th> :
                            title === 'Материал' ?
                            <th className="py-5 text-white opacity-70 text-p text-center font-semibold w-270">{title}</th> :
                            <th className="py-5 text-white opacity-70 text-p text-center font-semibold">{title}</th>
                        }</>)}
                        <th></th>
                    </tr>
                </thead>
                <tbody id="table">
                    {pageName === 'catalog' &&
                     info.data.map((item) => <tr className='border-b border-b-gray' key={item.id}>
                        {item.img !== '' ?
                            <td className='p-2.5 w-20'><img className='w-60px h-60px' src={item.img}></img></td> :
                            <td className='p-2.5 w-20'><div className='w-60px h-60px bg-light-gray rounded-full'></div></td> 
                        }
                        <td className='text-center font-medium text-lg text-white leading-4.5'>{item.name}</td>
                        <td className='text-center font-medium text-lg text-white leading-4.5'>{item.price}</td>
                        <td className='text-center font-medium text-lg text-white leading-4.5'>{item.discount}</td>
                        <td className='text-center font-medium text-lg text-white leading-4.5 w-96 line-clamp-4 hover:line-clamp-none cursor-pointer'>{item.description}</td>
                        <td className='text-center font-medium text-lg text-white leading-4.5'>{item.type}</td>
                        <td className='text-center font-medium text-lg text-white leading-4.5 w-270'>{item.material}</td>
                        <td className='space-x-2.5 w-24'>
                            <button className='transition p-2 bg-blue border border-blue rounded-xl hover:bg-black hover:border-light-gray group' onClick={() => {openModal(item.id)}}><img src='/edit.svg' className='w-19 h-19 group-hover:contrast-200'></img></button>
                            <button className='transition p-2 bg-light-gray border border-light-gray rounded-xl hover:bg-black group'><img src='/delete1.svg' className='w-19 h-19 group-hover:contrast-200 group-hover:invert'></img></button>
                        </td>
                    </tr>)}

                    {pageName === 'concepts' &&
                     info.data.map((item) => <tr className='border-b border-b-gray' key={item.id}>
                        {item.img !== '' ?
                            <td className='p-2.5 w-20'><img className='w-60px h-60px' src={item.img}></img></td> :
                            <td className='p-2.5 w-20'><div className='w-60px h-60px bg-light-gray rounded-full'></div></td> 
                        }
                        <td className='text-center font-medium text-lg text-white leading-4.5'>{item.name}</td>
                        <td className='text-center font-medium text-lg text-white leading-4.5'>{item.price}</td>
                        <td className='space-x-2.5 w-24'>
                            <button className='transition p-2 bg-blue border border-blue rounded-xl hover:bg-black hover:border-light-gray group' onClick={() => {openModal(item.id)}}><img src='/edit.svg' className='w-19 h-19 group-hover:contrast-200'></img></button>
                            <button className='transition p-2 bg-light-gray border border-light-gray rounded-xl hover:bg-black group'><img src='/delete1.svg' className='w-19 h-19 group-hover:contrast-200 group-hover:invert'></img></button>
                        </td>
                    </tr>)}

                    {pageName === 'collabs' &&
                     info.data.map((item) => <tr className='border-b border-b-gray' key={item.id}>
                        {item.img !== '' ?
                            <td className='p-2.5 w-20'><img className='w-60px h-60px rounded-full' src={item.img}></img></td> :
                            <td className='p-2.5 w-20'><div className='w-60px h-60px bg-light-gray rounded-full'></div></td> 
                        }
                        <td className='text-center font-medium text-lg text-white leading-4.5'>{item.name}</td>
                        <td className='text-center font-medium text-lg text-white leading-4.5 w-96 line-clamp-4 hover:line-clamp-none cursor-pointer'>{item.description}</td>
                        <td className='text-center font-medium text-lg text-white leading-4.5'>{item.instagram}</td>
                        <td className='text-center font-medium text-lg text-white leading-4.5'>{item.telegram}</td>
                        <td className='text-center font-medium text-lg text-white leading-4.5'>{item.vkontakte}</td>
                        <td className='text-center font-medium text-lg text-white leading-4.5'>{item.youtube}</td>
                        <td className='space-x-2.5 w-24'>
                            <button className='transition p-2 bg-blue border border-blue rounded-xl hover:bg-black hover:border-light-gray group' onClick={() => {openModal(item.id)}}><img src='/edit.svg' className='w-19 h-19 group-hover:contrast-200'></img></button>
                            <button className='transition p-2 bg-light-gray border border-light-gray rounded-xl hover:bg-black group'><img src='/delete1.svg' className='w-19 h-19 group-hover:contrast-200 group-hover:invert'></img></button>
                        </td>
                    </tr>)}
                    <tr>
                        <td></td>
                        <td></td>
                        {pageName === 'catalog' && <>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        </>
                        }
                        {pageName === 'collabs' && <>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        </>
                        }
                        <td colSpan={2} className="">
                            <div className='flex items-center gap-1 mb-10 mt-14 float-right mr-5'>
                                <button className='transition py-1.5 w-19 hover:bg-gray rounded-md group'><img src='/admin-arrow.svg' className='rotate-180 w-19 h-19 group-hover:invert'></img></button>
                                <button className='transition py-1.5 px-5 leading-none rounded-md text-gray text-p hover:bg-gray hover:text-white'>1</button>
                                <button className='transition py-1.5 px-5 leading-none rounded-md text-gray text-p hover:bg-gray hover:text-white'>2</button>
                                <button className='transition py-1.5 px-5 leading-none rounded-md text-white text-p bg-admin-gray'>3</button>
                                <button className='transition py-1.5 px-5 leading-none rounded-md text-gray text-p hover:bg-gray hover:text-white'>4</button>
                                <button className='transition py-1.5 px-5 leading-none rounded-md text-gray text-p hover:bg-gray hover:text-white'>5</button>
                                <button className='transition py-1.5 w-19 hover:bg-gray rounded-md group'><img src='/admin-arrow.svg' className='w-19 h-19 group-hover:invert'></img></button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            {isModalOpen &&
            <Modal closeModal={closeModal} id={itemId} pageName={pageName} />
            }
            
        </>
    )
}