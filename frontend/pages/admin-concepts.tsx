import { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminTable from "../components/AdminTable";
import Head from "next/head";
import ModalCreation from "../components/AdminCreationModal";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import axios from "axios";
import { useRouter } from 'next/router';
import { jwtDecode } from "jwt-decode";
import host from "../host";

const area = 'informationList';
const apiUrl = `${host}concepts`

interface DecodedToken {
    userId: number;
    userRole: string;
    exp: number;
}

export default function AdminPage({}) {
    const router = useRouter();
    const header: string = 'Концепции'
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

    const fetchData = async () => {
        try {
            const { data } = await trackPromise(axios.get(apiUrl), area);
            setInformationList(data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        // Check authentication and role
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/');
            return;
        }

        try {
            const decodedToken = jwtDecode<DecodedToken>(token);
            const currentTime = Date.now() / 1000;

            // Check if token is expired
            if (decodedToken.exp < currentTime) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                router.push('/');
                return;
            }

            // Check if user has admin role
            if (decodedToken.userRole !== 'admin') {
                router.push('/');
                return;
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            router.push('/');
            return;
        }

        // If authentication is successful, fetch data
        fetchData();
    }, [router])

    let titlesList: string[] = [
        'Фото',
        'Название',
        'Цена'
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

                    <AdminTable pageName={pageName} informationList={informationList} titlesList={titlesList} onDelete={fetchData} />
                </div>
            </div>

            {isModalOpen &&
                <ModalCreation closeModal={closeModal} pageName={pageName} onSuccess={fetchData} />
            }
        </>
    )
}