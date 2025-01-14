import Header from "../components/Header";
import Bread from "../components/Bread";
import CatalogMainSection from "../components/CatalogMainSection";
import ContactsSection from '../components/ContacsSection';
import { useRef } from "react";
import Head from "next/head";

export default function CatalogPage({}) {
    const refScrollUp = useRef()
    
    function handleScrollUp() {
        refScrollUp.current.scrollIntoView({behavior: "smooth"})
    }

    return (
        <>
            <Head>
                <meta name="description" content="Каталог товаров интернет магазина аксессуаров YEGOURT" />
                <meta name="keywords" content="yegourt, магазин аксессуаров, yogurt, 3Д, 3D, 3Д печать, 3D печать, интернет магазин, каталог, купить украшение, товар" />
            </Head>
            <div ref={refScrollUp}>
                <Header />
            </div>
            <Bread breadText={"Каталог"} breadSecondText={""} />
            <CatalogMainSection/>
            <ContactsSection scrollUp={handleScrollUp} />
        </>
    )
}