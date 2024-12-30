import { useRef } from "react";
import Header from "./Header";
import Bread from "./Bread";
import BasketMainSection from "./BasketMainSection";
import ContactsSection from "./ContacsSection";

export default function BasketPage({setPage, setIsMenuOpen}) {
    const refScrollUp = useRef()
    
    function handleScrollUp() {
        refScrollUp.current.scrollIntoView({behavior: "smooth"})
    }

    return (
        <>
            <div ref={refScrollUp}>
                <Header setIsMenuOpen={setIsMenuOpen} setPage={setPage} />
            </div>
            <Bread breadText={"Корзина"} breadSecondText={""} setPage={setPage} />
            <BasketMainSection scrollUp={handleScrollUp} setPage={setPage} />
            <ContactsSection scrollUp={handleScrollUp} setPage={setPage} />
        </>
    )
}