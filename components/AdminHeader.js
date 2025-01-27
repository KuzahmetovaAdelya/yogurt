export default function AdminHeader({}) {
    return (
        <>
            <div className="fixed top-0 bg-admin-black w-screen h-24 border-b border-b-gray p-7 z-10">
                <div className="flex items-center justify-between h-full">
                    <a href="/" className="uppercase text-2xl text-light-gray font-semibold cursor-pointer hover:text-gray">yegourt</a>

                    <div className="flex items-center gap-2">
                        <p className="text-light-gray font-bold text-admin">Администратор</p>
                        <a className="cursor-pointer p-2 group hover:bg-white rounded-md"><img src="/log-out.svg" className="w-15 group-hover:brightness-0"></img></a>
                    </div>
                </div>
            </div>

            <div className="fixed top-0 bg-admin-black h-screen w-52 border-r border-r-gray px-7">
                <div className="mt-64 flex flex-col gap-5">
                    <a className="cursor-pointer flex items-center justify-between p-1 hover:bg-white rounded-md group" href="/admin-catalog">
                        <div className="flex items-center gap-4">
                            <img src="/category.svg" className="group-hover:brightness-0"></img>
                            <p className="text-p text-light-gray font-light group-hover:text-black">Каталог</p>
                        </div>
                        <img src="/admin-arrow.svg" className="group-hover:brightness-0"></img>
                    </a>

                    <a className="cursor-pointer flex items-center justify-between p-1 hover:bg-white rounded-md group" href="/admin-concepts">
                        <div className="flex items-center gap-4">
                            <img src="/star.svg" className="group-hover:brightness-0"></img>
                            <p className="text-p text-light-gray font-light group-hover:text-black">Концепции</p>
                        </div>
                        <img src="/admin-arrow.svg" className="group-hover:brightness-0"></img>
                    </a>

                    <a className="cursor-pointer flex items-center justify-between p-1 hover:bg-white rounded-md group" href="/admin-collabs">
                        <div className="flex items-center gap-4">
                            <img src="/tick.svg" className="group-hover:brightness-0"></img>
                            <p className="text-p text-light-gray font-light group-hover:text-black">Коллаборации</p>
                        </div>
                    </a>
                </div>
            </div>
        </>
    )
}