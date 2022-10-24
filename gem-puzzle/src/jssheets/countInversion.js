export default function countInversion(array) {
  let countInversion = 0;
  for (let i = 0; i < array.length; i++) {
    for (let j = i; j < array.length; j++) {
      if (array[i] <= array[j]) {
      } else {
        countInversion++;
      }
    }
  }

  return countInversion;
}
