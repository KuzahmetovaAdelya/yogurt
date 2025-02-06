import { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminTable from "../components/AdminTable";
import Head from "next/head";

export default function AdminPage({}) {
    const header: string = 'Коллаборации'
    const [informationList, setInformationList] = useState([])

    // let informationList: any[] = [{
    //         pageName: "collabs",
    //         titles: [
    //             'Фото',
    //             'Имя',
    //             'Описание',
    //             "Инстаграм",
    //             'Телеграм',
    //             'ВК',
    //             'Ютуб',
    //         ],
    //         data: [
    //             {
    //                 'id': 1,
    //                 'img': '/photo.png',
    //                 'description': 'Продюсер, диджей и автор песен Виталий Жариков (Biicla) попал в лонг-лист рейтинга «З0 до 30», который ежегодно составляет российский Forbes. В этот список попадают те, кто к 30 годам получили признание в профессиональном сообществе и стали известны на всероссийском или даже глобальном уровне. Сейчас стартовало голосование в каждой из 10 номинаций. Biicla, как нетрудно догадаться, борется за победу в категории «Музыка».',
    //                 'name': 'Музыкант / DJ / Biicla',
    //                 "instagram": '/',
    //                 'telegram': '/',
    //                 'vkontakte': '/',
    //                 'youtube': '/',
    //             },
    //             {
    //                 'id': 1,
    //                 'img': '/photo.png',
    //                 'description': 'Продюсер, диджей и автор песен Виталий Жариков (Biicla) попал в лонг-лист рейтинга «З0 до 30», который ежегодно составляет российский Forbes.',
    //                 'name': 'Музыкант / DJ / Biicla',
    //                 "instagram": '/',
    //                 'telegram': '/',
    //                 'vkontakte': '/',
    //                 'youtube': '/',
    //             },
    //             {
    //                 'id': 1,
    //                 'img': '',
    //                 'description': 'Продюсер, диджей и автор песен Виталий Жариков (Biicla) попал в лонг-лист рейтинга «З0 до 30», который ежегодно составляет российский Forbes. В этот список попадают те, кто к 30 годам получили признание в профессиональном сообществе и стали известны на всероссийском или даже глобальном уровне. Сейчас стартовало голосование в каждой из 10 номинаций. Biicla, как нетрудно догадаться, борется за победу в категории «Музыка».',
    //                 'name': 'Музыкант / DJ / Biicla',
    //                 "instagram": '/',
    //                 'telegram': '/',
    //                 'vkontakte': '/',
    //                 'youtube': '/',
    //             },
    //         ]
    // }]

    let titlesList: string[] = [
        'Фото',
        'Имя',
        'Описание',
        "Инстаграм",
        'Телеграм',
        'ВК',
        'Ютуб',
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