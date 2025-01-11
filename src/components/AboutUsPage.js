import Header from "./Header";
import Bread from "./Bread";
import AboutUsMainSection from "./AboutUsMainSection";

export default function AboutUsPage({setIsMenuOpen, setPage}) {
    return (
        <div className="min-h-screen">
            <Header setIsMenuOpen={setIsMenuOpen} setPage={setPage} />
            <Bread breadText={"О нас"} breadSecondText={""} setPage={setPage} />
            <AboutUsMainSection />
        </div>
    )
}
