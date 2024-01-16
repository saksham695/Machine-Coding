import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";

var my_array = [];

for (var i = 1; i <= 1000; i++) {
  my_array.push(i);
}

const PAGE_SIZE = 10;
const START_PAGE = 0;

function App() {
  const [data, setData] = useState(my_array.slice(START_PAGE, PAGE_SIZE));
  const pageRef = useRef(START_PAGE); // Use ref to keep track of the page
  const bottom = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        pageRef.current += 1; // Update the ref value
        setData((prevData) => [
          ...prevData,
          ...my_array.slice(
            pageRef.current * PAGE_SIZE,
            (pageRef.current + 1) * PAGE_SIZE
          ),
        ]);
      }
    });
    observer.observe(bottom.current);

    // Cleanup the observer on component unmount
    return () => observer.disconnect();
  }, []); // Empty dependency array to run the effect only once

  console.log("Page Outside: ", pageRef.current);
  console.log("Data Outside: ", data);

  return (
    <div className="App">
      {data.map((item) => (
        <div
          key={item}
          style={{
            height: "70px",
            width: "50px",
            background: "yellow",
            marginTop: "10px",
          }}
        >
          {item}
        </div>
      ))}
      <div
        ref={bottom}
        style={{ height: "2px", background: "blue", width: "50px" }}
      />
    </div>
  );
}

export default App;
