import { areaSize, godMode, myGameArea, audio } from "../pages/home/home";
export function noName(el) {
  const emptiness = document.querySelector(".emptiness");
  let allComponent = document.querySelector(".canvas").children;
  let numberChildrenElement = (element) => {
    for (let i = 0; i < allComponent.length; i++) {
      if (el.target.textContent === allComponent[i].textContent) {
        return i;
      }
    }
  };

  let isNextSiblingEmptiness = allComponent[`${numberChildrenElement() + 1}`]
    ? allComponent[`${numberChildrenElement() + 1}`].classList.contains(
        "emptiness"
      )
    : null;
  let isPrevSiblingEmptiness = allComponent[`${numberChildrenElement() - 1}`]
    ? allComponent[`${numberChildrenElement() - 1}`].classList.contains(
        "emptiness"
      )
    : null;
  let isRowSiblingRightEmptiness = allComponent[
    `${numberChildrenElement() + areaSize}`
  ]
    ? allComponent[`${numberChildrenElement() + areaSize}`].classList.contains(
        "emptiness"
      )
    : null;
  let isRowSiblingLeftEmptiness = allComponent[
    `${numberChildrenElement() - areaSize}`
  ]
    ? allComponent[`${numberChildrenElement() - areaSize}`].classList.contains(
        "emptiness"
      )
    : null;

  if (
    el.target.classList.contains("component") &&
    !el.target.classList.contains("emptiness")
  ) {
    if (godMode) {
      emptiness.replaceWith(el.target.cloneNode(true));
      el.target.replaceWith(emptiness);
      myGameArea.movesCounter++;
      audio.play();
    } else if (isNextSiblingEmptiness) {
      el.target.classList.add("moving-animation-right");
      emptiness.replaceWith(el.target.cloneNode(true));
      el.target.replaceWith(emptiness);
      myGameArea.movesCounter++;
      audio.play();
    } else if (isPrevSiblingEmptiness) {
      el.target.classList.add("moving-animation-left");
      emptiness.replaceWith(el.target.cloneNode(true));
      el.target.replaceWith(emptiness);
      myGameArea.movesCounter++;
      audio.play();
    } else if (isRowSiblingRightEmptiness) {
      el.target.classList.add("moving-animation-bottom");
      emptiness.replaceWith(el.target.cloneNode(true));
      el.target.replaceWith(emptiness);
      myGameArea.movesCounter++;
      audio.play();
    } else if (isRowSiblingLeftEmptiness) {
      el.target.classList.add("moving-animation-top");
      emptiness.replaceWith(el.target.cloneNode(true));
      el.target.replaceWith(emptiness);
      myGameArea.movesCounter++;
      audio.play();
    }
  }
  setTimeout(() => {
    for (const item of allComponent) {
      item.classList.remove(
        "moving-animation-right",
        "moving-animation-left",
        "moving-animation-top",
        "moving-animation-bottom"
      );
    }
  }, 400);
}
