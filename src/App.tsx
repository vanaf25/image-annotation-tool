import React, {useEffect, useState} from 'react';
import './App.css';
import {defaultShapeStyle, ReactPictureAnnotation} from "react-picture-annotation";

function App() {
    const [canvasSize, setCanvasSize] = useState({
        width:0,
        height:0
    });
    const onResize = () => {
        setCanvasSize({ width: 800, height: 600 });
    };

    useEffect(() => {
        window.addEventListener("resize", onResize);
        onResize();
        return () => window.removeEventListener("resize", onResize);
    }, []);
    const [annotations,setAnnotations]=useState<any[]>([])
    const onSelect = (selectedId:any) => console.log(selectedId);
    const onChange = (data:any) =>{
        console.log("data inform", data);
        setAnnotations(data)
    }
    const  download=()=> {
        let file = new Blob([JSON.stringify(annotations)], {type: "text/plain"});
        const filename=Date.now()
        // @ts-ignore
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            //@ts-ignore
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            let a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = String(filename);
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }
    const importAnnotations=(e:any)=>{
        const file=e.target.files[0]
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = function(e) {
            if (e.target){
                const contents = e.target.result;
                console.log(contents);
                if (typeof contents==="string"){
                    setAnnotations(JSON.parse(contents))
                }
            }

        };
        reader.readAsText(file);
    }
    return (
        <>
            <div className="App">
                <ReactPictureAnnotation
                    image="https://source.unsplash.com/random/800x600"
                    onSelect={onSelect}
                    onChange={onChange}
                    annotationData={annotations}
                    width={canvasSize.width}
                    height={canvasSize.height}
                    scrollSpeed={0}
                />
            </div>
            <button onClick={()=>download()}>Download</button>
            <input onChange={importAnnotations}  type={"file"} />
        </>
    );
}

export default App;
