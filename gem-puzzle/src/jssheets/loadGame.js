import { settings } from "../pages/home/home";
import { myGameArea } from "./myGameArea";
import { newGame } from "./newGame";
export default function loadGame() {
  settings.isLoad = true;
  settings.areaSize = +localStorage.getItem("areaSize");
  newGame();
  settings.totalTime = +localStorage.getItem("totalTime");
  myGameArea.movesCounter = +localStorage.getItem("moves");
  settings.isLoad = false;
}
