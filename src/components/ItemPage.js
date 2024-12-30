import Header from "./Header";
import Bread from "./Bread";
import ItemMainSection from "./ItemMainSection";
import ContactSection from './ContacsSection'
import { useRef } from "react";

export default function ItemPage({setIsMenuOpen, setPage}) {
    const refScrollUp = useRef()

    function handleScrollUp() {
      refScrollUp.current.scrollIntoView({behavior: "smooth"})
    }
    return (
        <>
            <div ref={refScrollUp}>
                <Header setIsMenuOpen={setIsMenuOpen} setPage={setPage} />
            </div>
            <Bread breadText={"Headphone Case"} breadSecondText={"Liquid Web"} setPage={setPage} />
            <ItemMainSection setPage={setPage} scrollUp={handleScrollUp} />
            <ContactSection scrollUp={handleScrollUp} setPage={setPage} />
        </>
    )
}