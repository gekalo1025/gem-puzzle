import getRandomIntInclusive from "./getRandomIntInclusive";
import isPossibleSolve from "./isPossibleSolve";

export default function getRandomArrNumber(countElement) {
  let arrNumber = [];
  let randomArrNumber = [];
  for (let i = 0; i < countElement; i++) {
    arrNumber.push(i);
  }

  while (randomArrNumber.length < countElement) {
    randomArrNumber.push(
      arrNumber.splice(`${getRandomIntInclusive(0, arrNumber.length - 1)}`, 1)
    );
  }

  if (isPossibleSolve(randomArrNumber)) {
    return randomArrNumber;
  } else {
    return getRandomArrNumber(countElement);
  }
}
