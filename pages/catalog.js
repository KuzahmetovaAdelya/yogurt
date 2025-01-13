import Header from "../components/Header";
import Bread from "../components/Bread";
import CatalogMainSection from "../components/CatalogMainSection";
import ContactsSection from '../components/ContacsSection';
import { useRef } from "react";

export default function CatalogPage({}) {
    const refScrollUp = useRef()
    
    function handleScrollUp() {
        refScrollUp.current.scrollIntoView({behavior: "smooth"})
    }

    return (
        <>
            <div ref={refScrollUp}>
                <Header />
            </div>
            <Bread breadText={"Каталог"} breadSecondText={""} />
            <CatalogMainSection/>
            <ContactsSection scrollUp={handleScrollUp} />
        </>
    )
}