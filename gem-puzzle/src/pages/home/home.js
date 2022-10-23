import "../../stylesheets/main.scss";
import sound from "~/assets/audio/folding-chair-metal-slide_mjiknwvu.mp3";
import { noName } from "~/jssheets/noName";
export let audio = new Audio(`${sound}`);
audio.volume = 0.5;
export let areaSize = 4;
export let godMode = false;
let isLoad = false;
let totalTime = 0;
let timer;

function startGame() {
  myGameArea.start();
  if (isLoad && localStorage.getItem("save")) {
    let arrLoad = localStorage.getItem("save").split(",");
    addComponent(`${arrLoad.length}`, arrLoad);
  } else {
    addComponent(`${areaSize * areaSize}`);
  }
}
const myHTML = {
  header: document.createElement("header"),
  container: document.createElement("div"),
  container2: document.createElement("div"),
  navResult: document.createElement("div"),
  buttonStart: document.createElement("button"),
  buttonStop: document.createElement("button"),
  buttonSave: document.createElement("button"),
  buttonLoad: document.createElement("button"),
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
    this.navResult.classList.add("nav-result");
    this.moves.classList.add("moves");
    this.time.classList.add("time");
    this.sound.classList.add("sound");
    this.buttonStart.id = "start";
    this.buttonStart.textContent = "Shuffle and start";
    this.buttonStop.id = "stop";
    this.buttonStop.textContent = "stop timer";
    this.buttonSave.id = "save";
    this.buttonLoad.id = "load";
    this.buttonSave.textContent = "Save";
    this.buttonLoad.textContent = "Load";
    this.buttonResults.id = "results";
    this.buttonResults.textContent = "Results";
    this.buttonGodMode.textContent = "GodMode";
    this.buttonGodMode.id = "god-mode";
    this.buttonGodMode.setAttribute("data-tooltip", "Двигай как хочешь");
    this.moves.textContent = "Moves: ";
    this.time.textContent = "Time: ";
    this.header.append(this.container);
    this.container.append(this.buttonRow);
    this.container.append(this.analyticRow);
    this.buttonRow.append(this.buttonStart);
    this.buttonRow.append(this.buttonStop);
    this.buttonRow.append(this.buttonSave);
    this.buttonRow.append(this.buttonLoad);
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
    // document.body.insertBefore(this.navResult, document.body.childNodes[3]);
  },
};
myHTML.add();

export const myGameArea = {
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
  for (let i = 0; i < countElement; i++) {
    arrNumber.push(i);
  }

  while (randomArrNumber.length < countElement) {
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

function addComponent(countElement, loadArr) {
  const canvas = document.querySelector(".canvas");
  let randomArrNumber;

  if (loadArr) {
    randomArrNumber = loadArr;
  } else {
    randomArrNumber = getRandomArrNumber(`${areaSize * areaSize}`);
  }

  for (let i = 0; i < countElement; i++) {
    let randomNumber = randomArrNumber.splice(0, 1);
    let newElement = document.createElement("div");
    if (randomNumber == 0) {
      newElement.classList.add("component", "emptiness", `size${areaSize}`);
      newElement.setAttribute("name", `${randomNumber}`);
    } else {
      newElement.classList.add("component", `size${areaSize}`);
      newElement.setAttribute("name", `${randomNumber}`);
      newElement.textContent = randomNumber;
    }

    newElement.setAttribute("draggable", "true");
    canvas.append(newElement);
  }
}
startGame();

document.querySelector(".canvas").addEventListener("click", noName);

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

function isWin() {
  let allComponent = document.querySelector(".canvas").children;
  let winMoves = 0;

  for (let i = 0; i < allComponent.length; i++) {
    if (allComponent[i].getAttribute("name") === `${i + 1}`) {
      winMoves++;
    }
  }
  if (allComponent[allComponent.length - 1].getAttribute("name") == 0) {
    winMoves++;
  }
  if (winMoves === allComponent.length) {
    addTopResult();
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
  let indexEmptiness = arr.findIndex((el) => el == "0");
  let rowEmptiness = Math.floor(indexEmptiness / areaSize);
  if (areaSize % 2 === 0) {
    if ((countInversion(arr) + rowEmptiness) % 2 === 0) {
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
function saveGame() {
  let allComponent = document.querySelector(".canvas").children;
  let saveResult = [];
  for (let i = 0; i < allComponent.length; i++) {
    saveResult.push(allComponent[i].textContent);
  }
  setLocalStorage("save", saveResult);
  setLocalStorage("areaSize", areaSize);
  setLocalStorage("moves", myGameArea.movesCounter);
  setLocalStorage("totalTime", totalTime);
  setLocalStorage("resultGame", JSON.stringify(resultGame));
}
function loadGame() {
  isLoad = true;
  areaSize = +localStorage.getItem("areaSize");
  newGame();
  totalTime = +localStorage.getItem("totalTime");
  myGameArea.movesCounter = +localStorage.getItem("moves");
  isLoad = false;
}

document.querySelector("#save").addEventListener("click", saveGame);
document.querySelector("#load").addEventListener("click", loadGame);
document.querySelector("#results").addEventListener("mouseenter", () => {
  let sortResult = resultGame[`${areaSize}`].sort((a, b) => {
    a = parseInt(a.match(/\d+/));
    b = parseInt(b.match(/\d+/));
    return a - b;
  });
  if (sortResult.length === 0) {
    results.setAttribute("data-tooltip", `No results yet`);
  } else {
    let topTenResult = sortResult.slice(0, 11);
    const results = document.querySelector("#results");
    let tooltip = "";
    for (let i = 0; i < topTenResult.length; i++) {
      tooltip += `   ${i + 1}. ` + topTenResult[i];
    }
    results.setAttribute("data-tooltip", `${tooltip}`);
  }
});
function setLocalStorage(name, value) {
  localStorage.setItem(`${name}`, value);
}

let resultGame = {
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
};
function addTopResult() {
  resultGame[`${areaSize}`].push(
    `You solved the puzzle in ${myGameArea.movesCounter} moves`
  );
}

function getLocalStorage() {
  if (localStorage.getItem("resultGame")) {
    resultGame = JSON.parse(localStorage.getItem("resultGame"));
  }
}
window.addEventListener("load", getLocalStorage);

//////////    перетаскивание
document.querySelector(".canvas").ondragover = allowDrop;

function allowDrop(event) {
  event.preventDefault();
}

document.querySelector(".canvas").addEventListener("dragstart", drag);

function drag(event) {
  document.querySelector(".emptiness").style.zIndex = "10";
  event.dataTransfer.setData("name", event.target.attributes.name.nodeValue);
}

document.querySelector(".canvas").addEventListener("drop", drop);
function drop(event) {
  if (event.target.classList.contains("emptiness")) {
    let itemNameValue = document.getElementsByName(
      event.dataTransfer.getData("name")
    )[0];

    const emptiness = document.querySelector(".emptiness");
    let allComponent = document.querySelector(".canvas").children;
    let numberChildrenElement = () => {
      for (let i = 0; i < allComponent.length; i++) {
        if (itemNameValue.textContent === allComponent[i].textContent) {
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
      ? allComponent[
          `${numberChildrenElement() + areaSize}`
        ].classList.contains("emptiness")
      : null;
    let isRowSiblingLeftEmptiness = allComponent[
      `${numberChildrenElement() - areaSize}`
    ]
      ? allComponent[
          `${numberChildrenElement() - areaSize}`
        ].classList.contains("emptiness")
      : null;

    if (true) {
      if (godMode) {
        emptiness.replaceWith(itemNameValue.cloneNode(true));
        itemNameValue.replaceWith(emptiness);
        myGameArea.movesCounter++;
        audio.play();
      } else if (isNextSiblingEmptiness) {
        itemNameValue.classList.add("moving-animation-right");
        emptiness.replaceWith(itemNameValue.cloneNode(true));
        itemNameValue.replaceWith(emptiness);
        myGameArea.movesCounter++;
        audio.play();
      } else if (isPrevSiblingEmptiness) {
        itemNameValue.classList.add("moving-animation-left");
        emptiness.replaceWith(itemNameValue.cloneNode(true));
        itemNameValue.replaceWith(emptiness);
        myGameArea.movesCounter++;
        audio.play();
      } else if (isRowSiblingRightEmptiness) {
        itemNameValue.classList.add("moving-animation-bottom");
        emptiness.replaceWith(itemNameValue.cloneNode(true));
        itemNameValue.replaceWith(emptiness);
        myGameArea.movesCounter++;
        audio.play();
      } else if (isRowSiblingLeftEmptiness) {
        itemNameValue.classList.add("moving-animation-top");
        emptiness.replaceWith(itemNameValue.cloneNode(true));
        itemNameValue.replaceWith(emptiness);
        myGameArea.movesCounter++;
        audio.play();
      }
    }

    document.querySelector(".emptiness").style.zIndex = "-1";
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
}
