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

    useEffect(() => {
        document.getElementById('photoInput').onchange = function(event) {
            var reader = new FileReader();
            reader.onload = function() {
                var output = document.getElementById('preview');
                output.src = reader.result;
                output.style.display = 'block';
            };
            reader.readAsDataURL(event.target.files[0]);
        };
    }, [])

    return (
        <>
            <input type="file" id="photoInput" />
            <img id="preview" style={{display: 'none'}} />
        </>
    )
}