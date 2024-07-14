// useTodo.js
import { useState, useEffect } from "react";
import { data } from "./utils/utils";

export const useTodo = () => {
  const [todoItems, setTodoItems] = useState({});
  const [isLoading, setLoader] = useState(false);
  const [draggingItem, setDraggingItem] = useState(null);

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setTodoItems(data);
      setLoader(false);
    }, 1000);
  }, []);

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

  const onDragStart = (section, index) => {
    setDraggingItem({ section, index });
  };

  const onDrop = (section) => {
    const { section: sourceSection, index: sourceIndex } = draggingItem;
    if (sourceSection === section) {
      setDraggingItem(null);
      return;
    }

    updateSectionStates(section, sourceSection, sourceIndex);
    setDraggingItem(null);
  };

  const onChangeHandler = (section, index) => {
    const targetSection = section === "COMPLETED" ? "IN_PROGRESS" : "COMPLETED";
    updateSectionStates(targetSection, section, index);
  };

  const onDeleteClicked = (section, index) => {
    const copyState = { ...todoItems };
    const filteredTodos = copyState[section].filter((item, i) => i !== index);
    const updatedState = { ...copyState, [section]: filteredTodos };
    setTodoItems(updatedState);
  };

  return {
    todoItems,
    isLoading,
    onDragStart,
    onDrop,
    onChangeHandler,
    onDeleteClicked,
    setTodoItems,
  };
};
