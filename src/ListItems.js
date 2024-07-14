// ListItems.js
import React from "react";
import { styles } from "./styles";

const ListItems = ({ item, onChangeHandler, onDeleteClicked, onDragStart }) => {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      style={styles.listContainer}
    >
      <input
        type="checkbox"
        checked={item.isChecked}
        onChange={onChangeHandler}
      />
      <div style={{ minWidth: "350px" }}>{item.title}</div>

      <button
        style={styles.checkbox}
        onClick={onDeleteClicked}
      >
        X
      </button>
    </div>
  );
};

export default ListItems;
