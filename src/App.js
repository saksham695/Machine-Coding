import ToolTip from "./components/ToolTip";
import "./index.css";

export default function App() {
  return (
    <div className="App">
      <ToolTip
        tooltipText={"Tool tip text"}
        positionHorizontal={"right"}
        positionVertical={"top"}
      >
        <div className="hover-component">Hover me </div>
      </ToolTip>
    </div>
  );
}
