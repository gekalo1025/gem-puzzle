import { settings } from "../pages/home/home";
import { myGameArea } from "./myGameArea";
import addComponent from "./addComponent";

export function startGame() {
  myGameArea.start();
  if (settings.isLoad && localStorage.getItem("save")) {
    let arrLoad = localStorage.getItem("save").split(",");
    addComponent(`${arrLoad.length}`, arrLoad);
  } else {
    addComponent(`${settings.areaSize * settings.areaSize}`);
  }
}
