import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutUsSection from "../components/AboutUsSection";
import CatalogSection from "../components/CatalogSection";
import ConceptsSection from "../components/ConceptsSection";
import CollabSection from "../components/CollabSection";
import ContactSection from "../components/ContacsSection";
import { useRef } from "react";

export default function MainPage({}) {
    const refScrollUp = useRef()

    function handleScrollUp() {
        refScrollUp.current.scrollIntoView({behavior: "smooth"})
    }

    return (
        <>  
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