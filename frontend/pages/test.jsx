import { useEffect, useState } from "react";
import host from "../host";

export default function Test() {
    // function getFile() {
    //     let file = document.getElementById('file')
    //     if (file.value === "") {
    //         console.log('aa')
    //     } else {
    //         let fileText = file.value;
    //         let filetextArr = fileText.split("\\")
    //         console.log(filetextArr[filetextArr.length - 1])
    //     }
    // }

    // useEffect(() => {
    //     document.getElementById('file').addEventListener('change', function(){
    //         if( this.value ){
    //             let filetextArr = this.value.split("\\")
    //             console.log(filetextArr[filetextArr.length - 1])
    //         } else { // Если после выбранного тыкнули еще раз, но дальше cancel
    //             console.log( "Файл не выбран" ); 
    //         }
    //     });
    // }, [])

    function handleSubmit(e) {
        e.preventDefault()
        let image = ["/ipods1.png"];
        let name = document.getElementById('name')
        let price = document.getElementById('price')
        const axios = require('axios');
        axios.post(`${host}concepts/create`, {
        image: image,
        name: name,
        price: price
        }) // Использование post-запроса, с указанием пользователя
        .then((response) => { // Получение данных и их обработка
        console.log(response.data);})
        .catch((error) => { // Если запрос не будет выполнен, то ошибка выводится в терминал
        console.error(error);});
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="m-10 flex flex-col">
                    <input type="text" id="name" className="text-black " />
                    <label htmlFor="file">name</label>
                </div>

                <div className="m-10 flex flex-col">
                    <input type="number" id="price" className="text-black " />
                    <label htmlFor="file">name</label>
                    {/* <button onClick={getFile}>Send</button> */}
                </div>
                    <button type="submit">Send</button>

            </form>
        </>
    )
}