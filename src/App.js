import { useEffect, useState } from "react";
import "./App.css";

const rowConfig = [
  [true, true, true],
  [true, false, false],
  [true, true, true],
];

function App() {
  const [config, setConfig] = useState([]);
  const [isResetting, setIsResetting] = useState(false);
  const [mapper, setMapper] = useState([]);

  useEffect(() => {
    if (mapper.length === 7) {
      for (let i = 0; i < mapper.length; i++) {
        setIsResetting(true);
        const interval = setTimeout(() => {
          const transformedState = [...config];
          const [parentIndex, childIndex] = mapper[i].split("_");
          transformedState[parseInt(parentIndex)][parseInt(childIndex)].color =
            "white";
          setConfig(transformedState);
          if (i === 6) {
            clearInterval(interval);
            setMapper([]);
            setIsResetting(false);
          }
        }, 1000 * i);
      }
    }
  }, [mapper]);


  useEffect(() => {
    const transformedState = rowConfig.map((item, parentIndex) => {
      return item.map((box, childIndex) => {
        return {
          isSelected: box,
          boxIdentifier: `${parentIndex}_${childIndex}`,
          color: "white",
        };
      });
    });
    setConfig(transformedState);
  }, []);


  const onItemClicked = (parentIndex, childIndex) => {
    if (isResetting) {
      return;
    }
    const copyConfig = [...config];
    const boxIndex = `${parentIndex}_${childIndex}`;
    if (copyConfig[parentIndex][childIndex].color === "white") {
      copyConfig[parentIndex][childIndex].color = "green";
      setMapper((prev) => [...prev, `${boxIndex}`]);
    } else {
      copyConfig[parentIndex][childIndex].color = "white";
      setMapper((prev) => {
        return prev.map((item) => item !== boxIndex);
      });
    }

    setConfig(copyConfig);
  };

  return (
    <div className="App">
      {(config || []).map((item, parentIndex) => {
        const rowItems = item.map(
          ({ isSelected, boxIdentifier, color }, childIndex) => {
            return isSelected ? (
              <div
                key={boxIdentifier}
                onClick={() => onItemClicked(parentIndex, childIndex)}
                style={{
                  height: "100px",
                  width: "100px",
                  border: "1px solid black",
                  background: color,
                }}
              ></div>
            ) : null;
          }
        );
        return <div style={{ display: "flex" }}>{rowItems}</div>;
      })}
    </div>
  );
}

export default App;
