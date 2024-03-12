import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";

const imagesData = [];

for (let i = 0; i < 20; i++) {
  imagesData.push({ imageId: i });
}

function App() {
  const [images, setImages] = useState(imagesData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    let newIndex = currentIndex;
    intervalRef.current = setTimeout(() => {
      newIndex += 1;
      if (newIndex < 20) {
        setCurrentIndex(newIndex);
      } else {
        clearInterval(intervalRef.current);
        setCurrentIndex(0);
      }
    }, 2000);
  }, [currentIndex]);

  const onPrevClicked = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      clearInterval(intervalRef.current);
    }
  };

  const onNextClicked = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      clearInterval(intervalRef.current);
    }
  };

 
  return (
    <div className="App" style={{ padding: "10%" }}>
      <div
        style={{
          height: "50px",
          width: "50px",
          background: "lightyellow",
          color: "black",
          display: "column",
        }}
      >
        {images[currentIndex].imageId}
      </div>
      <div style={{ textAlign: "left" }}>
        <button onClick={onPrevClicked}>Prev</button>
        <button onClick={onNextClicked}>Next</button>
      </div>
    </div>
  );
}

export default App;
