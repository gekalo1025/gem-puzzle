import { myGameArea } from "./myGameArea";
import { startGame } from "./startGame";
import totalTime from "../pages/home/home";

import { settings } from "../pages/home/home";

export function newGame() {
  const canvas = document.body.childNodes[1];
  if (canvas.classList.contains("canvas")) {
    myGameArea.movesCounter = 0;
    canvas.innerHTML = "";
    document.body.removeChild(canvas);
    startGame();
    settings.totalTime = 0;
  }
}
