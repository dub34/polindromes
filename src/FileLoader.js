import React, {useRef} from 'react'
import fileLoader from './images/upload-file.svg'

export default ({onLoad}) => {
    const ref = useRef(null)

    const onChange = e => {
        const files = e.target.files
        if (files.length > 0) {
            var reader = new FileReader();
            reader.readAsText(files[0], "UTF-8");
            reader.onload = function (e) {
                onLoad(e.target.result)
            }
        }
    }
    // Allow users to click on the hidden input.
    const onClick = () => {
        ref.current.click()
    }


    return <div onClick={onClick} className={"file-loader-block"}>
        <img src={fileLoader} alt={"choose file"}/>
        <input type={"file"} ref={ref} onChange={onChange} accept=".txt" className={'file-loader-input'}/>
    </div>
}