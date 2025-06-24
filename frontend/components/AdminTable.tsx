import { useState } from "react";
import Modal from "./AdminModal";
import { trackPromise } from "react-promise-tracker";
import axios from "axios";
import host from "../host";

interface AdminTableProps {
    pageName: string;
    informationList: any[];
    titlesList: string[];
    onDelete: () => void;
}

export default function AdminTable({pageName, informationList, titlesList, onDelete}: AdminTableProps) {
    const ITEMS_PER_PAGE = 10;
    let [isModalOpen, setIsModalOpen] = useState(false)
    let [itemId, setItemId] = useState(1);
    let [currentPage, setCurrentPage] = useState(1);

    // Calculate total pages
    const totalPages = Math.ceil(informationList.length / ITEMS_PER_PAGE);
    
    // Get current page items
    const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return informationList.slice(startIndex, endIndex);
    };

    function openModal(id: number) {
        setItemId(id);
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    function handlePageChange(pageNumber: number) {
        setCurrentPage(pageNumber);
    }

    function handlePrevPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function handleNextPage() {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    // Generate page numbers array
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 5; i++) {
                    pages.push(i);
                }
            } else if (currentPage >= totalPages - 2) {
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    pages.push(i);
                }
            }
        }
        return pages;
    };

    function deleteElement(id: number) {
        if (pageName === 'catalog') {
            fetch(`${host}items/${id}/delete`, {method: "delete"})
            .then((response) => {
                return response.json()
            }).then((data) => {
                console.log(data);
                onDelete();
            });
        } else if (pageName === 'concepts') {
            fetch(`${host}concepts/${id}/delete`, {method: "delete"})
            .then((response) => {
                return response.json()
            }).then((data) => {
                console.log(data);
                onDelete();
            });
        } else {
            fetch(`${host}collabs/${id}/delete`, {method: "delete"})
            .then((response) => {
                return response.json()
            }).then((data) => {
                console.log(data);
                onDelete();
            });
        }
    }

    function getImg() {
        trackPromise(axios.post(`${host}items/streamable`)).then(({ data }) => {
            console.log(data);
        }).catch((error) => {
            console.log(error)
        })
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
                    {pageName === 'catalog' &&
                    getCurrentPageItems().map((item: {id: number, image: string[], name: string, price: number, discount: number, description: string, type: string, material: string}) => 
                    <tr className='border-b border-b-gray' key={item.id} id={item.id.toString()}>
                        {item.image.length !== 0 ?
                            <td className='p-2.5 w-20'>
                                <img alt="item image" className="w-60px h-60px rounded-full" src={`http://localhost:3001/images/${item.image[0]}`}></img>
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
                    </tr>)}

                    {pageName === 'concepts' &&
                    getCurrentPageItems().map((item: {id: number, image: string[], name: string, price: number}) => 
                    <tr className='border-b border-b-gray' key={item.id}>
                        {item.image.length !== 0 ?
                            <td className='p-2.5 w-20'><img alt="concept" className='w-60px h-60px rounded-full' src={`http://localhost:3001/images/${item.image[0]}`}></img></td> :
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
                    getCurrentPageItems().map((item: {id: number, image: string[], name: string, description: string, instagram: string, telegram: number, vkontakte: string, youtube: string}) => 
                    <tr className='border-b border-b-gray' key={item.id}>
                        {item.image.length !== 0 ?
                            <td className='p-2.5 w-20'><img alt="collab" className='w-60px h-60px rounded-full' src={`http://localhost:3001/images/${item.image[0]}`}></img></td> :
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
                                <button 
                                    type="button" 
                                    title="back" 
                                    className='transition py-1.5 w-19 hover:bg-gray rounded-md group'
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                >
                                    <img src='/admin-arrow.svg' alt="back" className='rotate-180 w-19 h-19 group-hover:invert'></img>
                                </button>
                                {getPageNumbers().map((pageNum) => (
                                    <button 
                                        key={pageNum}
                                        type="button" 
                                        title="page number" 
                                        className={`transition py-1.5 px-5 leading-none rounded-md text-p hover:bg-gray hover:text-white ${
                                            currentPage === pageNum ? 'text-white bg-admin-gray' : 'text-gray'
                                        }`}
                                        onClick={() => handlePageChange(pageNum)}
                                    >
                                        {pageNum}
                                    </button>
                                ))}
                                <button 
                                    type="button" 
                                    title="next" 
                                    className='transition py-1.5 w-19 hover:bg-gray rounded-md group'
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                >
                                    <img alt="next" src='/admin-arrow.svg' className='w-19 h-19 group-hover:invert'></img>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            {isModalOpen &&
            <Modal closeModal={closeModal} id={itemId} pageName={pageName} onSuccess={onDelete} />
            }
            
        </>
    )
}