import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

export default function Auth() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        axios.post('http://localhost:3001/users/auth', 
            {
                login: login,
                password: password
            }
        ).then(response => {
            const { token, user } = response.data;
            // Store the token in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            // Redirect to admin dashboard or home page
            router.push('/basket');
        }).catch(error => {
            if (error.response) {
                setError(error.response.data.message || 'Authentication failed');
            } else {
                setError('Network error occurred');
            }
        });
    }

    return (
        <>
            <Head>
                <title>Yegourt - Вход</title>
            </Head>
            <div className="w-screen h-screen bg-admin-gray flex flex-col justify-center">
                <form onSubmit={handleSubmit} className="w-350 lg:w-650 xl:w-500 bg-admin-black mx-auto p-5 rounded-xl">
                    <h1 className="font-semibold text-2xl lg:text-5xl xl:text-2xl text-center mb-5 lg:mb-10 xl:mb-5">Авторизация</h1>

                    {error && (
                        <div className="text-red-500 text-center mb-4">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-5 lg:gap-10 xl:gap-5">
                        <div className="flex flex-col gap-2.5 lg:gap-4 xl:gap-2.5 h-90 lg:h-120 xl:h-90">
                            <label htmlFor="name" className="font-normal text-lg lg:text-3xl xl:text-lg cursor-pointer">Логин</label>
                            <input 
                                type="text" 
                                name="login" 
                                id="login" 
                                className="font-serif focus-visible:outline-1 h-43 lg:h-85 xl:h-43 text-base lg:text-2xl xl:text-base w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket" 
                                placeholder="myLogin" 
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2.5 lg:gap-4 xl:gap-2.5 h-90 lg:h-120 xl:h-90">
                            <label htmlFor="name" className="font-normal text-lg lg:text-3xl xl:text-lg cursor-pointer">Пароль</label>
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                className="font-serif focus-visible:outline-1 h-43 lg:h-85 xl:h-43 text-base lg:text-2xl xl:text-base w-full bg-admin-gray font-sm pl-5 py-1.5 pr-2.5 rounded-basket" 
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="self-center justify-self-end bg-blue h-9 lg:h-60px xl:h-9 w-52 lg:w-270 xl:w-52 rounded-basket hover:bg-white hover:text-blue text-base lg:text-2xl xl:text-base transition">Войти</button>

                        <a href="/registr" className="cursor-pointer text-center hover:text-gray w-50 text-base lg:text-2xl xl:text-base self-center group transition">
                            Нет аккаунта?<br/>
                            <span className="text-blue group-hover:text-gray transition">Регистрация</span>
                        </a>
                    </div>
                </form>
            </div>
        </>
    )
}