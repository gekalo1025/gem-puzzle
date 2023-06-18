import setLocalStorage from "./setLocalStarage";
import { settings } from "../pages/home/home";
import { myGameArea } from "./myGameArea";
import { resultGame } from "../pages/home/home";

export default function saveGame() {
  let allComponent = document.querySelector(".canvas").children;
  let saveResult = [];
  for (let i = 0; i < allComponent.length; i++) {
    saveResult.push(allComponent[i].textContent);
  }
  setLocalStorage("save", saveResult);
  setLocalStorage("areaSize", settings.areaSize);
  setLocalStorage("moves", myGameArea.movesCounter);
  setLocalStorage("totalTime", settings.totalTime);
  setLocalStorage("resultGame", JSON.stringify(resultGame));
}
