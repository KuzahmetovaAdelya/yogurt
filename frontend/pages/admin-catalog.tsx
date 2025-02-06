import { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminTable from "../components/AdminTable";
import Head from "next/head";

export default function AdminPage({}) {
    const header: string = 'Каталог'
    const [informationList, setInformationList] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/items")
        .then((response) => response.json())
        .then((data) => setInformationList(data));
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
                    <h2 className="text-light-gray text-2xl font-semibold">{header}</h2>

                    <AdminTable header={header} informationList={informationList} titlesList={titlesList} />
                </div>
            </div>
        </>
    )
}