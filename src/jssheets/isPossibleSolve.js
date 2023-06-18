import countInversion from "./countInversion";
import { settings } from "../pages/home/home";

export default function isPossibleSolve(arr) {
  let indexEmptiness = arr.findIndex((el) => el == "0");
  let rowEmptiness = Math.floor(indexEmptiness / settings.areaSize);
  if (settings.areaSize % 2 === 0) {
    if ((countInversion(arr) + rowEmptiness) % 2 === 0) {
      return false;
    } else {
      return true;
    }
  } else {
    if (countInversion(arr) % 2 === 0) {
      return true;
    } else {
      return false;
    }
  }
}
