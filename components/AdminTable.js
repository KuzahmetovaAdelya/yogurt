export default function AdminTable({header}) {
    if (header === 'Каталог') {
        let pageName = 'catalog'
    } else if (header === 'Концепции') {
        let pageName = 'concepts'
    } else {
        let pageName = 'collabs'
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
            data: {

            }
        }
    ]

    return (
        <>
        
        </>
    )
}