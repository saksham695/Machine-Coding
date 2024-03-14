import logo from "./logo.svg";
import "./App.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollDirection } from "./useScrollDirection";

const myArray = [];

for (let i = 0; i < 100; i++) {
  myArray.push(i);
}

function App() {
  const [data, setData] = useState(myArray);
  const { direction } = useScrollDirection();

  console.log("Parent direction",direction)

  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <div>
          {data.map((item) => {
            return (
              <div
                style={{
                  marginTop: "15px",
                  hieght: "50px",
                  width: "50px",
                  background: "yellow",
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
        <div
          style={{
            height: "100px",
            width: "100px",
            marginLeft: "40px",
            position: "fixed",
          }}
        >
          {direction}
        </div>
      </div>
    </div>
  );
}

export default App;
