import "../../stylesheets/main.scss";
import sound from "~/assets/audio/folding-chair-metal-slide_mjiknwvu.mp3";
let audio = new Audio(`${sound}`);
audio.volume = 0;
let areaSize = 4;
let godMode = false;

function startGame() {
  myGameArea.start();
  addComponent(`${areaSize * areaSize - 1}`);
}
const myHTML = {
  header: document.createElement("header"),
  container: document.createElement("div"),
  container2: document.createElement("div"),
  buttonStart: document.createElement("button"),
  buttonStop: document.createElement("button"),
  buttonSave: document.createElement("button"),
  buttonResults: document.createElement("button"),
  buttonGodMode: document.createElement("button"),
  buttonRow: document.createElement("div"),
  buttonRowSize: document.createElement("div"),
  analyticRow: document.createElement("div"),
  moves: document.createElement("div"),
  time: document.createElement("div"),
  sound: document.createElement("button"),
  size3: document.createElement("button"),
  size4: document.createElement("button"),
  size5: document.createElement("button"),
  size6: document.createElement("button"),
  size7: document.createElement("button"),
  size8: document.createElement("button"),

  add: function () {
    this.header.classList.add("header");
    this.container.classList.add("container");
    this.container2.classList.add("container");
    this.buttonRow.classList.add("button-row");
    this.buttonRowSize.classList.add("button-row-size");
    this.analyticRow.classList.add("analytic-row");
    this.moves.classList.add("moves");
    this.time.classList.add("time");
    this.sound.classList.add("sound");
    this.buttonStart.id = "start";
    this.buttonStart.textContent = "Shuffle and start";
    this.buttonStop.id = "stop";
    this.buttonStop.textContent = "stop timer";
    this.buttonSave.id = "save";
    this.buttonSave.textContent = "Save";
    this.buttonResults.id = "results";
    this.buttonResults.textContent = "Results";
    this.buttonGodMode.textContent = "GodMode";
    this.buttonGodMode.id = "god-mode";
    this.buttonGodMode.setAttribute(
      "data-tooltip",
      "Позволяет двигать плитки более свободно"
    );
    this.moves.textContent = "Moves: ";
    this.time.textContent = "Time: ";
    this.header.append(this.container);
    this.container.append(this.buttonRow);
    this.container.append(this.analyticRow);
    this.buttonRow.append(this.buttonStart);
    this.buttonRow.append(this.buttonStop);
    this.buttonRow.append(this.buttonSave);
    this.buttonRow.append(this.buttonResults);
    this.buttonRow.append(this.buttonGodMode);
    this.buttonRow.append(this.sound);
    this.size3.textContent = "3x3";
    this.size4.textContent = "4x4";
    this.size5.textContent = "5x5";
    this.size6.textContent = "6x6";
    this.size7.textContent = "7x7";
    this.size8.textContent = "8x8";
    this.buttonRowSize.append(this.container2);
    this.container2.append(this.size3);
    this.container2.append(this.size4);
    this.container2.append(this.size5);
    this.container2.append(this.size6);
    this.container2.append(this.size7);
    this.container2.append(this.size8);
    this.moves.append(document.createElement("span"));
    this.time.append(document.createElement("span"));
    this.analyticRow.append(this.moves);
    this.analyticRow.append(this.time);
    document.body.insertBefore(this.header, document.body.childNodes[0]);
    document.body.insertBefore(this.buttonRowSize, document.body.childNodes[2]);
  },
};
myHTML.add();

const myGameArea = {
  canvas: document.createElement("div"),
  movesCounter: 0,
  start: function () {
    this.canvas.classList.add("canvas");
    document.body.insertBefore(this.canvas, document.body.childNodes[1]);
  },
};
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
function getRandomArrNumber(countElement) {
  let arrNumber = [];
  let randomArrNumber = [];
  for (let i = 1; i <= countElement; i++) {
    arrNumber.push(i);
  }

  while (randomArrNumber.length - 1 <= countElement) {
    randomArrNumber.push(
      arrNumber.splice(`${getRandomIntInclusive(0, arrNumber.length - 1)}`, 1)
    );
  }

  if (isPossibleSolve(randomArrNumber)) {
    return randomArrNumber;
  } else {
    return getRandomArrNumber(countElement);
  }
}

function addComponent(countElement) {
  const canvas = document.querySelector(".canvas");
  let newElementEmptiness = document.createElement("div");

  let randomArrNumber = getRandomArrNumber(`${areaSize * areaSize - 1}`);

  for (let i = 0; i < countElement; i++) {
    let randomNumber = randomArrNumber.splice(0, 1);
    let newElement = document.createElement("div");
    newElement.classList.add("component", `size${areaSize}`);
    newElement.setAttribute("draggable", "true");
    newElement.setAttribute("name", `${randomNumber}`);
    newElement.textContent = randomNumber;
    canvas.append(newElement);
  }

  newElementEmptiness.classList.add(
    "component",
    "emptiness",
    `size${areaSize}`
  );
  newElementEmptiness.setAttribute("draggable", "false");
  newElementEmptiness.setAttribute("name", `${areaSize * areaSize}`);
  canvas.append(newElementEmptiness);
}
startGame();
document.querySelector(".canvas").addEventListener("click", (el) => {
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
});

function newGame() {
  const canvas = document.body.childNodes[1];
  if (canvas.classList.contains("canvas")) {
    myGameArea.movesCounter = 0;
    canvas.innerHTML = "";
    document.body.removeChild(canvas);
    startGame();
    totalTime = 0;
  }
}
document.getElementById("start").addEventListener("click", newGame);

function counters() {
  const movesSpan = document.querySelector(".moves > span");
  movesSpan.textContent = `${myGameArea.movesCounter}`;
  setTimeout(counters, 100);
}

counters();

let totalTime = 0;
let timer;

function startWatch() {
  let min;
  let second;
  second = Math.floor((totalTime / 1000) % 60);
  min = Math.floor((totalTime / 1000 / 60) % 60);
  second = second % 60 < 10 ? "0" + second : second;
  min = min % 60 < 10 ? +"0" + min : min;
  document.querySelector(".time > span").textContent = min + ":" + second;

  timer = setTimeout(() => {
    totalTime += 1000;
    startWatch();
  }, 1000);
}
startWatch();
document.querySelector("#stop").addEventListener("click", () => {
  document.querySelector("#stop").classList.toggle("pause");
  if (document.querySelector("#stop").classList.contains("pause")) {
    clearInterval(timer);
    document.querySelector("#stop").textContent = "start timer";
  } else {
    clearInterval(timer);
    document.querySelector("#stop").textContent = "stop timer";
    startWatch();
  }
});
document.querySelector("#god-mode").addEventListener("click", () => {
  document.querySelector("#god-mode").classList.toggle("active");

  if (document.querySelector("#god-mode").classList.contains("active")) {
    godMode = true;
  } else {
    godMode = false;
  }
});

document.querySelector(".sound").addEventListener("click", () => {
  document.querySelector(".sound").classList.toggle("mute");

  if (document.querySelector(".sound").classList.contains("mute")) {
    audio.volume = 0;
  } else {
    audio.volume = 0.5;
  }
});

document.querySelector(".button-row-size").addEventListener("click", (el) => {
  switch (el.target.textContent) {
    case "3x3":
      areaSize = 3;
      deliteAndAddClass(document.querySelectorAll(".canvas >div"), "tree");
      newGame();
      break;
    case "4x4":
      areaSize = 4;
      newGame();
      break;
    case "5x5":
      areaSize = 5;
      newGame();
      break;
    case "6x6":
      areaSize = 6;
      newGame();
      break;
    case "7x7":
      areaSize = 7;
      newGame();
      break;
    case "8x8":
      areaSize = 8;
      newGame();
      break;

    default:
      areaSize = 4;
      newGame();
      break;
  }
});
function deliteAndAddClass(colection, addClass) {
  colection.forEach((element) => {
    element.classList.add(addClass);
  });
}

function isWin() {
  let allComponent = document.querySelector(".canvas").children;
  let winMoves = 0;

  for (let i = 0; i < allComponent.length; i++) {
    if (allComponent[i].getAttribute("name") === `${i + 1}`) {
      winMoves++;
    } else {
    }
  }
  if (winMoves === allComponent.length) {
    alert(
      `Hooray! You solved the puzzle in ${
        document.querySelector(".time > span").textContent
      } and ${myGameArea.movesCounter} moves!`
    );
    newGame();
  }
  setTimeout(isWin, 1000);
}
isWin();

function countInversion(array) {
  let countInversion = 0;
  for (let i = 0; i < array.length; i++) {
    for (let j = i; j < array.length; j++) {
      if (array[i] <= array[j]) {
      } else {
        countInversion++;
      }
    }
  }

  return countInversion;
}

function isPossibleSolve(arr) {
  if (areaSize % 2 === 0) {
    if ((countInversion(arr) + (areaSize - 1)) % 2 === 0) {
      return false;
    } else {
      return true;
    }
  } else {
    if (countInversion(arr) % 2 === 0) {
      return true;
    } else {
      return false;
    }
  }
}
