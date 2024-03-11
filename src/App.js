import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const onTextChanged = (e) => {
    setText(e.target.value);
  };

  const onAddCommentClicked = (path, commentText) => {
    const commentsDataCopy = [...comments];
    let updatedComment = commentsDataCopy;
    const pathArray = path.split("_");
    for (let i = 0; i < pathArray.length; i++) {
      updatedComment = updatedComment[pathArray[i]].children;
    }
    updatedComment.push({
      text: commentText,
      children: [],
    });
    setComments(commentsDataCopy);
    setText("");
  };

  const onHandleCommentClicked = () => {
    setComments((prev) => {
      return [
        ...prev,
        {
          text,
          children: [],
        },
      ];
    });
    setText("");
  };

  const onDeleteClicked = (path) => {
    const commentsDataCopy = JSON.parse(JSON.stringify(comments));
    let updatedComment = commentsDataCopy;
    const pathArray = path.split("_");
    for (let i = 0; i < pathArray.length; i++) {
      if (i < pathArray.length - 1) {
        updatedComment = updatedComment[pathArray[i]].children;
      } else {
        updatedComment.splice(parseInt(pathArray[i]), 1);
      }
    }
    setComments(commentsDataCopy);
  };

  return (
    <div className="App" style={{ padding: "10%", background: "lightGrey" }}>
      <div style={{ display: "flex" }}>
        <input value={text} onChange={onTextChanged} />
        <button style={{ marginLeft: "10px" }} onClick={onHandleCommentClicked}>
          Comment
        </button>
      </div>
      <div style={{ marginTop: "10px" }}>
        {comments.map((item, index) => {
          return (
            <CommentBlock
              item={item}
              path={`${index}`}
              onAddCommentClicked={onAddCommentClicked}
              onDeleteClicked={onDeleteClicked}
            />
          );
        })}
      </div>
    </div>
  );
}

const CommentBlock = ({ item, path, onAddCommentClicked, onDeleteClicked }) => {
  const [isReplyClicked, setIsReplyClicked] = useState();
  const [text, setText] = useState("");
  const [isBlockOpen, setIsBlockOpen] = useState(false);

  const onTextChanged = (e) => {
    setText(e.target.value);
  };

  const onReplyClicked = () => {
    setIsReplyClicked(true);
  };

  const onAccordionClicked = () => {
    setIsBlockOpen((prev) => !prev);
  };

  const onCommentAddClicked = () => {
    text.length && onAddCommentClicked(path, text);
    setText("");
    setIsReplyClicked(false);
    setIsBlockOpen(true);
  };

  return (
    <div
      style={{
        background: "lightYellow",
        padding: "10px",
        display: "column",
        border: "1px solid grey",
      }}
    >
      <div style={{ display: "flex" }}>
        <div onClick={onAccordionClicked}>
          {item.children.length ? "^" : ""}
        </div>
        <div>{item.text}</div>
      </div>
      <div style={{ textAlign: "left" }}>
        {isReplyClicked ? (
          <div style={{ marginTop: "10px" }}>
            <input value={text} onChange={onTextChanged} />
            <button onClick={onCommentAddClicked}>Add</button>
          </div>
        ) : (
          <button onClick={onReplyClicked}>Reply</button>
        )}
        <button
          style={{ marginLeft: "5px", color: "red" }}
          onClick={() => onDeleteClicked(path)}
        >
          Delete
        </button>
      </div>
      <div>
        {isBlockOpen &&
          item.children.map((comment, index) => {
            return (
              <CommentBlock
                item={comment}
                path={`${path}_${index}`}
                onAddCommentClicked={onAddCommentClicked}
                onDeleteClicked={onDeleteClicked}
              />
            );
          })}
      </div>
    </div>
  );
};

export default App;
