export default function Header({setIsMenuOpen, setPage}) {
    return (
        <>
            <div className="mb-7 lg:mb-14 xl:mb-6">
                <header className="w-phone flex items-center justify-between mx-auto pt-5 lg:pt-6 mb-2.5 lg:mb-8 lg:w-tablet xl:w-notepad 2xl:w-desktop 2xl:mb-0">
                    <a className="cursor-pointer" onClick={() => {setPage('main')}}><img src="logo.png" className="w-16 lg:w-24"></img></a>

                    <a className="cursor-pointer hover:opacity-70" onClick={() => {setIsMenuOpen(true)}}>
                        <img src="menu.svg" className="w-12 xl:hidden"></img>
                        <p className="hidden text-white lg:font-normal tracking-tighter lg:text-p-lg hidden xl:block xl:font-medium">Меню</p>
                    </a>
                    <p className="text-white lg:font-normal tracking-tighter lg:text-p-lg hidden lg:block cursor-pointer hover:opacity-70" onClick={() => {setPage('basket')}}>Корзина</p>
                </header>

                <hr className="w-phone mx-auto border-gray lg:w-tablet xl:w-notepad 2xl:w-desktop"></hr>
            </div>
        </>
    )
}