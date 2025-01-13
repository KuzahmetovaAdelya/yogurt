import Header from "../components/Header";
import Bread from "../components/Bread";
import ItemMainSection from "../components/ItemMainSection";
import ContactSection from '../components/ContacsSection'
import { useRef } from "react";

export default function ItemPage({}) {
    const refScrollUp = useRef()

    function handleScrollUp() {
      refScrollUp.current.scrollIntoView({behavior: "smooth"})
    }
    return (
        <>
            <div ref={refScrollUp}>
                <Header />
            </div>
            <Bread breadText={"Headphone Case"} breadSecondText={"Liquid Web"} />
            <ItemMainSection />
            <ContactSection scrollUp={handleScrollUp} />
        </>
    )
}