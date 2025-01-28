import Header from "../components/Header";
import Bread from "../components/Bread";
import ItemMainSection from "../components/ItemMainSection";
import ContactSection from '../components/ContacsSection'
import { useRef } from "react";
import Head from "next/head";

export default function ItemPage({}) {
    const refScrollUp = useRef()

    function handleScrollUp() {
      refScrollUp.current.scrollIntoView({behavior: "smooth"})
    }
    return (
        <>
            <Head>
                <meta name="description" content="//описание товара//" />
                <meta name="keywords" content="yegourt, магазин аксессуаров, yogurt, 3Д, 3D, 3Д печать, 3D печать, интернет магазин, " />
                <title>Yegourt - Товар</title>
                </Head>
            <div ref={refScrollUp}>
                <Header />
            </div>
            <Bread breadText={"Headphone Case"} breadSecondText={"Liquid Web"} />
            <ItemMainSection />
            <ContactSection scrollUp={handleScrollUp} />
        </>
    )
}