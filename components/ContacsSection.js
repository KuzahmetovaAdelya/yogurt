export default function ContactSection({scrollUp}) {
    return (
        <>
            <div className="w-350 mx-auto pb-2.5 lg:w-tablet xl:w-notepad 2xl:w-desktop">
                <div class="contact-main mb-2.5 py-5 px-2.5 mt-11 mb-2.5 2xl:mt-20 lg:py-10">
                    <div className="lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:grid-flow-col lg:mb-20 lg:pl-14 lg:pr-4">
                        <div>
                            <h2 className="uppercase text-white text-2xl font-semibold tracking-tighter text-center mb-5 lg:text-2xl lg:text-left lg:font-medium">Контактная информация</h2>

                            <div className="flex gap-2.5 flex-col mb-8">
                                <p className="text-white text-lg font-normal tracking-tighter lg:font-normal lg:text-2xl cursor-pointer hover:text-gray">VK</p>
                                <p className="text-white text-lg font-normal tracking-tighter lg:font-normal lg:text-2xl cursor-pointer hover:text-gray">Telegram</p>
                                <p className="text-white text-lg font-normal tracking-tighter lg:font-normal lg:text-2xl cursor-pointer hover:text-gray">Instagram</p>
                            </div>
                        </div>

                        <div className="flex gap-2.5 flex-col mb-8 lg:justify-end">
                            <a className="text-white text-lg font-normal tracking-tighter lg:font-normal lg:text-2xl cursor-pointer hover:text-gray" href="/aboutUs">О компании</a>
                            <a className="text-white text-lg font-normal tracking-tighter lg:font-normal lg:text-2xl cursor-pointer hover:text-gray" href='/cooperation'>Партнерам</a>
                        </div>

                        <p className="hidden lg:text-gray lg:text-number lg:block lg:uppercase xl:text-big-para 2xl:text-big-para-2xl lg:w-max">The target has been found</p>

                        <div>
                            <h2 className="uppercase text-white text-2xl font-semibold tracking-tighter mb-2.5 lg:text-p-lg lg:mb-5 xl:text-number-lg xl:mb-7 2xl:leading-tight 2xl:mb-12">Связаться с нами</h2>
                            <p className="text-white font-medium text-p tracking-tighter mb-5 lg:text-lg">Укажите ваш e-mail, а мы с вами свяжемся</p>

                            <form className="flex items-center mb-8">
                                <input className="peer border-3 border-white rounded-input bg-black p-2.5 lg:p-5 text-gray placeholder:text-gray w-72 lg:w-400 mx-auto lg:mx-0 lg:text-xl focus-visible:outline-0 focus-visible:py-1.5 lg:focus-visible:py-4 hover:border-gray 2xl:w-500" placeholder="email@email.ru" type="email"></input>
                                <button className="border-white border-2 rounded-full p-3 peer-focus-visible:p-2 group hover:bg-white"><img src="/arrow.svg" className="w-25 lg:w-10 h-25 lg:h-10 group-hover:invert group-hover:opacity-40"></img></button>
                            </form>
                        </div>
                    </div>


                    <div>
                        <hr className="hidden lg:block mx-auto border-gray lg:w-tablet lg:mb-5 xl:w-notepad 2xl:w-desktop"></hr>

                        <div className="flex items-center justify-between mb-7">
                            <h4 className="text-gray text-p font-medium tracking-tighter uppercase leading-5 uppercase lg:text-2xl lg:leading-tight lg:font-normal">yegourt 2024</h4>
                            <h4 className="text-gray text-p font-medium tracking-tighter uppercase leading-5 uppercase lg:text-2xl lg:leading-tight lg:font-normal hover:text-white cursor-pointer" onClick={scrollUp}>Вверх</h4>
                        </div>

                        <img src="/logo.png" className="w-28 mx-auto lg:-mt-14"></img>
                    </div>

                    <div class="contact-center"></div>
                    <div class="contact-under"></div>
                </div>
            </div>
        </>
    )
}