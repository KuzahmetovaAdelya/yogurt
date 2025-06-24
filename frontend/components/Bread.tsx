interface BreadProps {
    breadText: string;
    breadSecondText: string;
}

export default function Bread({ breadText, breadSecondText }: BreadProps) {
    return (
        <> 
            <div className="w-phone mx-auto mb-5 lg:w-tablet lg:mb-10 xl:w-notepad 2xl:w-desktop 2xl:mt-20">
                {breadSecondText === "" ?
                <p className="text-gray font-medium lg:font-normal tracking-tighter text-p lg:text-p-lg xl:text-lg 2xl:text-p-lg"><a className="cursor-pointer hover:text-white" href='/'>Главная \ </a><span className="text-white">{breadText}</span></p>
                :
                <p className="text-gray font-medium lg:font-normal tracking-tighter text-p lg:text-p-lg xl:text-lg 2xl:text-p-lg"><a className="cursor-pointer hover:text-white" href='/'>Главная \ </a><a className="text-gray hover:text-white cursor-pointer" href='/catalog'>{breadText} \ </a><span className="text-white">{breadSecondText}</span></p>
                }
            </div>
        </>
    )
} 
