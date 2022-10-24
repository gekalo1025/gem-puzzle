import { resultGame } from "../pages/home/home";
import { settings } from "../pages/home/home";
import { myGameArea } from "./myGameArea";
export default function addTopResult() {
  resultGame[`${settings.areaSize}`].push(
    `You solved the puzzle in ${myGameArea.movesCounter} moves`
  );
}
