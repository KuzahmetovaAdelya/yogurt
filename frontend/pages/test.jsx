export default function Test() {
    function getFile() {
        let file = document.getElementById('file')
        if (file.value === "") {
            console.log('aa')
        } else {
            let fileText = file.value;
            let filetextArr = fileText.split("\\")
            
        }
    }

    return (
        <>
            <div className="m-10 flex flex-col">
                <input type="file" id="file" className="text-white " />
                <label htmlFor="file">KLJfkljsdkl</label>
                <button onClick={getFile}>Send</button>
            </div>
        </>
    )
}