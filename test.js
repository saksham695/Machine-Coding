const N = 3;

// const generateAll = (N, digitsArray, op) => {
//   if (N === 0) {
//     console.log(N, "---", op);
//     return;
//   }
//   for (let i = 0; i < digitsArray.length; i++) {
//     generateAll(N - 1, digitsArray, op + digitsArray[i]);
//   }
// };

// generateAll(N, ["1", "2", "3", "4", "5"], "");

// const generateAllSubsets = (inputArray, op, index) => {
//   if (index === -1) {
//     console.log(op);
//     return;
//   }
//   const newOP = op + "";
//   const newOP1 = op + inputArray[index];

//   generateAllSubsets(inputArray, newOP, index - 1);
//   generateAllSubsets(inputArray, newOP1, index - 1);
// };

// generateAllSubsets(["1", "2", "3"], "", 2);

let countCal = 0;
const subsetSum = (input, index, sum, count, target) => {
  if (index === input.length) {
    if (sum === target) {
      return 1;
    }
    return 0;
  }
  const includingSum = sum + input[index];

  return (
    subsetSum(input, index + 1, includingSum, count, target) +
    subsetSum(input, index + 1, sum, count, target)
  );
};

console.log("Count: ", subsetSum([1, 3, 2, 2, 4, 5, 4], 0, 0, 0, 4));
// [2,2,4,4]
// 2 0
// 2 4
//
