import Bread from "../components/Bread";
import CooperMainSection from "../components/CooperMainSection";
import Header from "../components/Header";

export default function CooperPage({}) {
    return (
        <>
            <div className="min-h-screen">
                <Header />
                <Bread breadText={"О Бренде"} breadSecondText={""} />
                <CooperMainSection />
            </div>
            
        </>
    )
}