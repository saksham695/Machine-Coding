import React, { useEffect, useState } from "react";
import { data } from "./utils/utils";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todoItems, setTodoItems] = useState({});
  const [isLoading, setLoader] = useState(false);
  const [draggingItem, setDraggingItem] = useState(null);

  useEffect(() => {
    async function fetchTodoItems() {
      setLoader(true);
      setTimeout(() => {
        setTodoItems(data);
        setLoader(false);
      }, 3000);
    }
    fetchTodoItems();
  }, []);

  const onDragStart = (e, section, index) => {
    setDraggingItem({ section, index });
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const updateSectionStates = (section, sourceSection, sourceIndex) => {
    const item = todoItems[sourceSection][sourceIndex];
    const updatedSourceSection = [...todoItems[sourceSection]];
    updatedSourceSection.splice(sourceIndex, 1);

    const updatedTargetSection = [...todoItems[section]];
    updatedTargetSection.push({ ...item, isChecked: !item.isChecked });

    setTodoItems({
      ...todoItems,
      [sourceSection]: updatedSourceSection,
      [section]: updatedTargetSection,
    });
  };

  const onDrop = (e, section) => {
    const { section: sourceSection, index: sourceIndex } = draggingItem;
    if (sourceSection === section) {
      setDraggingItem(null);
      return;
    }
  
    updateSectionStates(section, sourceSection, sourceIndex);
    setDraggingItem(null);
  };

  const onChangeHandler = (e, section, index) => {
    
    // const targetSection = section === "COMPLETED" ? "IN_PROGRESS" : "COMPLETED";
    // updateSectionStates(targetSection, section, index);
    
    // STEP 1 : Create copy state 
    const copyState = [...todoItems]

    // Step 2 : Update the state
    copyState[index].isChecked = !copyState[index].isChecked

    // Step 3 : Set new state 
    setTodoItems(copyState)
  };

  const onDeleteClicked = (section, index) => {
    const copyState = { ...todoItems };
    const filteredTodos = copyState[section].filter((item, i) => i !== index);
    const updatedState = { ...copyState, [section]: filteredTodos };
    setTodoItems(updatedState);
  };

  const renderTodoItems = () => {
    return Object.keys(todoItems).map((section) => (
      <div
        key={section}
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, section)}
      >
        <h2>{section}</h2>
        <div>
          {isLoading && "Loading......."}
          {!isLoading &&
            todoItems[section].map((item, index) => (
              <ListItems
                key={item.id}
                item={item}
                onChangeHandler={(e) => onChangeHandler(e, section, index)}
                onDeleteClicked={() => onDeleteClicked(section, index)}
                onDragStart={(e) => onDragStart(e, section, index)}
              />
            ))}
        </div>
      </div>
    ));
  };

  const onAddTodoItem = () => {
    const key = "IN_PROGRESS";
    const timestamp = new Date().getTime();
    const copyState = { ...todoItems };
    copyState[key].push({ title: todo, id: timestamp, isChecked: false });
    setTodoItems(copyState);
    setTodo("");
  };

  return (
    <div style={{ padding: "5%" }}>
      <h1> Todo Application</h1>
      <div>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          style={{
            width: "400px",
            padding: "10px",
            border: "2px solid black",
            borderRadius: "5px",
          }}
        />
        <button
          style={{
            marginLeft: "5px",
            width: "100px",
            padding: "10px",
            border: "2px solid blue",
            borderRadius: "5px",
            background: "lightblue",
            cursor: "pointer",
          }}
          onClick={onAddTodoItem}
        >
          Add Item
        </button>
      </div>
      {renderTodoItems()}
    </div>
  );
}

export const ListItems = ({
  item,
  onChangeHandler,
  onDeleteClicked,
  onDragStart,
}) => {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      style={{
        display: "flex",
        minHeight: "50px",
        background: "lightyellow",
        marginTop: "10px",
        alignItems: "center",
        width: "550px",
        border: "2px solid grey",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      <input
        type="checkbox"
        checked={item.isChecked}
        onChange={onChangeHandler}
      />
      <div style={{ minWidth: "350px" }}>{item.title}</div>

      <button
        style={{
          marginLeft: "20px",
          height: "30px",
          width: "30px",
          borderRadius: "15px",
          border: "2px solid red",
          background: "#FFCCCB",
          cursor: "pointer",
        }}
        onClick={onDeleteClicked}
      >
        X
      </button>
    </div>
  );
};

export default App;
