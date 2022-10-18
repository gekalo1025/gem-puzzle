import "../../stylesheets/main.scss";
const windowInnerWidth = document.documentElement.clientWidth;
const windowInnerHeight = document.documentElement.clientHeight;

function startGame() {
  myGameArea.start();
  addComponent(15);
}
const myHTML = {
  header: document.createElement("header"),
  container: document.createElement("div"),
  buttonStart: document.createElement("button"),
  buttonStop: document.createElement("button"),
  buttonSave: document.createElement("button"),
  buttonResults: document.createElement("button"),
  buttonRow: document.createElement("div"),
  analyticRow: document.createElement("div"),
  moves: document.createElement("div"),
  time: document.createElement("div"),
  add: function () {
    this.header.classList.add("header");
    this.container.classList.add("container");
    this.buttonRow.classList.add("button-row");
    this.analyticRow.classList.add("analytic-row");
    this.moves.classList.add("moves");
    this.time.classList.add("time");
    this.buttonStart.id = "start";
    this.buttonStart.textContent = "Shuffle and start";
    this.buttonStop.id = "stop";
    this.buttonStop.textContent = "stop timer";
    this.buttonSave.id = "save";
    this.buttonSave.textContent = "Save";
    this.buttonResults.id = "results";
    this.buttonResults.textContent = "Results";
    this.moves.textContent = "Moves: ";
    this.time.textContent = "Time: ";
    this.header.append(this.container);
    this.container.append(this.buttonRow);
    this.container.append(this.analyticRow);
    this.buttonRow.append(this.buttonStart);
    this.buttonRow.append(this.buttonStop);
    this.buttonRow.append(this.buttonSave);
    this.buttonRow.append(this.buttonResults);
    this.moves.append(document.createElement("span"));
    this.time.append(document.createElement("span"));
    this.analyticRow.append(this.moves);
    this.analyticRow.append(this.time);
    document.body.insertBefore(this.header, document.body.childNodes[0]);
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

function addComponent(countElement) {
  let arrNumber = [];
  const canvas = document.querySelector(".canvas");
  let newElementEmptiness = document.createElement("div");
  for (let i = 1; i <= countElement; i++) {
    arrNumber.push(i);
  }
  for (let i = 1; i <= countElement; i++) {
    let newElement = document.createElement("div");
    newElement.classList.add("component");
    newElement.setAttribute("draggable", "true");
    newElement.textContent = `${arrNumber.splice(
      getRandomIntInclusive(0, arrNumber.length - 1),
      1
    )}`;
    canvas.append(newElement);
  }
  newElementEmptiness.classList.add("component", "emptiness");
  newElementEmptiness.setAttribute("draggable", "false");
  canvas.append(newElementEmptiness);
}
startGame();
document.querySelector(".canvas").addEventListener("click", (el) => {
  const emptiness = document.querySelector(".emptiness");
  const canvas = document.querySelector(".canvas");
  let isNextSiblingEmptiness;
  let isPrevSiblingEmptiness;
  let isfourthSiblingRightEmptiness;
  let isfourthSiblingLeftEmptiness;
  try {
    isPrevSiblingEmptiness =
      el.target.previousElementSibling.classList.contains("emptiness");
  } catch (err) {
    isPrevSiblingEmptiness = null;
  }

  try {
    isNextSiblingEmptiness =
      el.target.nextElementSibling.classList.contains("emptiness");
  } catch (err) {
    isNextSiblingEmptiness = null;
  }
  try {
    isfourthSiblingRightEmptiness =
      el.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.classList.contains(
        "emptiness"
      );
  } catch (error) {
    isfourthSiblingRightEmptiness = null;
  }
  try {
    isfourthSiblingLeftEmptiness =
      el.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.classList.contains(
        "emptiness"
      );
  } catch (error) {
    isfourthSiblingLeftEmptiness = null;
  }

  if (
    el.target.classList.contains("component") &&
    !el.target.classList.contains("emptiness")
  ) {
    if (isNextSiblingEmptiness || isPrevSiblingEmptiness) {
      emptiness.replaceWith(el.target.cloneNode(true));
      el.target.replaceWith(emptiness);
      myGameArea.movesCounter++;
    } else if (isfourthSiblingRightEmptiness || isfourthSiblingLeftEmptiness) {
      emptiness.replaceWith(el.target.cloneNode(true));
      el.target.replaceWith(emptiness);
      myGameArea.movesCounter++;
    }
  }
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
  document.querySelector(".time > span").innerHTML = min + ":" + second;

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
