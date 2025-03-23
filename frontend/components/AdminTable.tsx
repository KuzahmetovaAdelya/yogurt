import { useState } from "react";
import Modal from "./AdminModal";
import { trackPromise } from "react-promise-tracker";
import axios from "axios";
import host from "../host";

export default function AdminTable({pageName, informationList, titlesList}) {

    let [isModalOpen, setIsModalOpen] = useState(false)
    let [itemId, setItemId] = useState(1);

    function openModal(id: number) {
        setItemId(id);
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    function deleteElement(id: number) {
        if (pageName === 'catalog') {
            fetch(`http://localhost:3001/items/${id}/delete`, {method: "delete"})
            .then((response) => {
                return response.json()
            }).then((data) => console.log(data));
        } else if (pageName === 'concepts') {
            fetch(`http://localhost:3001/concepts/${id}/delete`, {method: "delete"})
            .then((response) => {
                return response.json()
            }).then((data) => console.log(data));
        } else {
            fetch(`http://localhost:3001/collabs/${id}/delete`, {method: "delete"})
            .then((response) => {
                return response.json()
            }).then((data) => console.log(data));
        }
    }

    function getImg() {
        trackPromise(axios.post(`${host}items/streamable`)).then(({ data }) => {
            console.log(data);
        }).catch((error) => {
            console.log(error)
        })
    }

    // {
    //     // trackPromise(axios.get(`${host}items/streamable`, item.image[0])).then(({ data }) => {
    //     //     document.getElementById(item.id.toString()).innerHTML = '<img alt="item image" className="w-60px h-60px" src={`data:image/png;base64,${data}`}></img>'
    //     // // console.log(data);
    //     // }).catch((error) => {
    //     //     console.log(error)
    //     // })
    //     fetch(`${host}items/streamable`)
    //     .then((response) => {
    //         document.getElementById(item.id.toString()).innerHTML = '<img alt="item image" className="w-60px h-60px" src={`data:image/png;base64,${response}`}></img>'
    //         return response.json();
    //     })
    // }
    let tableInfo = []
    console.log(pageName)

    if (pageName === 'catalog') {

        for (let i: number = 0; i<informationList.length; i++) {
            let item = informationList[i]
            console.log(item.image[0])
            let imageB64: string;
            trackPromise(axios.get(`${host}items/streamable`, item.image[0])).then(({ data }) => {
                // document.getElementById(item.id.toString()).innerHTML = '<img alt="item image" className="w-60px h-60px" src={`data:image/png;base64,${data}`}></img>'
                imageB64 = data;
            }).catch((error) => {
                console.log(error)
            })
            let image = <td className='p-2.5 w-20'><div className='w-60px h-60px bg-light-gray rounded-full'></div></td>
            if (item.image.length !== 0) {
                image = <td className='p-2.5 w-20' id={item.id.toString()}><img alt="item image" className="w-60px h-60px" src={`data:image/png;base64,${imageB64}`}></img></td>
            } 
            let tableRow =
            <tr className='border-b border-b-gray' key={item.id}>
                {image}
                <td className='text-center font-medium text-lg text-white leading-4.5'>{item.name}</td>
                <td className='text-center font-medium text-lg text-white leading-4.5'>{item.price}</td>
                <td className='text-center font-medium text-lg text-white leading-4.5'>{item.discount}%</td>
                <td className='text-center font-medium text-lg text-white leading-4.5 w-96 line-clamp-4 hover:line-clamp-none cursor-pointer'>{item.description}</td>
                <td className='text-center font-medium text-lg text-white leading-4.5'>{item.type}</td>
                <td className='text-center font-medium text-lg text-white leading-4.5 w-270'>{item.material}</td>
                <td className='space-x-2.5 w-24'>
                    <button title="edit" type="button" className='transition p-2 bg-blue border border-blue rounded-xl hover:bg-black hover:border-light-gray group' onClick={() => {openModal(item.id)}}><img src='/edit.svg' alt="edit" className='w-19 h-19 group-hover:contrast-200'></img></button>
                    <button title="delete" type="button" className='transition p-2 bg-light-gray border border-light-gray rounded-xl hover:bg-black group' onClick={() => {deleteElement(item.id)}}><img src='/delete1.svg' alt="delete" className='w-19 h-19 group-hover:contrast-200 group-hover:invert'></img></button>
                </td>
            </tr>
            
            // console.log(tableRow)
            tableInfo.push(tableRow)
        }
        // console.log(tableInfo)
    }


    return (
        <>  
            <table className="bg-black w-notepad mt-5 rounded-xl relative">
                <thead className="border-b border-b-full-black">
                    <tr>
                        {titlesList.map((title: string) => <>{
                            title === 'Описание' ?
                            <th key={title} className="py-5 text-white opacity-70 text-p text-center font-semibold w-96">{title}</th> :
                            title === 'Материал' ?
                            <th key={title} className="py-5 text-white opacity-70 text-p text-center font-semibold w-270">{title}</th> :
                            <th key={title} className="py-5 text-white opacity-70 text-p text-center font-semibold">{title}</th>
                        }</>)}
                        <th></th>
                    </tr>
                </thead>
                <tbody id="table">
                    {/* {pageName === 'catalog' &&
                    informationList.map((item: {id: number, image: string[], name: string, price: number, discount: number, description: string, type: string, material: string}) => 
                    <tr className='border-b border-b-gray' key={item.id}>
                        {item.image.length !== 0 ?
                            <td className='p-2.5 w-20' id={item.id.toString()}>
                                {
                                    // trackPromise(axios.get(`${host}items/streamable`, item.image[0])).then(({ data }) => {
                                    //     document.getElementById(item.id.toString()).innerHTML = '<img alt="item image" className="w-60px h-60px" src={`data:image/png;base64,${data}`}></img>'
                                    // // console.log(data);
                                    // }).catch((error) => {
                                    //     console.log(error)
                                    // })
                                    fetch(`${host}items/streamable`)
                                    .then((response) => {
                                        document.getElementById(item.id.toString()).innerHTML = '<img alt="item image" className="w-60px h-60px" src={`data:image/png;base64,${response}`}></img>'
                                        return response.json();
                                    })
                                }
                            </td> :
                            <td className='p-2.5 w-20'><div className='w-60px h-60px bg-light-gray rounded-full'></div></td> 
                        }
                        
                        <td className='text-center font-medium text-lg text-white leading-4.5' onClick={getImg}>{item.name}</td>
                        <td className='text-center font-medium text-lg text-white leading-4.5'>{item.price}</td>
                        <td className='text-center font-medium text-lg text-white leading-4.5'>{item.discount}%</td>
                        <td className='text-center font-medium text-lg text-white leading-4.5 w-96 line-clamp-4 hover:line-clamp-none cursor-pointer'>{item.description}</td>
                        <td className='text-center font-medium text-lg text-white leading-4.5'>{item.type}</td>
                        <td className='text-center font-medium text-lg text-white leading-4.5 w-270'>{item.material}</td>
                        <td className='space-x-2.5 w-24'>
                            <button title="edit" type="button" className='transition p-2 bg-blue border border-blue rounded-xl hover:bg-black hover:border-light-gray group' onClick={() => {openModal(item.id)}}><img src='/edit.svg' alt="edit" className='w-19 h-19 group-hover:contrast-200'></img></button>
                            <button title="delete" type="button" className='transition p-2 bg-light-gray border border-light-gray rounded-xl hover:bg-black group' onClick={() => {deleteElement(item.id)}}><img src='/delete1.svg' alt="delete" className='w-19 h-19 group-hover:contrast-200 group-hover:invert'></img></button>
                        </td>
                    </tr>)} */}

                    {tableInfo}

                    {pageName === 'concepts' &&
                    informationList.map((item: {id: number, image: string[], name: string, price: number}) => 
                    <tr className='border-b border-b-gray' key={item.id}>
                        {item.image.length !== 0 ?
                            <td className='p-2.5 w-20'><img alt="concept" className='w-60px h-60px' src={item.image[0]}></img></td> :
                            <td className='p-2.5 w-20'><div className='w-60px h-60px bg-light-gray rounded-full'></div></td> 
                        }
                        <td className='text-center font-medium text-lg text-white leading-4.5'>{item.name}</td>
                        <td className='text-center font-medium text-lg text-white leading-4.5'>{item.price}</td>
                        <td className='space-x-2.5 w-24'>
                            <button title="edit" type="button" className='transition p-2 bg-blue border border-blue rounded-xl hover:bg-black hover:border-light-gray group' onClick={() => {openModal(item.id)}}><img alt="edit" src='/edit.svg' className='w-19 h-19 group-hover:contrast-200'></img></button>
                            <button title="delete" type="button" className='transition p-2 bg-light-gray border border-light-gray rounded-xl hover:bg-black group' onClick={() => {deleteElement(item.id)}}><img alt="delete" src='/delete1.svg' className='w-19 h-19 group-hover:contrast-200 group-hover:invert'></img></button>
                        </td>
                    </tr>)}

                    {pageName === 'collabs' &&
                    informationList.map((item: {id: number, image: string[], name: string, description: string, instagram: string, telegram: number, vkontakte: string, youtube: string}) => 
                    <tr className='border-b border-b-gray' key={item.id}>
                        {item.image.length !== 0 ?
                            <td className='p-2.5 w-20'><img alt="collab" className='w-60px h-60px rounded-full' src={item.image[0]}></img></td> :
                            <td className='p-2.5 w-20'><div className='w-60px h-60px bg-light-gray rounded-full'></div></td> 
                        }
                        <td className='text-center font-medium text-lg text-white leading-4.5'>{item.name}</td>
                        <td className='text-center font-medium text-lg text-white leading-4.5 w-96 line-clamp-4 hover:line-clamp-none cursor-pointer'>{item.description}</td>
                        <td className='text-center font-medium text-lg text-white leading-4.5'>{item.instagram}</td>
                        <td className='text-center font-medium text-lg text-white leading-4.5'>{item.telegram}</td>
                        <td className='text-center font-medium text-lg text-white leading-4.5'>{item.vkontakte}</td>
                        <td className='text-center font-medium text-lg text-white leading-4.5'>{item.youtube}</td>
                        <td className='space-x-2.5 w-24'>
                            <button title="edit" type="button" className='transition p-2 bg-blue border border-blue rounded-xl hover:bg-black hover:border-light-gray group' onClick={() => {openModal(item.id)}}><img alt="edit" src='/edit.svg' className='w-19 h-19 group-hover:contrast-200'></img></button>
                            <button title="delete" type="button" className='transition p-2 bg-light-gray border border-light-gray rounded-xl hover:bg-black group' onClick={() => {deleteElement(item.id)}}><img alt="delete" src='/delete1.svg' className='w-19 h-19 group-hover:contrast-200 group-hover:invert'></img></button>
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
                                <button type="button" title="back" className='transition py-1.5 w-19 hover:bg-gray rounded-md group'><img src='/admin-arrow.svg' alt="back" className='rotate-180 w-19 h-19 group-hover:invert'></img></button>
                                <button type="button" title="page number" className='transition py-1.5 px-5 leading-none rounded-md text-gray text-p hover:bg-gray hover:text-white'>1</button>
                                <button type="button" title="page number" className='transition py-1.5 px-5 leading-none rounded-md text-gray text-p hover:bg-gray hover:text-white'>2</button>
                                <button type="button" title="page number" className='transition py-1.5 px-5 leading-none rounded-md text-white text-p bg-admin-gray'>3</button>
                                <button type="button" title="page number" className='transition py-1.5 px-5 leading-none rounded-md text-gray text-p hover:bg-gray hover:text-white'>4</button>
                                <button type="button" title="page number" className='transition py-1.5 px-5 leading-none rounded-md text-gray text-p hover:bg-gray hover:text-white'>5</button>
                                <button type="button" title="next" className='transition py-1.5 w-19 hover:bg-gray rounded-md group'><img alt="next" src='/admin-arrow.svg' className='w-19 h-19 group-hover:invert'></img></button>
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