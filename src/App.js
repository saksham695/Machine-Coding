import { useState } from "react";
import "./App.css";
import { boxesParent, boxStyle } from "./styles";

const ticTatToeSample = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const isGameOver = (matrix = []) => {
  let col = 0;
  let row = 0;
  let win = false;

  // Check on rows
  while (row < matrix.length) {
    let sum = 0;
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[row][i] === "") {
        sum = 100;
      } else {
        sum += matrix[row][i];
      }
    }

    if (sum === 3 || sum === 0) {
      return true;
    }
    row++;
  }
  row = 0;
  col = 0;

  // Check column sum
  while (col < matrix.length) {
    let sum = 0;

    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i][col] === "") {
        sum = 100;
      } else {
        sum += matrix[i][col];
      }
    }

    if (sum === 3 || sum === 0) {
      return true;
    }
    col++;
  }

  // Check for diagnal

  row = 0;
  col = 0;
  let sum = 0;
  while (row < matrix.length) {
    if (matrix[row][row] === "") {
      sum = 100;
      break;
    }
    sum += matrix[row][row];
    row++;
  }

  if (sum === 3 || sum === 0) {
    return true;
  }
  row = 0;
  col = 2;
  sum = 0;
  while (col >= 0) {
    if (matrix[row][col] === "") {
      sum = 100;
      break;
    }
    sum += matrix[row][col];
    row++;
    col--;
  }
  if (sum === 3 || sum === 0) {
    return true;
  }
  return false;
};

function App() {
  const [nextPosition, setNextPosition] = useState(1);
  const [ticTacToe, setTicTacToe] = useState(ticTatToeSample);

  const onItemClicked = (parentIndex, childIndex) => {
    const ticTacToeCopy = [...ticTacToe];
    if (ticTacToeCopy[parentIndex][childIndex] !== "") {
      return;
    }
    ticTacToeCopy[parentIndex][childIndex] = nextPosition;
    setNextPosition((prev) => (prev === 1 ? 0 : 1));
    setTicTacToe(ticTacToeCopy);
    const result = isGameOver(ticTacToeCopy);
    if (result) {
      setTicTacToe(ticTatToeSample);
    }
    if (result) {
      window.alert("Player wins,se-starting the game.");
    }
  };

  return (
    <div className="App">
      {ticTacToe.map((item, parentIndex) => {
        const boxes = item.map((box, childIndex) => {
          return (
            <div
              style={boxesParent}
              onClick={() => onItemClicked(parentIndex, childIndex)}
            >
              {box === 1 ? "X" : box === 0 ? "0" : ""}
            </div>
          );
        });
        return <div style={boxStyle}>{boxes}</div>;
      })}
    </div>
  );
}

export default App;
