import Bread from "../components/Bread";
import CooperMainSection from "../components/CooperMainSection";
import Header from "../components/Header";
import Head from "next/head";

export default function CooperPage({}) {
    return (
        <>
            <Head>
                <meta name="description" content="Мы рады приветствовать вас в партнёрской программе нашего интернет-магазина! Здесь вы найдёте всю необходимую информацию о том, как стать партнёром и начать зарабатывать вместе с нами." />
                <meta name="keywords" content="yegourt, магазин аксессуаров, yogurt, 3Д, 3D, 3Д печать, 3D печать, интернет магазин, партнеры, сотрудничество, партнерская программа" />
            </Head>
            <div className="min-h-screen">
                <Header />
                <Bread breadText={"О Бренде"} breadSecondText={""} />
                <CooperMainSection />
            </div>
            
        </>
    )
}