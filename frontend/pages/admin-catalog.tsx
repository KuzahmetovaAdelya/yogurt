import { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminTable from "../components/AdminTable";
import Head from "next/head";
import ModalCreation from "../components/AdminCreationModal";
import { host } from "../host";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import axios from "axios";

const area = 'informationList';
const apiUrl = `${host}items`

export default function AdminPage({}) {
    const header: string = 'Каталог'
    const [informationList, setInformationList] = useState([])
    let [isModalOpen, setIsModalOpen] = useState(false)
    const { promiseInProgress } = usePromiseTracker({ area });

    let pageName: string;

    if (header === 'Каталог') {
        pageName = 'catalog'
    } else if (header === 'Концепции') {
        pageName = 'concepts'
    } else {
        pageName = 'collabs'
    }

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    useEffect(() => {
        // fetch("http://localhost:3001/items")
        // .then((response) => response.json())
        // .then((data) => setInformationList(data));

        trackPromise(axios.get(apiUrl), area).then(({ data }) => {
            setInformationList(data);
        }).catch((error) => {
            console.log(error)
        });
    }, [informationList])

    let titlesList: string[] = [
        'Фото',
        'Название',
        'Цена',
        'Скидки',
        'Описание',
        'Тип',
        'Материал'
    ]

    return (
        <>
            <Head>
                <title>Yegourt - Панель администратора</title>
            </Head>
            <div className="w-screen h-screen bg-admin-gray ">
                <AdminHeader />

                <div className="pt-44 pl-56">
                    <div className="flex w-notepad justify-between">
                        <h2 className="text-light-gray text-2xl font-semibold">{header}</h2>
                        <button type="submit" className="self-end justify-self-end bg-blue h-9 w-10 rounded-basket hover:bg-white hover:text-blue transition text-2xl" onClick={openModal}>+</button>
                    </div>

                    <AdminTable pageName={pageName} informationList={informationList} titlesList={titlesList} />
                </div>
            </div>
            
            {isModalOpen &&
                <ModalCreation closeModal={closeModal} pageName={pageName} />
            }
        </>
    )
}