import React from "react";

const calculatePosition = (position, value) =>
  position.includes(value)
    ? `0${position.includes("top") ? "px" : ""}`
    : "none";

const ToolTip = React.memo(
  ({ positionHorizontal, positionVertical, children, tooltipText }) => {
    const positionStyles = {
      top: calculatePosition(positionVertical, "top"),
      left: calculatePosition(positionHorizontal, "left"),
      bottom: calculatePosition(positionVertical, "bottom"),
      right: calculatePosition(positionHorizontal, "right")
    };

    return (
      <div className="tooltip">
        {children}
        <span className="tooltiptext" style={positionStyles}>
          {tooltipText}
        </span>
      </div>
    );
  }
);

export default ToolTip;
