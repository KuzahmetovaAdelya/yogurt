export default function Bread({breadText, breadSecondText, setPage}) {
    return (
        <> 
            <div className="w-phone mx-auto mb-5 lg:w-tablet lg:mb-10 xl:w-notepad 2xl:w-desktop 2xl:mt-20">
                {breadSecondText === "" ?
                <p className="text-gray font-medium lg:font-normal tracking-tighter text-p lg:text-p-lg xl:text-lg 2xl:text-p-lg"><span className="cursor-pointer hover:text-white" onClick={() => {setPage('main')}}>Главная \ </span><span className="text-white">{breadText}</span></p>
                :
                <p className="text-gray font-medium lg:font-normal tracking-tighter text-p lg:text-p-lg xl:text-lg 2xl:text-p-lg"><span className="cursor-pointer hover:text-white" onClick={() => {setPage('main')}}>Главная \ </span><span className="text-white" onClick={() => {setPage('item')}}>{breadText} \ </span><span className="text-white">{breadSecondText}</span></p>
                }
            </div>
        </>
    )
}