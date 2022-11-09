import React, {useEffect, useState} from 'react';
import './App.css';
import {defaultShapeStyle, ReactPictureAnnotation} from "react-picture-annotation";

function App() {
    const [pageSize, setPageSize] = useState({
        width:0,
        height:0
    });
    const onResize = () => {
        setPageSize({ width: window.innerWidth, height: window.innerHeight });
    };

    useEffect(() => {
        window.addEventListener("resize", onResize);
        onResize();
        return () => window.removeEventListener("resize", onResize);
    }, []);
    const onSelect = (selectedId:any) => console.log(selectedId);
    const onChange = (data:any) => console.log("data inform", data);

    return (
        <div className="App">
            <ReactPictureAnnotation
                image="https://source.unsplash.com/random/800x600"
                onSelect={onSelect}
                onChange={onChange}
                width={pageSize.width}
                height={pageSize.height}
                scrollSpeed={0}
            />
        </div>
    );
}

export default App;
