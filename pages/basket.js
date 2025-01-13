import { useRef } from "react";
import Header from "../components/Header";
import Bread from "../components/Bread";
import BasketMainSection from "../components/BasketMainSection";
import ContactsSection from "../components/ContacsSection";

export default function BasketPage({}) {
    const refScrollUp = useRef()
    
    function handleScrollUp() {
        refScrollUp.current.scrollIntoView({behavior: "smooth"})
    }

    return (
        <>
            <div ref={refScrollUp}>
                <Header />
            </div>
            <Bread breadText={"Корзина"} breadSecondText={""} />
            <BasketMainSection />
            <ContactsSection scrollUp={handleScrollUp} />
        </>
    )
}