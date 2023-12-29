import React, { useMemo, useState } from "react";

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
    voteCount: 24,
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
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: "80%",
                    backgroundColor: "#ddd",
                    borderRadius: "5px",
                    height: "10px",
                  }}
                >
                  <div
                    style={{
                      width: `${isChecked ? percentage : percentage}%`,
                      backgroundColor: "#4caf50",
                      borderRadius: "5px",
                      height: "100%",
                    }}
                  />
                </div>
                <div style={{ marginLeft: "10px" }}>
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

export default App;
