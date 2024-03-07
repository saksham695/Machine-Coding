import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

const data = [
  ["", "", "", "C"],
  ["1", "2", "3", "+"],
  ["4", "5", "6", "-"],
  ["7", "8", "9", "*"],
  ["0", ".", "=", "/"],
];

function App() {
  const [expression, setExpression] = useState("");

  const onItemClicked = (e) => {
    if (e.target.textContent === "C") {
      setExpression("");
      return;
    }
    if (!expression && typeof parseInt(e.target.textContent) !== "number") {
      return;
    }
    if (e.target.textContent === "=") {
      if (expression) {
        const output = eval(expression);
        setExpression(output);
      }
    } else setExpression((prev) => `${prev}${e.target.textContent}`);
  };

  return (
    <div className="App" style={{ margin: "20%" }}>
      <div
        style={{ display: "flex", flexDirection: "column", marginTop: "100px" }}
      >
        <input value={expression} style={{ width: "294px", height: "40px" }} />
        <div
          style={{
            hieght: "300px",
            width: "300px",
            border: "1px solid black",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
          onClick={onItemClicked}
        >
          {data.map((item) => {
            return item.map((val) => {
              return (
                <div
                  style={{
                    height: "50px",
                    width: "68px",
                    border: "1px solid yellow",
                    padding: "2px",
                    color: "white",
                    background: val ? "grey" : "yellow",
                  }}
                >
                  {val}
                </div>
              );
            });
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
