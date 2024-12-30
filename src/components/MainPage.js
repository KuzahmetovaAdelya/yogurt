import "../mainPage.css";
import Header from "./Header";
import HeroSection from "./HeroSection";
import AboutUsSection from "./AboutUsSection";
import CatalogSection from "./CatalogSection";
import ConceptsSection from "./ConceptsSection";
import CollabSection from "./CollabSection";
import ContactSection from "./ContacsSection";
import { useRef } from "react";

export default function MainPage({setIsMenuOpen, setPage}) {
    const refScrollUp = useRef()

    function handleScrollUp() {
        refScrollUp.current.scrollIntoView({behavior: "smooth"})
    }

    return (
        <>  
            <div className="bg-hero-pattern bg-100%" ref={refScrollUp}>
                <Header setIsMenuOpen={setIsMenuOpen} setPage={setPage} />
                <HeroSection setPage={setPage} />
            </div>
            <AboutUsSection />
            <CatalogSection setPage={setPage} scrollUp={handleScrollUp} />
            <ConceptsSection />
            <CollabSection />
            <ContactSection scrollUp={handleScrollUp} setPage={setPage} />
        </>
    )
}