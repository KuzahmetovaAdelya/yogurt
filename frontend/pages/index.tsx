import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutUsSection from "../components/AboutUsSection";
import CatalogSection from "../components/CatalogSection";
import ConceptsSection from "../components/ConceptsSection";
import CollabSection from "../components/CollabSection";
import ContactSection from "../components/ContacsSection";
import { useRef } from "react";
import Head from "next/head";
import axios from "axios";
import host from "../host";

export default function MainPage({ items, concepts, collabs }) {
    const refScrollUp: any = useRef(0)

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
            <CatalogSection items={items} />
            <ConceptsSection concepts={concepts} />
            <CollabSection collabs={collabs} />
            <ContactSection scrollUp={handleScrollUp} />
        </>
    )
}

export async function getServerSideProps() {
    try {
        const [itemsResponse, conceptsResponse, collabsResponse] = await Promise.all([
            axios.get(`${host}items`),
            axios.get(`${host}concepts`),
            axios.get(`${host}collabs`)
        ]);

        return {
            props: {
                items: itemsResponse.data,
                concepts: conceptsResponse.data,
                collabs: collabsResponse.data
            }
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                items: [],
                concepts: [],
                collabs: []
            }
        };
    }
}