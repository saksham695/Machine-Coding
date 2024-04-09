import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

const addButtonStyle = {
  padding: "4px",
  background: "white",
  border: "2px solid grey",
  borderRadius: "5px",
  marginLeft: "10px",
};

const inputStyle = { width: "400px", height: "20px", borderRadius: "5px" };

const mockData = [];

function App() {
  const [todo, setTodo] = useState([]);

  const [todoList, setTodoList] = useState([]);

  const onTodoChanged = (e) => {
    setTodo(e.target.value);
  };

  const onAddItemToList = () => {
    setTodoList((prev) => {
      return [
        ...prev,
        {
          id: Date.now(),
          todoItem: todo,
          isChecked: false,
        },
      ];
    });
  };

  return (
    <div>
      <div style={{ paddingTop: "5%", paddingLeft: "10%" }}>
        <div>
          <input value={todo} onChange={onTodoChanged} style={inputStyle} />
          <button style={addButtonStyle} onClick={onAddItemToList}>
            Add
          </button>
        </div>
        <div style={{ marginTop: "5%", textAlign: "left", width: "400px" }}>
          {todoList.map(({ todoItem, id }) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  background: "lightgrey",
                  height: "40px",
                  padding: "5px",
                  width: "400px",
                  alignItems: "center",
                }}
              >
                <input type={"checkbox"} checked={true} />
                <div>{todoItem}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
