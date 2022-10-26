import { audio } from "../pages/home/home";
import searchIndexElement from "./searchIndexElement";
import { settings } from "../pages/home/home";
import { myGameArea } from "./myGameArea";

export default function replacementTiles(el) {
  const emptinessTiles = document.querySelector(".emptiness");
  const allTiles = document.querySelector(".canvas").children;
  const canvas = document.querySelector(".canvas");

  const isNextSiblingEmptiness = allTiles[
    `${searchIndexElement(el, allTiles, "textContent") + 1}`
  ]
    ? allTiles[
        `${searchIndexElement(el, allTiles, "textContent") + 1}`
      ].classList.contains("emptiness")
    : null;

  const isPrevSiblingEmptiness = allTiles[
    `${searchIndexElement(el, allTiles, "textContent") - 1}`
  ]
    ? allTiles[
        `${searchIndexElement(el, allTiles, "textContent") - 1}`
      ].classList.contains("emptiness")
    : null;

  const isRowSiblingRightEmptiness = allTiles[
    `${searchIndexElement(el, allTiles, "textContent") + settings.areaSize}`
  ]
    ? allTiles[
        `${searchIndexElement(el, allTiles, "textContent") + settings.areaSize}`
      ].classList.contains("emptiness")
    : null;

  const isRowSiblingLeftEmptiness = allTiles[
    `${searchIndexElement(el, allTiles, "textContent") - settings.areaSize}`
  ]
    ? allTiles[
        `${searchIndexElement(el, allTiles, "textContent") - settings.areaSize}`
      ].classList.contains("emptiness")
    : null;

  if (
    el.target.classList.contains("component") &&
    !el.target.classList.contains("emptiness")
  ) {
    if (settings.godMode) {
      emptinessTiles.replaceWith(el.target.cloneNode(true));
      el.target.replaceWith(emptinessTiles);
      myGameArea.movesCounter++;
      audio.play();
    } else if (isNextSiblingEmptiness) {
      el.target.classList.add("moving-animation-right");
      emptinessTiles.replaceWith(el.target.cloneNode(true));
      el.target.replaceWith(emptinessTiles);
      myGameArea.movesCounter++;
      audio.play();
      canvas.removeEventListener("click", replacementTiles);
    } else if (isPrevSiblingEmptiness) {
      el.target.classList.add("moving-animation-left");
      emptinessTiles.replaceWith(el.target.cloneNode(true));
      el.target.replaceWith(emptinessTiles);
      myGameArea.movesCounter++;
      audio.play();
      canvas.removeEventListener("click", replacementTiles);
    } else if (isRowSiblingRightEmptiness) {
      el.target.classList.add("moving-animation-bottom");
      emptinessTiles.replaceWith(el.target.cloneNode(true));
      el.target.replaceWith(emptinessTiles);
      myGameArea.movesCounter++;
      audio.play();
      canvas.removeEventListener("click", replacementTiles);
    } else if (isRowSiblingLeftEmptiness) {
      el.target.classList.add("moving-animation-top");
      emptinessTiles.replaceWith(el.target.cloneNode(true));
      el.target.replaceWith(emptinessTiles);
      myGameArea.movesCounter++;
      audio.play();
      canvas.removeEventListener("click", replacementTiles);
    }
  }
}
