import { useEffect, useState } from "react";
import host from "../host";
import { formToJSON } from "axios";
import axios from "axios";
import { trackPromise } from "react-promise-tracker";


interface CatalogForm {
    image: string[],
    name: string,
    price: number,
    discount: number,
    description: string,
    type: string,
    material: string
}

export default function ModalCreation({closeModal, pageName}) {
    const [photoFiles, setPhotoFiles] = useState([]);

    // useEffect(() => {
    //     let element: HTMLElement = document.getElementById('file')
    //     element.addEventListener('change', function(){
            
    //     });
    // }, [])
    // let fs = require('fs');
    // let fileContent = fs.readFileSync('file.txt', 'utf8');
    // console.log(fileContent);

    function handlePhotoChange(e) {
        let form: HTMLFormElement = document.getElementById("creationForm");
        let formData = new FormData(form);
        let value: any = formData.get("file")
        if(value){
            let oldPhotoFiles = photoFiles;
            oldPhotoFiles.push(value);
            setPhotoFiles(oldPhotoFiles);
        }
        // }
        // let value: string = e.target.value;
        // if(value){
        //     let oldPhotoFiles = photoFiles;
        //     oldPhotoFiles.push(value);
        //     setPhotoFiles(oldPhotoFiles);
        // }
    }

    function deletePhoto(name: string) {
        let indexOfPhoto: number = photoFiles.indexOf(name);
        let oldPhotoFiles: string[] = photoFiles;
        oldPhotoFiles.splice(indexOfPhoto, 1);
        setPhotoFiles(oldPhotoFiles);
    }


    function handleSubmit(e) {
        e.preventDefault();
        let form: HTMLFormElement = document.getElementById("creationForm");
        let formData: FormData = new FormData(form);
        for (let i: number = 0; i < photoFiles.length; i++) {
            formData.append("files", photoFiles[i])
        }
        formData.delete("file")
        if (pageName === 'catalog') {
            let apiUrl: string = `${host}items/create`
            trackPromise(axios.post(apiUrl, formData)).then(({ data }) => {
                console.log(data);
            }).catch((error) => {
                console.log(error.message)
            });

            form.reset();
            setPhotoFiles([]);
            closeModal();
        } else if (pageName === 'concepts') {
         
            let apiUrl: string = `${host}concepts/create`
            trackPromise(axios.post(apiUrl, formData)).then(({ data }) => {
                console.log(data);
            }).catch((error) => {
                console.log(error.message)
            });

            form.reset();
            setPhotoFiles([]);
            closeModal();
        } else {

            let apiUrl: string = `${host}collabs/create`
            trackPromise(axios.post(apiUrl, formData)).then(({ data }) => {
                console.log(data);
            }).catch((error) => {
                console.log(error.message)
            });

            form.reset();
            setPhotoFiles([]);
            closeModal();
        }
        const apiUrl = `${host}items/createfolder`

        trackPromise(axios.post(apiUrl, formData)).then(({ data }) => {
            console.log(data);
        }).catch((error) => {
            console.log(error.message)
        });
    }

    return (
        <div className="modal block fixed z-50 top-0 left-0 w-screen h-screen bg-rgba-black">
            <div className="modal-content bg-admin-black w-830 h-606 rounded-basket mx-auto mt-44 p-5">
                <div className="justify-self-end text-white w-9 h-9 bg-blue flex items-center justify-center rounded-basket cursor-pointer hover:bg-white group transition" onClick={closeModal}>
                    <p className="text-center align-middle text-2xl leading-none group-hover:text-blue">&times;</p>
                </div>

                <div>
                    <form method="post" onSubmit={handleSubmit} id="creationForm" encType="multipart/form-data">
                        <p className="font-normal text-sm">Фото</p>
                        <div className="flex items-start justify-between mt-2.5">
                            <input type="file" id="file" name="file" className="hidden" accept=".jpg, .jpeg, .png" onChange={handlePhotoChange}></input>
                            <label draggable="true" htmlFor="file" className="hover:bg-gray hover:text-admin-gray transition cursor-pointer text-big-para-2xl flex items-center justify-center w-148 h-114 bg-admin-gray rounded-basket">
                                <p className="w-max leading-none align-middle">+</p>
                            </label>

                            
                            <div className="grid grid-cols-2 w-600 gap-2.5">
                                    {photoFiles.map((photo: string) => 
                                        <div className="flex items-center justify-between w-72" key={photo}>
                                            {/* <p className="text-sm font-medium">{photo.split("\\")[photo.split("\\").length - 1]}</p> */}
                                            <p className="text-sm font-medium">{photo.name}</p>
                                            <button onClick={() => deletePhoto(photo)} type="button" title="delete" className="transition group hover:bg-admin-black border border-light-gray bg-light-gray w-9 h-9 flex items-center justify-center rounded-basket">
                                                <img alt="delete" src="/delete1.svg" className="w-6 group-hover:contrast-200 group-hover:invert"></img>
                                            </button>
                                        </div>
                                    )}
                            </div>                            
                        </div>

                        <div className="mt-5 grid grid-rows-4 grid-cols-2 grid-flow-col gap-x-5">

                            {pageName === 'catalog' && 
                            <>
                            <div className="flex flex-col gap-2.5 h-90">
                                <label htmlFor="name" className="font-normal text-sm cursor-pointer">Название</label>
                                <input type="text" name="name" id="name" className="font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket" placeholder="Чехол для ipods" />
                            </div>

                            <div className="flex flex-col gap-2.5">
                                <label htmlFor="price" className="font-normal text-sm cursor-pointer">Цена</label>
                                <input type="number" name="price" id="price" min="1" className="font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket" placeholder="2500" />
                            </div>

                            <div className="flex flex-col gap-2.5">
                                <label htmlFor="discount" className="font-normal text-sm cursor-pointer">Скидки</label>
                                <input type="number" name="discount" id="discount" min='0' className="font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket" placeholder="15%" />
                            </div>

                            <div className="flex flex-col gap-2.5">
                                <label htmlFor="description" className="font-normal text-sm cursor-pointer">Описание</label>
                                <textarea name="description" id="description" className="resize-none font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket" placeholder="Текст" />
                            </div>

                            <div className="flex flex-col gap-2.5">
                                <label htmlFor="type" className="font-normal text-sm cursor-pointer">Тип</label>
                                <input type="text" name="type" id="type" className="font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket" placeholder="Чехол для наушников" />
                            </div>

                            <div className="flex flex-col gap-2.5">
                                <label htmlFor="material" className="font-normal text-sm cursor-pointer">Материал</label>
                                <input type="text" name="material" id="material" className="font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket" placeholder="Пластик, резина" />
                            </div>
                            </>
                            }

                            {pageName === 'concepts' &&
                            <>
                            <div className="flex flex-col gap-2.5 h-90">
                                <label htmlFor="name" className="font-normal text-sm cursor-pointer">Название</label>
                                <input type="text" name="name" id="name" className="font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket" placeholder="Чехол для ipods" />
                            </div>

                            <div className="flex flex-col gap-2.5">
                                <label htmlFor="price" className="font-normal text-sm cursor-pointer">Цена</label>
                                <input type="number" name="price" id="price" min="1" className="font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket" placeholder="2500" />
                            </div>
                            </>
                            }

                            {pageName === 'collabs' &&
                            <>
                            <div className="flex flex-col gap-2.5 h-90">
                                <label htmlFor="name" className="font-normal text-sm cursor-pointer">Имя</label>
                                <input type="text" name="name" id="name" className="font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket" placeholder="Biicla" />
                            </div>

                            <div className="flex flex-col gap-2.5">
                                <label htmlFor="description" className="font-normal text-sm cursor-pointer">Описание</label>
                                <textarea name="description" id="description" className="resize-none font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket" placeholder="Текст" />
                            </div>

                            <div className="flex flex-col gap-2.5 mt-2.5">
                                <label htmlFor="instagram" className="font-normal text-sm cursor-pointer">Инстаграм</label>
                                <input type="url" name="instagram" id="instagram" className="font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket" placeholder="https://" />
                            </div>

                            <div className="flex flex-col gap-2.5">
                                <label htmlFor="telegram" className="font-normal text-sm cursor-pointer">Телеграм</label>
                                <input type="url" name="telegram" id="telegram" className="font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket" placeholder="https://" />
                            </div>

                            <div className="flex flex-col gap-2.5">
                                <label htmlFor="vkontakte" className="font-normal text-sm cursor-pointer">ВК</label>
                                <input type="url" name="vkontakte" id="vkontakte" className="font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket" placeholder="https://" />
                            </div>

                            <div className="flex flex-col gap-2.5">
                                <label htmlFor="youtube" className="font-normal text-sm cursor-pointer">Ютуб</label>
                                <input type="url" name="youtube" id="youtube" className="font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket" placeholder="https://" />
                            </div>
                            </>
                            }

                            {pageName === 'concepts' &&
                            <>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </>
                            }

                            <div></div>

                            <button title="send" type="submit" className="self-end justify-self-end bg-blue h-9 w-52 rounded-basket hover:bg-white hover:text-blue transition">Сохранить</button>
                            {/* <button onClick={createFolder} title="send" type="button" className="self-end justify-self-end bg-blue h-9 w-52 rounded-basket hover:bg-white hover:text-blue transition">Сохранить</button> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}