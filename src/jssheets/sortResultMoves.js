import { resultGame } from "../pages/home/home";
import { settings } from "../pages/home/home";
export default function sortResultMoves(arr) {
  let sortArr = resultGame[`${settings.areaSize}`].sort((a, b) => {
    a = parseInt(a.match(/\d+/));
    b = parseInt(b.match(/\d+/));
    return a - b;
  });
  return sortArr;
}
