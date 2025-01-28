import Header from "../components/Header";
import Bread from "../components/Bread";
import AboutUsMainSection from "../components/AboutUsMainSection";
import Head from "next/head";

export default function AboutUsPage({}) {
    return (
        <>
            <Head>
                <meta name="description" content="YEGOURT начал свой творческий путь как граффити-художник в 2008-м году." />
                <meta name="keywords" content="yegourt, магазин аксессуаров, yogurt, 3Д, 3D, 3Д печать, 3D печать, интернет магазин, о нас" />
                <title>Yegourt - О компании</title>
            </Head>
            <div className="min-h-screen">
                <Header />
                <Bread breadText={"О нас"} breadSecondText={""} />
                <AboutUsMainSection />
            </div>
        </>

    )
}
