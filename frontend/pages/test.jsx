import { useEffect, useState } from "react";

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
        document.getElementById('file').addEventListener('change', function(){
            if( this.value ){
                let filetextArr = this.value.split("\\")
                console.log(filetextArr[filetextArr.length - 1])
            } else { // Если после выбранного тыкнули еще раз, но дальше cancel
                console.log( "Файл не выбран" ); 
            }
        });
    }, [])


    return (
        <>
            <div className="m-10 flex flex-col">
                <input type="file" id="file" className="text-white " />
                <label htmlFor="file">KLJfkljsdkl</label>
                {/* <button onClick={getFile}>Send</button> */}
            </div>
        </>
    )
}