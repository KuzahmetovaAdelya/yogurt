import '../styles/main.css';

export default function MyApp({Component, pageProps}) {
    return (
        <div className='bg-black font-serif h-100% cursor-default'><Component {...pageProps} /></div>
    )

    
}