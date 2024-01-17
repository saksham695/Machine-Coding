import logo from "./logo.svg";
import "./App.css";
import { useRef, useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);

  const timer = useRef(null);

  const onStartClick = () => {
    timer.current = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 1000);
  };

  const onStopClicked = () => {
    clearInterval(timer.current);
    setCounter(0);
  };

  const onPauseClicked = () => {
    clearInterval(timer.current);
  };

  return (
    <div className="App">
      <div>{counter}</div>
      <button onClick={onStartClick}>start</button>
      <button onClick={onStopClicked}>stop</button>
      <button onClick={onPauseClicked}>pause</button>
    </div>
  );
}

export default App;
