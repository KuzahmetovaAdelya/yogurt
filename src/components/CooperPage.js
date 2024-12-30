import Bread from "./Bread";
import CooperMainSection from "./CooperMainSection";
import Header from "./Header";

export default function CooperPage({setPage, setIsMenuOpen}) {
    return (
        <>
            <div className="h-screen">
                <Header setIsMenuOpen={setIsMenuOpen} setPage={setPage} />
                <Bread breadText={"О Бренде"} breadSecondText={""} setPage={setPage} />
                <CooperMainSection />
            </div>
            
        </>
    )
}