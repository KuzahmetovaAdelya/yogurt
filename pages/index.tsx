import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutUsSection from "../components/AboutUsSection";
import CatalogSection from "../components/CatalogSection";
import ConceptsSection from "../components/ConceptsSection";
import CollabSection from "../components/CollabSection";
import ContactSection from "../components/ContacsSection";
import { useRef } from "react";
import Head from "next/head";

export default function MainPage({}) {
    const refScrollUp = useRef()

    function handleScrollUp() {
        refScrollUp.current.scrollIntoView({behavior: "smooth"})
    }

    return (
        <>  
            <Head>
                <meta name="description" content="YEGOURT это бренд одежды и аксессуаров, идущий в ногу со временем, а иногда и опережающий его" />
                <meta name="keywords" content="yegourt, магазин аксессуаров, yogurt, 3Д, 3D, 3Д печать, 3D печать, интернет магазин" />
                <title>Yegourt</title>
            </Head>
            <div className="bg-hero-pattern bg-100%" ref={refScrollUp}>
                <Header />
                <HeroSection />
            </div>
            <AboutUsSection />
            <CatalogSection />
            <ConceptsSection />
            <CollabSection />
            <ContactSection scrollUp={handleScrollUp} />
        </>
    )
}