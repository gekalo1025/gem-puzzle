import { settings } from "../pages/home/home";
import { myGameArea } from "./myGameArea";
import { audio } from "../pages/home/home";

export default function replacementTilesForDrop(item) {
  const emptinessTiles = document.querySelector(".emptiness");
  let allTiles = document.querySelector(".canvas").children;
  let numberChildrenElement = () => {
    for (let i = 0; i < allTiles.length; i++) {
      if (item.textContent === allTiles[i].textContent) {
        return i;
      }
    }
  };

  let isNextSiblingEmptiness = allTiles[`${numberChildrenElement() + 1}`]
    ? allTiles[`${numberChildrenElement() + 1}`].classList.contains("emptiness")
    : null;
  let isPrevSiblingEmptiness = allTiles[`${numberChildrenElement() - 1}`]
    ? allTiles[`${numberChildrenElement() - 1}`].classList.contains("emptiness")
    : null;
  let isRowSiblingRightEmptiness = allTiles[
    `${numberChildrenElement() + settings.areaSize}`
  ]
    ? allTiles[
        `${numberChildrenElement() + settings.areaSize}`
      ].classList.contains("emptiness")
    : null;
  let isRowSiblingLeftEmptiness = allTiles[
    `${numberChildrenElement() - settings.areaSize}`
  ]
    ? allTiles[
        `${numberChildrenElement() - settings.areaSize}`
      ].classList.contains("emptiness")
    : null;

  if (settings.godMode) {
    emptinessTiles.replaceWith(item.cloneNode(true));
    item.replaceWith(emptinessTiles);
    myGameArea.movesCounter++;
    audio.play();
  } else if (isNextSiblingEmptiness) {
    item.classList.add("moving-animation-right");
    emptinessTiles.replaceWith(item.cloneNode(true));
    item.replaceWith(emptinessTiles);
    myGameArea.movesCounter++;
    audio.play();
  } else if (isPrevSiblingEmptiness) {
    item.classList.add("moving-animation-left");
    emptinessTiles.replaceWith(item.cloneNode(true));
    item.replaceWith(emptinessTiles);
    myGameArea.movesCounter++;
    audio.play();
  } else if (isRowSiblingRightEmptiness) {
    item.classList.add("moving-animation-bottom");
    emptinessTiles.replaceWith(item.cloneNode(true));
    item.replaceWith(emptinessTiles);
    myGameArea.movesCounter++;
    audio.play();
  } else if (isRowSiblingLeftEmptiness) {
    item.classList.add("moving-animation-top");
    emptinessTiles.replaceWith(item.cloneNode(true));
    item.replaceWith(emptinessTiles);
    myGameArea.movesCounter++;
    audio.play();
  }

  document.querySelector(".emptiness").style.zIndex = "-1";
  setTimeout(() => {
    for (const item of allTiles) {
      item.classList.remove(
        "moving-animation-right",
        "moving-animation-left",
        "moving-animation-top",
        "moving-animation-bottom"
      );
    }
  }, 400);
}
