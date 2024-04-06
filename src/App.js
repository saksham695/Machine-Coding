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

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    return formattedTime;
  };

  return (
    <div className="App">
      <div>{formatTime(counter)}</div>
      <button onClick={onStartClick}>start</button>
      <button onClick={onStopClicked}>stop</button>
      <button onClick={onPauseClicked}>pause</button>
    </div>
  );
}

export default App;
