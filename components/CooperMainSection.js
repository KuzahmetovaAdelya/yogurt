export default function CooperMainSection() {

    function handleOpen(id) {
        let elemId = id + 'elem'
        let elem = document.getElementById(elemId)
        elem.classList.toggle('hidden')
    }

    return (
        <>
            <div className="mx-auto 2xl:w-desktop 2xl:pb-14">
                <h2 className="text-white text-number-lg tracking-tighter uppercase font-semibold mb-10">партнерская программа</h2>
                <div className="flex justify-between min-h-606">
                    <div>
                        <p className="text-white text-lg tracking-tighter font-medium w-96 mb-20">Мы рады приветствовать вас в партнёрской программе нашего интернет-магазина! Здесь вы найдёте всю необходимую информацию о том, как стать партнёром и начать зарабатывать вместе с нами.</p>
                        <img src="/coop.png"></img>
                    </div>

                    <div className="space-y-20">
                        <div id="one">
                            <button className="flex items-center gap-20" onClick={() => {handleOpen('one')}}>
                                <img src="/accord.svg" className="" id="oneimg"></img>
                                <div>
                                    <h4 className="text-white text-2xl tracking-tighter uppercase font-medium mb-5">Кто может стать нашим партнёром?</h4>
                                    <hr className="mx-auto border-gray"></hr>
                                </div>
                            </button>
                            <div className="hidden w-450 ml-140 mt-5" id="oneelem">
                                <p className="text-white text-lg tracking-tighter font-medium">Партнёрами могут стать юридические лица и индивидуальные предприниматели, которые заинтересованы в продвижении наших товаров и услуг. Мы готовы рассмотреть заявки от компаний и специалистов из различных сфер деятельности, включая маркетинг, рекламу, продажи и другие.</p>
                            </div>
                        </div>

                        <div id="two">
                            <button className="flex items-center gap-20" onClick={() => {handleOpen('two')}}>
                                <img src="/accord.svg" className="" id="twoimg"></img>
                                <div>
                                    <h4 className="text-white text-2xl tracking-tighter uppercase font-medium mb-5">Преимущества партнёрства с нами:</h4>
                                    <hr className="mx-auto border-gray"></hr>
                                </div>
                            </button>
                            <div className="hidden w-450 ml-140 mt-5" id="twoelem">
                                <ul className="list-disc space-y-5">
                                    <li className="text-white text-lg tracking-tighter font-medium">Возможность зарабатывать процент от продаж по вашим рекомендациям;</li>
                                    <li className="text-white text-lg tracking-tighter font-medium">Доступ к эксклюзивным предложениям и скидкам;</li>
                                    <li className="text-white text-lg tracking-tighter font-medium">Обучение и поддержка от опытных специалистов</li>
                                    <li className="text-white text-lg tracking-tighter font-medium">Широкий выбор товаров и услуг для продвижения.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className="flex items-center justify-evenly mt-20 lg:justify-center lg:gap-7 xl:mt-20 2xl:mt-20 *:cursor-pointer">
                    <a href="" className="group"><img src="/insta.svg" className="w-10 lg:w-12 lg:h-12 group-hover:opacity-40"></img></a>
                    <a href="" className="group"><img src="/telega.svg" className="w-10 lg:w-12 lg:h-12 group-hover:opacity-40"></img></a>
                    <a href="" className="group"><img src="/vk.svg" className="w-10 lg:w-12 lg:h-12 group-hover:opacity-40"></img></a>
                    <a href="" className="group"><img src="/utube.svg" className="w-10 lg:w-12 group-hover:opacity-40"></img></a>
                </div>

                <p className="hidden lg:block lg:text-lg lg:uppercase lg:font-normal lg:text-gray lg:-mt-9 2xl:text-2xl">yegourt 2024</p>
            </div>
        </>
    )
}