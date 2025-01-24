export default function AdminTable({header}) {
    let pageName;

    if (header === 'Каталог') {
        pageName = 'catalog'
    } else if (header === 'Концепции') {
        pageName = 'concepts'
    } else {
        pageName = 'collabs'
    }

    let informationList = [
        {
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
        },
        {
            pageName: "concepts",
            titles: [
                'Фото',
                'Название',
                'Цена'
            ],
            data: [
                {
                    'id': 4,
                    'img': '/headphones5.png',
                    'name': 'The case is \ gold standard',
                    'price': 4500,
                },
                {
                    'id': 4,
                    'img': '/cap3.png',
                    'name': 'Cap Wings',
                    'price': 4300,
                },
                {
                    'id': 4,
                    'img': '/headphones6.png',
                    'name': 'Body kit fast street',
                    'price': 4500,
                }
            ]
        }
    ]

    let info = {};


    for (let i in informationList) {
        if (informationList[i].pageName === pageName) {
            info = informationList[i];
        }
    }



    return (
        <>
            <table className="bg-black w-notepad mt-5 rounded-xl">
                <thead className="border-b border-b-full-black">
                    <tr>
                        {info.titles.map((title) => <>{
                            title === 'Описание' ?
                            <th className="py-5 text-white opacity-70 text-p text-center font-semibold w-96">{title}</th> :
                            <th className="py-5 text-white opacity-70 text-p text-center font-semibold">{title}</th>
                        }</>)}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {info.data.map((item) => <tr className='border-b border-b-gray'>
                        {item.img !== '' ?
                            <td className='p-2.5 w-20'><img className='w-60px h-60px' src={item.img}></img></td> :
                            <td className='p-2.5 w-20'><div className='w-60px h-60px bg-light-gray rounded-full'></div></td> 
                        }
                        <td className='text-center font-medium text-lg text-white leading-4.5'>{item.name}</td>
                        <td className='text-center font-medium text-lg text-white leading-4.5'>{item.price}</td>
                        <td className='text-center font-medium text-lg text-white leading-4.5'>{item.discount}</td>
                        <td className='text-center font-medium text-lg text-white leading-4.5 w-96 line-clamp-4 hover:line-clamp-none cursor-pointer'>{item.description}</td>
                        <td className='text-center font-medium text-lg text-white leading-4.5'>{item.type}</td>
                        <td className='text-center font-medium text-lg text-white leading-4.5'>{item.material}</td>
                        <td className='space-x-2.5 w-24'>
                            <button className='p-2 bg-blue border border-blue rounded-xl hover:bg-black hover:border-light-gray group'><img src='/edit.svg' className='w-19 h-19 group-hover:contrast-200'></img></button>
                            <button className='p-2 bg-light-gray border border-light-gray rounded-xl hover:bg-black group'><img src='/delete1.svg' className='w-19 h-19 group-hover:contrast-200 group-hover:invert'></img></button>
                        </td>
                    </tr>)}
                </tbody>
                
                <div className='flex'>
                    <button className='py-1.5 w-19'><img src='/admin-arrow.svg' className='rotate-180 w-19 h-19'></img></button>
                    <button className='py-1.5 px-2.5 text-gray text-p hover:bg-gray hover:text-white'>1</button>
                    <button className='py-1.5 px-2.5 text-gray text-p hover:bg-gray hover:text-white'>2</button>
                    <button className='py-1.5 px-2.5 text-white text-p bg-admin-gray'>3</button>
                    <button className='py-1.5 px-2.5 text-gray text-p hover:bg-gray hover:text-white'>4</button>
                    <button className='py-1.5 px-2.5 text-gray text-p hover:bg-gray hover:text-white'>5</button>
                    <button className='py-1.5 w-19'><img src='/admin-arrow.svg' className='w-19 h-19'></img></button>
                </div>
            </table>
        </>
    )
}