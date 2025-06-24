import ContactSection from './ContacsSection'

export default function CooperMainSection({scrollUp}) {

    function handleOpen(id: string) {
        let elemId: string = id + 'elem'
        let elem: HTMLElement = document.getElementById(elemId)
        elem.classList.toggle('hidden')
    }

    return (
        <>
            <div className="mx-auto w-phone lg:w-tablet lg:pb-6 xl:w-notepad 2xl:w-desktop xl:pb-14">
                <h2 className="text-white text-2xl lg:text-number-lg tracking-tighter uppercase font-semibold mb-10">партнерская программа</h2>
                <div className="flex flex-col xl:flex-row justify-between xl:min-h-606">
                    <div className="flex flex-col lg:flex-row lg:justify-between xl:flex-col">
                        <p className="text-white text-p lg:text-lg tracking-tighter font-medium w-96 lg:leading-5 xl:leading-7 xl:mb-20">Мы рады приветствовать вас в партнёрской программе нашего интернет-магазина! Здесь вы найдёте всю необходимую информацию о том, как стать партнёром и начать зарабатывать вместе с нами.</p>
                        <img src="/coop.png" className="hidden lg:block lg:w-60 lg:h-48 xl:w-64 xl:h-52"></img>
                    </div>

                    <div className="space-y-20 mt-10 lg:-mt-12 xl:mt-0">
                        <div id="one">
                            <button className="flex items-center lg:gap-5 xl:gap-20" onClick={() => {handleOpen('one')}}>
                                <img src="/accord.svg" className="w-43 h-43 lg:w-60px lg:h-60px" id="oneimg"></img>
                                <div>
                                    <h4 className="text-white text-p lg:text-2xl tracking-tighter uppercase font-medium mb-2.5 lg:mb-5">Кто может стать нашим партнёром?</h4>
                                    <hr className="mx-auto border-gray"></hr>
                                </div>
                            </button>
                            <div className="hidden w-72 ml-43 lg:w-450 lg:ml-20 xl:ml-140 mt-5" id="oneelem">
                                <p className="text-white text-lg tracking-tighter font-medium">Партнёрами могут стать юридические лица и индивидуальные предприниматели, которые заинтересованы в продвижении наших товаров и услуг. Мы готовы рассмотреть заявки от компаний и специалистов из различных сфер деятельности, включая маркетинг, рекламу, продажи и другие.</p>
                            </div>
                        </div>

                        <div id="two">
                            <button className="flex items-center lg:gap-5 xl:gap-20" onClick={() => {handleOpen('two')}}>
                                <img src="/accord.svg" className="w-43 h-43 lg:w-60px lg:h-60px" id="twoimg"></img>
                                <div>
                                    <h4 className="text-white text-p lg:text-2xl tracking-tighter uppercase font-medium mb-2.5 lg:mb-5">Преимущества партнёрства с нами:</h4>
                                    <hr className="mx-auto border-gray"></hr>
                                </div>
                            </button>
                            <div className="hidden w-72 ml-43 lg:w-450 lg:ml-20 xl:ml-140 mt-5" id="twoelem">
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

                <ContactSection scrollUp={scrollUp} />

            </div>
        </>
    )
}