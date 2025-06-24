import axios from "axios";
import { useEffect, useState } from "react"
import { trackPromise } from "react-promise-tracker";
import host from "../host";

interface Item {
    id: number;
    image: string[];
    name: string;
    price: number;
    discount: number;
    description: string;
    type: string;
    material: string;
}

interface Collab {
    id: number;
    image: string[];
    name: string;
    description: string;
    instagram: string;
    telegram: string;
    vkontakte: string;
    youtube: string;
}

interface Concept {
    id: number;
    image: string[];
    name: string;
    price: number;
}

interface UpdateData {
    name: string;
    price: string;
    discount: string;
    description: string;
    type: string;
    material: string;
    instagram: string;
    telegram: string;
    vkontakte: string;
    youtube: string;
    image: string[];
}

interface ModalProps {
    closeModal: () => void;
    id: number;
    pageName: string;
    onSuccess: () => void;
}

export default function Modal({closeModal, id, pageName, onSuccess}: ModalProps) {
    const [itemsArr, setItemsArr] = useState<Item[]>([]);
    const [collab, setCollab] = useState<Collab | null>(null);
    const [concept, setConcept] = useState<Concept | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [newImages, setNewImages] = useState<string[]>([]);
    const [deletedImages, setDeletedImages] = useState<string[]>([]);
    const [formData, setFormData] = useState<UpdateData>({
        name: '',
        price: '',
        discount: '',
        description: '',
        type: '',
        material: '',
        instagram: '',
        telegram: '',
        vkontakte: '',
        youtube: '',
        image: []
    });
    
    useEffect(() => {
        if (pageName === 'catalog') {
            trackPromise(axios.get(`${host}items/${id}/get`)).then(({ data }) => {
                setItemsArr([data]);
                setImages(data.image || []);
                setFormData({
                    name: data.name || '',
                    price: data.price?.toString() || '',
                    discount: data.discount?.toString() || '',
                    description: data.description || '',
                    type: data.type || '',
                    material: data.material || '',
                    instagram: '',
                    telegram: '',
                    vkontakte: '',
                    youtube: '',
                    image: data.image || []
                });
            }).catch((error) => {
                console.error('Error fetching item:', error);
            });
        } else if (pageName === 'collabs') {
            trackPromise(axios.get(`${host}collabs/${id}/get`)).then(({ data }) => {
                console.log('Received collab data:', data);
                setCollab(data);
                // Handle image data - it might be a string or array
                const imageArray = typeof data.image === 'string' ? data.image.split(',') : (data.image || []);
                setImages(imageArray);
                setFormData({
                    name: data.name || '',
                    description: data.description || '',
                    instagram: data.instagram || '',
                    telegram: data.telegram || '',
                    vkontakte: data.vkontakte || '',
                    youtube: data.youtube || '',
                    price: '',
                    discount: '',
                    type: '',
                    material: '',
                    image: imageArray
                });
            }).catch((error) => {
                console.error('Error fetching collab:', error);
            });
        } else if (pageName === 'concepts') {
            trackPromise(axios.get(`${host}concepts/${id}/get`)).then(({ data }) => {
                console.log('Received concept data:', data);
                setConcept(data);
                // Handle image data - it might be a string or array
                const imageArray = typeof data.image === 'string' ? data.image.split(',') : (data.image || []);
                setImages(imageArray);
                setFormData({
                    name: data.name || '',
                    price: data.price?.toString() || '',
                    description: '',
                    type: '',
                    material: '',
                    instagram: '',
                    telegram: '',
                    vkontakte: '',
                    youtube: '',
                    discount: '',
                    image: imageArray
                });
            }).catch((error) => {
                console.error('Error fetching concept:', error);
            });
        }
    }, [id, pageName]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        
        const files = Array.from(event.target.files);
        const formData = new FormData();
        
        for (const file of files) {
            formData.append('file', file);
            try {
                const response = await axios.post(`${host}images`, formData);
                const newImage = response.data;
                setNewImages(prev => [...prev, newImage]);
                setImages(prev => [...prev, newImage]);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    const handleImageDelete = async (imageName: string) => {
        try {
            await axios.delete(`${host}images/${imageName}`);
            setImages(prev => prev.filter(img => img !== imageName));
            setDeletedImages(prev => [...prev, imageName]);
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // Log the form data before processing
        console.log('Form data before processing:', formData);
        console.log('Images:', images);
        console.log('New images:', newImages);
        console.log('Deleted images:', deletedImages);

        let data;
        if (pageName === 'collabs') {
            // For collabs, only include relevant fields
            data = {
                name: formData.name,
                description: formData.description,
                instagram: formData.instagram,
                telegram: formData.telegram,
                vkontakte: formData.vkontakte,
                youtube: formData.youtube,
                image: [...images.filter(img => !deletedImages.includes(img)), ...newImages]
            };
        } else if (pageName === 'concepts') {
            // For concepts, only include relevant fields
            data = {
                name: formData.name,
                price: Number(formData.price),
                image: [...images.filter(img => !deletedImages.includes(img)), ...newImages]
            };
        } else {
            // For catalog items, include all fields and convert numeric values
            data = {
                name: formData.name,
                price: Number(formData.price),
                discount: Number(formData.discount),
                description: formData.description,
                type: formData.type,
                material: formData.material,
                image: [...images.filter(img => !deletedImages.includes(img)), ...newImages]
            };
        }

        // Log the final data being sent
        console.log('Data being sent:', data);

        try {
            if (pageName === 'catalog') {
                await axios.put(`${host}items/${id}/update`, data);
            } else if (pageName === 'concepts') {
                await axios.put(`${host}concepts/${id}/update`, data);
            } else if (pageName === 'collabs') {
                await axios.put(`${host}collabs/${id}/update`, data);
            }
            onSuccess();
            closeModal();
        } catch (error) {
            console.error('Error updating:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
            }
        }
    };

    return (
        <div className="modal block fixed z-50 top-0 left-0 w-screen h-screen bg-rgba-black">
            <div className="modal-content bg-admin-black w-830 h-725 rounded-basket mx-auto mt-44 p-5">
                <div className="justify-self-end text-white w-9 h-9 bg-blue flex items-center justify-center rounded-basket cursor-pointer hover:bg-white group transition" onClick={closeModal}>
                    <p className="text-center align-middle text-2xl leading-none group-hover:text-blue">&times;</p>
                </div>

                <div>
                    <form method="post" onSubmit={handleSubmit}>
                        <p className="font-normal text-sm">Фото</p>
                        <div className="w-780 flex items-start justify-between mt-2.5">
                            <input type="file" id="file" name="file" className="hidden" onChange={handleImageUpload} multiple></input>
                            <label draggable="true" htmlFor="file" className="hover:bg-gray hover:text-admin-gray transition cursor-pointer text-big-para-2xl flex items-center justify-center w-148 h-114 bg-admin-gray rounded-basket">
                                <p className="w-max leading-none align-middle">+</p>
                            </label>

                            <div className="grid grid-cols-2 w-600 gap-2.5">
                                {images.map((image, index) => (
                                    <div key={index} className="flex items-center gap-9">
                                        <p className="text-sm font-medium w-220">{image}</p>
                                        <button 
                                            type="button"
                                            className="transition group hover:bg-admin-black border border-light-gray bg-light-gray w-9 h-9 flex items-center justify-center rounded-basket"
                                            onClick={() => handleImageDelete(image)}
                                        >
                                            <img src="/delete1.svg" className="w-6 group-hover:contrast-200 group-hover:invert"></img>
                                        </button>
                                    </div>
                                ))}
                            </div>                            
                        </div>

                        <div className="mt-5 grid grid-rows-4 grid-cols-2 grid-flow-col gap-x-5">
                            {pageName === 'catalog' && 
                            itemsArr.map((item) => 
                            <>
                            <div className="flex flex-col gap-2.5 h-90">
                                <label htmlFor="name" className="font-normal text-sm cursor-pointer">Название</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    className="font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket" 
                                    placeholder="Чехол для ipods" 
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="flex flex-col gap-2.5">
                                <label htmlFor="price" className="font-normal text-sm cursor-pointer">Цена</label>
                                <input 
                                    type="number" 
                                    name="price" 
                                    id="price" 
                                    min="1" 
                                    className="font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket" 
                                    placeholder="2500" 
                                    value={formData.price}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="flex flex-col gap-2.5">
                                <label htmlFor="discount" className="font-normal text-sm cursor-pointer">Скидки</label>
                                <input 
                                    type="number" 
                                    name="discount" 
                                    id="discount" 
                                    min='0' 
                                    className="font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket" 
                                    placeholder="15" 
                                    value={formData.discount}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="flex flex-col gap-2.5">
                                <label htmlFor="description" className="font-normal text-sm cursor-pointer">Описание</label>
                                <textarea 
                                    name="description" 
                                    id="description" 
                                    className="resize-none font-serif focus-visible:outline-1 w-full bg-admin-gray h-90 font-sm pl-5 py-1.5 pr-2.5 rounded-basket" 
                                    placeholder="Описание товара" 
                                    value={formData.description}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="flex flex-col gap-2.5">
                                <label htmlFor="type" className="font-normal text-sm cursor-pointer">Тип</label>
                                <input 
                                    type="text" 
                                    name="type" 
                                    id="type" 
                                    className="font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket" 
                                    placeholder="Чехол для наушников" 
                                    value={formData.type}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="flex flex-col gap-2.5">
                                <label htmlFor="material" className="font-normal text-sm cursor-pointer">Материал</label>
                                <input 
                                    type="text" 
                                    name="material" 
                                    id="material" 
                                    className="font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket" 
                                    placeholder="Пластик, резина" 
                                    value={formData.material}
                                    onChange={handleInputChange}
                                />
                            </div>
                            </>
                            )}

                            {pageName === 'concepts' &&
                            <>
                            <div className="flex flex-col gap-2.5 h-90">
                                <label htmlFor="name" className="font-normal text-sm cursor-pointer">Название</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    className="font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket" 
                                    placeholder="Название концепта" 
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="flex flex-col gap-2.5">
                                <label htmlFor="price" className="font-normal text-sm cursor-pointer">Цена</label>
                                <input 
                                    type="number" 
                                    name="price" 
                                    id="price" 
                                    min="1" 
                                    className="font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket" 
                                    placeholder="2500" 
                                    value={formData.price}
                                    onChange={handleInputChange}
                                />
                            </div>
                            </>
                            }

                            {pageName === 'collabs' &&
                            <>
                            <div className="flex flex-col gap-2.5 h-90">
                                <label htmlFor="name" className="font-normal text-sm cursor-pointer">Имя</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    className="font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket" 
                                    placeholder="Biicla" 
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="flex flex-col gap-2.5">
                                <label htmlFor="description" className="font-normal text-sm cursor-pointer">Описание</label>
                                <textarea 
                                    name="description" 
                                    id="description" 
                                    className="resize-none font-serif focus-visible:outline-1 w-full bg-admin-gray h-90 font-sm pl-5 py-1.5 pr-2.5 rounded-basket" 
                                    placeholder="Текст" 
                                    value={formData.description}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="flex flex-col gap-2.5 mt-2.5">
                                <label htmlFor="instagram" className="font-normal text-sm cursor-pointer">Инстаграм</label>
                                <input 
                                    type="url" 
                                    name="instagram" 
                                    id="instagram" 
                                    className="font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket" 
                                    placeholder="/" 
                                    value={formData.instagram}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="flex flex-col gap-2.5">
                                <label htmlFor="telegram" className="font-normal text-sm cursor-pointer">Телеграм</label>
                                <input 
                                    type="url" 
                                    name="telegram" 
                                    id="telegram" 
                                    className="font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket" 
                                    placeholder="/" 
                                    value={formData.telegram}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="flex flex-col gap-2.5">
                                <label htmlFor="vkontakte" className="font-normal text-sm cursor-pointer">ВК</label>
                                <input 
                                    type="url" 
                                    name="vkontakte" 
                                    id="vkontakte" 
                                    className="font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket" 
                                    placeholder="/" 
                                    value={formData.vkontakte}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="flex flex-col gap-2.5">
                                <label htmlFor="youtube" className="font-normal text-sm cursor-pointer">Ютуб</label>
                                <input 
                                    type="url" 
                                    name="youtube" 
                                    id="youtube" 
                                    className="font-serif focus-visible:outline-1 w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket" 
                                    placeholder="/" 
                                    value={formData.youtube}
                                    onChange={handleInputChange}
                                />
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

                            <button type="submit" className="self-end justify-self-end bg-blue h-9 w-52 rounded-basket hover:bg-white hover:text-blue transition">Сохранить</button>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}