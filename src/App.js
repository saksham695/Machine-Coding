import React, { useEffect, useMemo, useRef, useState } from "react";

const pollingItems = [
  {
    key: "Javascript",
    name: "Javascript",
    isChecked: false,
    voteCount: 25,
  },
  {
    key: "html",
    name: "HTML",
    isChecked: false,
    voteCount: 25,
  },
  {
    key: "CSS",
    name: "CSS",
    isChecked: false,
    voteCount: 84,
  },
  {
    key: "React",
    name: "React",
    isChecked: false,
    voteCount: 25,
  },
];

const App = () => {
  const [pollData, setPollDataState] = useState(pollingItems);
  const [isShowPollPercentage, setShowPollPecentage] = useState(false);

  const onInputSelected = (index) => {
    setPollDataState((prev) => {
      const prevCopy = prev.map((item, i) => {
        return {
          ...item,
          isChecked: i === index,
        };
      });

      return prevCopy;
    });
    setShowPollPecentage(true);
  };

  const totalVotes = useMemo(() => {
    let totalVotesCount = 0;
    pollData.map(({ voteCount, isChecked }) => {
      totalVotesCount += voteCount;
      if (isChecked) {
        totalVotesCount += 1;
      }
    });
    return totalVotesCount;
  }, [pollData]);

  return (
    <div
      style={{
        margin: "20px",
        padding: "20px",
        border: "1px solid red",
        width: "25%",
      }}
    >
      <p style={{ marginTop: "10px" }}> Select your most strong skill</p>
      {pollData.map(({ key, name, isChecked, voteCount }, index) => {
        const currentVoteCount = isChecked ? voteCount + 1 : voteCount;
        const percentage = (currentVoteCount / totalVotes) * 100;
        return (
          <div
            key={key}
            style={{
              marginBottom: "20px",
              border: isShowPollPercentage ? "1px solid green" : null,

              padding: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onInputSelected(index)}
              />
              <div style={{ marginRight: "10px" }}>{name}</div>
            </div>
            {isShowPollPercentage && (
              <div style={{ display: "flex" }}>
                <div style={{ marginLeft: "10px", width: "100%" }}>
                  <Slider percentage={percentage} />
                  {percentage.toFixed(2)}%
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export const Slider = ({ percentage }) => {
  const showPercentageRef = useRef(0);
  const [, forceUpdate] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      showPercentageRef.current += 1;
      if (showPercentageRef.current <= percentage) {
        // Update the UI only if the current percentage is less than or equal to the desired percentage
        forceUpdate({}); // Trigger a re-render
      } else {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [percentage]);



  const currentPercentage = Math.min(showPercentageRef.current, percentage);

  return (
    <div
      style={{
        backgroundColor: "lightgrey",
        height: "16px",
        width: "80%",
        flex: 1,
        borderRadius: "5px",
      }}
    >
      <div
        style={{
          backgroundColor: "green",
          width: `${currentPercentage}%`,
          height: "8px",
          padding: "4px",
          borderRadius: "5px",
        }}
      ></div>
    </div>
  );
};

export default App;
