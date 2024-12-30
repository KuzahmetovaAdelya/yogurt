import Header from "./Header";
import Bread from "./Bread";
import CatalogMainSection from "./CatalogMainSection";
import ContactsSection from './ContacsSection';
import { useRef } from "react";

export default function CatalogPage({setIsMenuOpen, setPage}) {
    const refScrollUp = useRef()
    
    function handleScrollUp() {
        refScrollUp.current.scrollIntoView({behavior: "smooth"})
    }

    return (
        <>
            <div ref={refScrollUp}>
                <Header setIsMenuOpen={setIsMenuOpen} setPage={setPage} />
            </div>
            <Bread breadText={"Каталог"} breadSecondText={""} setPage={setPage} />
            <CatalogMainSection setPage={setPage} scrollUp={handleScrollUp} />
            <ContactsSection scrollUp={handleScrollUp} setPage={setPage} />
        </>
    )
}