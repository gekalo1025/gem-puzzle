export default function countInversion(array) {
  const newArr = array.filter((el)=> el != 0);
  let countInversion = 0;
  for (let i = 0; i < newArr.length; i++) {
    for (let j = i; j < newArr.length; j++) {
      if (newArr[i] <= newArr[j]) {
      } else {
        countInversion++;
      }
    }
  }

  return countInversion;
}
