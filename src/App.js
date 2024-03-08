import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

const data = [
  {
    name: "Test",
    isFolder: true,
    children: [
      {
        name: "Root",
        isFolder: true,
        children: [],
      },
    ],
  },
];

function App() {
  const [folderStructure, setFolderStructure] = useState(data);
  const [inputPath, setInputPath] = useState("");
  const [name, setName] = useState("");
  const [isFolder, setIsFolder] = useState(false);

  const onAddFolderClicked = (path, isFolder) => {
    setInputPath(path);
    setIsFolder(isFolder);
  };

  const onCreateNewFolder = () => {
    if (!name.length) {
      setInputPath("");
      setName("");
      setIsFolder(false);
      return;
    }
    const path = inputPath;
    // Deep clone the folder structure to avoid mutating the state directly
    const updatedFolderStructure = JSON.parse(JSON.stringify(folderStructure));

    // Traverse the folder structure based on the provided path
    const pathArray = path.split("_");
    let currentFolder = updatedFolderStructure;
    for (const index of pathArray) {
      currentFolder = currentFolder[index].children;
    }

    // Add a new folder to the current folder's children
    currentFolder.push({
      name: name,
      isFolder: isFolder,
      children: [],
    });

    // Update the state with the new folder structure
    setFolderStructure(updatedFolderStructure);
    setInputPath("");
    setName("");
    setIsFolder(false);
  };

  const onHandleChange = (e) => {
    setName(e.target.value);
  };

  const renderChildren = (folders, path) => {
    return folders.map((item, index) => {
      const newPath = `${path}_${index}`;
      const isInputIOpen = newPath === inputPath;
      return (
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{ fontSize: "18px", color: "grey", fontWeight: "bold" }}
            >
              {item.name}
            </div>
            {item.isFolder ? (
              <div style={{ display: "flex" }}>
                <div
                  style={{ color: "lightblue", marginLeft: "20px" }}
                  onClick={() => onAddFolderClicked(newPath, true)}
                >
                  Add Folder
                </div>
                <div
                  style={{ color: "lightblue", marginLeft: "20px" }}
                  onClick={() => onAddFolderClicked(newPath, false)}
                >
                  Add File
                </div>
              </div>
            ) : null}
          </div>
          <div style={{ marginLeft: "10px" }}>
            {item.children.length
              ? renderChildren(item.children, newPath)
              : null}
          </div>
          {isInputIOpen ? (
            <div style={{ display: "flex" }}>
              <input value={name} onChange={onHandleChange} />
              <div onClick={onCreateNewFolder}>Add</div>
            </div>
          ) : null}
        </div>
      );
    });
  };

  return (
    <div className="App" style={{ padding: "10%" }}>
      {folderStructure.map((item, index) => {
        return (
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{ fontSize: "18px", color: "grey", fontWeight: "bold" }}
              >
                {item.name}
              </div>
              {/* {item.isFolder ? (
                <div style={{ display: "flex" }}>
                  <div
                    style={{ color: "lightblue", marginLeft: "20px" }}
                    onClick={() => onAddFolderClicked(`${index}`)}
                  >
                    Add Folder
                  </div>
                  <div
                    style={{ color: "lightblue", marginLeft: "20px" }}
                    onClick={() => onAddFolderClicked(`${index}`)}
                  >
                    Add File
                  </div>
                </div>
              ) : null} */}
            </div>
            <div style={{ marginLeft: "10px" }}>
              {item.children.length
                ? renderChildren(item.children, `${index}`)
                : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
