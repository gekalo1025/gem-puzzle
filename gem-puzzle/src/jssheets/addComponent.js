import getRandomArrNumber from "./getRandomArrNumber";
import { settings } from "../pages/home/home";

export default function addComponent(countElement, loadArr) {
  const canvas = document.querySelector(".canvas");
  let randomArrNumber;

  if (loadArr) {
    randomArrNumber = loadArr;
  } else {
    randomArrNumber = getRandomArrNumber(
      `${settings.areaSize * settings.areaSize}`
    );
  }

  for (let i = 0; i < countElement; i++) {
    let randomNumber = randomArrNumber.splice(0, 1);
    let newElement = document.createElement("div");
    if (randomNumber == 0) {
      newElement.classList.add(
        "component",
        "emptiness",
        `size${settings.areaSize}`
      );
      newElement.setAttribute("name", `${randomNumber}`);
    } else {
      newElement.classList.add("component", `size${settings.areaSize}`);
      newElement.setAttribute("name", `${randomNumber}`);
      newElement.textContent = randomNumber;
    }

    newElement.setAttribute("draggable", "true");
    canvas.append(newElement);
  }
}
