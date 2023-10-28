import "./styles.css";
import React, { useState } from "react";

const Star = React.memo(({ selected, onClick }) => (
  <div className="star" onClick={onClick}>
    {selected ? <>&#9733;</> : <>&#9734;</>}
  </div>
));

export default function App() {
  const [stars, setStars] = useState([false, false, false, false, false]);

  const handleStarClick = (starIndex) => {
    let modifiedState = stars.map((_, index) => index <= starIndex);
    setStars(modifiedState);
  };

  return (
    <div className="App">
      <div className="starsContainer">
        {stars.map((selected, index) => (
          <Star
            key={index}
            selected={selected}
            onClick={() => handleStarClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
