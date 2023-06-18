import { settings } from "../pages/home/home";
import { newGame } from "./newGame";
export default function choisDeskSize(el) {
  switch (el.target.textContent) {
    case "3x3":
      settings.areaSize = 3;
      newGame();
      break;
    case "4x4":
      settings.areaSize = 4;
      newGame();
      break;
    case "5x5":
      settings.areaSize = 5;
      newGame();
      break;
    case "6x6":
      settings.areaSize = 6;
      newGame();
      break;
    case "7x7":
      settings.areaSize = 7;
      newGame();
      break;
    case "8x8":
      settings.areaSize = 8;
      newGame();
      break;

    default:
      settings.areaSize = 4;
      newGame();
      break;
  }
}
