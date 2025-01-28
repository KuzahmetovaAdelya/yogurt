import { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminTable from "../components/AdminTable";
import Head from "next/head";

export default function AdminPage({}) {
    const [header, setHeader] = useState('Каталог')

    let informationList = [{
            pageName: 'catalog',
            titles: [
                'Фото',
                'Название',
                'Цена',
                'Скидки',
                'Описание',
                'Тип',
                'Материал'
            ],
            data: [
                {
                    'id': 1,
                    'img': '/ipods1.png',
                    'name': 'Ipods case',
                    'price': 4500,
                    'discount': '10%',
                    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vulputate non lacus vel finibus. Cras tempus mi tortor, quis feugiat enim consectetur eu. Aenean vitae pulvinar dolor, nec suscipit metus.',
                    'type': "Чехол для наушников",
                    'material': "Пластик"
                },
                {
                    'id': 2,
                    'img': '/ipods2.png',
                    'name': 'Ipods case',
                    'price': 4500,
                    'discount': '10%',
                    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vulputate non lacus vel finibus. Cras tempus mi tortor, quis feugiat enim consectetur eu. Aenean vitae pulvinar dolor, nec suscipit metus.',
                    'type': "Чехол для наушников",
                    'material': "Пластик"
                },
                {
                    'id': 3,
                    'img': '',
                    'name': 'Ipods case',
                    'price': 4500,
                    'discount': '0%',
                    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vulputate non lacus vel finibus. Maecenas vulputate non lacus vel finibus. Cras tempus mi tortor, quis feugiat enim consectetur eu. Aenean vitae pulvinar dolor, nec suscipit metus.',
                    'type': "Чехол для наушников",
                    'material': "Пластик"
                },
                {
                    'id': 4,
                    'img': '/ipods1.png',
                    'name': 'Ipods case',
                    'price': 2500,
                    'discount': '10%',
                    'description': 'Maecenas vulputate non lacus vel finibus.',
                    'type': "Чехол для наушников",
                    'material': "Пластик"
                }
            ]
        }]

    return (
        <>
            <Head>
                <title>Yegourt - Панель администратора</title>
            </Head>
            <div className="w-screen h-screen bg-admin-gray ">
                <AdminHeader />

                <div className="pt-44 pl-56">
                    <h2 className="text-light-gray text-2xl font-semibold">{header}</h2>

                    <AdminTable header={header} informationList={informationList} />
                </div>
            </div>
        </>
    )
}