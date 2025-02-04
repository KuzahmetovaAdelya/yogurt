import { useRef } from "react";
import Header from "../components/Header";
import Bread from "../components/Bread";
import BasketMainSection from "../components/BasketMainSection";
import ContactsSection from "../components/ContacsSection";
import Head from "next/head";

export default function BasketPage({}) {
    const refScrollUp: any = useRef(0)
    
    function handleScrollUp() {
        refScrollUp.current.scrollIntoView({behavior: "smooth"})
    }

    return (
        <>
            <Head>
                <meta name="description" content="Корзина интернет магазина аксессуаров YEGOURT" />
                <meta name="keywords" content="yegourt, магазин аксессуаров, yogurt, 3Д, 3D, 3Д печать, 3D печать, интернет магазин, корзина" />
                <title>Yegourt - Корзина</title>
            </Head>
            <div ref={refScrollUp}>
                <Header />
            </div>
            <Bread breadText={"Корзина"} breadSecondText={""} />
            <BasketMainSection />
            <ContactsSection scrollUp={handleScrollUp} />
        </>
    )
}