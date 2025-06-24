import Header from "../../components/Header";
import Bread from "../../components/Bread";
import ItemMainSection from "../../components/ItemMainSection";
import ContactSection from '../../components/ContacsSection'
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { json } from "stream/consumers";
import host from "../../host";
import { trackPromise } from "react-promise-tracker";
import axios from "axios";
import { useRouter } from "next/router";

export default function ItemPage() {
    const refScrollUp: any = useRef(0)
    const [item, setItem] = useState({})
    const router = useRouter();
    const id = router.query.id; 

    useEffect(() => {
        if (!id) return;

        trackPromise(axios.get(`${host}items/${id}/get`)).then(({ data }) => {
            setItem(data)
                        
        }).catch((error) => {
            console.log(error)
        });
    }, [id])

    function handleScrollUp() {
      refScrollUp.current.scrollIntoView({behavior: "smooth"})
    }
    return (
        <>
            <Head>
                <meta name="description" content="//описание товара//" />
                <meta name="keywords" content="yegourt, магазин аксессуаров, yogurt, 3Д, 3D, 3Д печать, 3D печать, интернет магазин, " />
                <title>Yegourt - Товар</title>
                </Head>
            <div ref={refScrollUp}>
                <Header />
            </div>
            <Bread breadText={"Каталог"} breadSecondText={item.name} />
            <ItemMainSection item={item} />
            <ContactSection scrollUp={handleScrollUp} />
        </>
    )
}
// export async function getServerSideProps(context) {
//     // const response = await fetch(`${host}items/${context.params.id}/get`);
//     // const user = await response.json();

//     let user;

//     trackPromise(axios.get(`${host}items/${context.params.id}/get`)).then(({ data }) => {
//         console.log(data)
        
//         user = data;
        
//     }).catch((error) => {
//         console.log(error)
//     });

//     return {
//         props: {user},
//     }
// }
