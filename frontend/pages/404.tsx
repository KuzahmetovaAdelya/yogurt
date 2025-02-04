export default function NotFound({}) {
    return (
        <>
            <div className="w-screen h-screen">
                <div className="flex flex-col items-center justify-center h-full">
                    <h1 className="text-h1-lg lg:text-h1-xl leading-none">404</h1>
                    <h3 className="text-4xl lg:text-number-lg">Страница не найдена</h3>
                    <a href="/" className="flex gap-2.5 p-2.5 rounded-xl border border-light-gray w-max cursor-pointer hover:bg-light-gray group transition mt-5">
                        <p className="group-hover:text-black transition text-xl xl:text-base">Вернуться на главную</p>
                        <img src="/admin-arrow.svg" className="group-hover:brightness-0 transition"></img>
                    </a>
                </div>
            </div>
        </>
    )
}