import { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminTable from "../components/AdminTable";

export default function AdminPage({}) {
    const [header, setHeader] = useState('Коллаборации')

    let informationList = [{
            pageName: "collabs",
            titles: [
                'Фото',
                'Название',
                'Цена'
            ],
            data: [
                {
                    'id': 1,
                    'img': '/headphones5.png',
                    'name': 'The case is \ gold standard',
                    'price': 4700,
                },
                {
                    'id': 2,
                    'img': '/cap3.png',
                    'name': 'Cap Wings',
                    'price': 4300,
                },
                {
                    'id': 3,
                    'img': '/headphones6.png',
                    'name': 'Body kit fast street',
                    'price': 4500,
                }
            ]
        }]

    return (
        <>
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