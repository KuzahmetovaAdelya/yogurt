import Header from "../components/Header";
import Bread from "../components/Bread";
import AboutUsMainSection from "../components/AboutUsMainSection";

export default function AboutUsPage({}) {
    return (
        <div className="min-h-screen">
            <Header />
            <Bread breadText={"О нас"} breadSecondText={""} />
            <AboutUsMainSection />
        </div>
    )
}
