import "../../stylesheets/main.scss";
import sound from "~/assets/audio/folding-chair-metal-slide_mjiknwvu.mp3";
import replacementTiles from "../../jssheets/replacementTiles";
import { startGame } from "../../jssheets/startGame";
import { newGame } from "../../jssheets/newGame";
import { myGameArea } from "../../jssheets/myGameArea";
import saveGame from "../../jssheets/saveGame";
import loadGame from "../../jssheets/loadGame";
import addTopResult from "../../jssheets/addTopResult";
import drop from "../../jssheets/drop";
import drag from "../../jssheets/drag";
import allowDrop from "../../jssheets/allowDrop";
import showResultMoves from "../../jssheets/showResultMoves";
import toggleStopTimer from "../../jssheets/toggleStopTimer";
import toggleGodMode from "../../jssheets/toggleGodMode";
import toggleMute from "../../jssheets/toggleMute";
import choisDeskSize from "../../jssheets/choisDeskSize";
import { myHTML } from "../../jssheets/myHTML";

export const audio = new Audio(`${sound}`);
audio.volume = 0.2;

export const settings = {
  areaSize: 4,
  godMode: false,
  isLoad: false,
  totalTime: 0,
  timer: null,
};
export let resultGame = {
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
};

/////////////////// Create HTML file ////////////////////
myHTML.createElements();
myHTML.addClassElements();
myHTML.addIdElement();
myHTML.addSetAttribute();
myHTML.addTextContentElement();
myHTML.addElement();

startGame();

/////////////////// Constans ////////////////////
const canvas = document.querySelector(".canvas");
const start = document.getElementById("start");
const stop = document.querySelector("#stop");
const godMode = document.querySelector("#god-mode");
const volume = document.querySelector(".sound");
const buttonRowSize = document.querySelector(".button-row-size");
const save = document.querySelector("#save");
const load = document.querySelector("#load");
const results = document.querySelector("#results");

/////////////////// Functions ////////////////////
(function showMoves() {
  const movesSpan = document.querySelector(".moves > span");
  movesSpan.textContent = `${myGameArea.movesCounter}`;
  setTimeout(showMoves, 100);
})();

export function startWatch() {
  let min;
  let second;
  second = Math.floor((settings.totalTime / 1000) % 60);
  min = Math.floor((settings.totalTime / 1000 / 60) % 60);
  second = second % 60 < 10 ? "0" + second : second;
  min = min % 60 < 10 ? +"0" + min : min;
  document.querySelector(".time > span").textContent = min + ":" + second;

  settings.timer = setTimeout(() => {
    settings.totalTime += 1000;
    startWatch();
  }, 1000);
}
startWatch();

(function isWin() {
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
})();

function getLocalStorage() {
  if (localStorage.getItem("resultGame")) {
    resultGame = JSON.parse(localStorage.getItem("resultGame"));
  }
}

/////////////////// Event Listeners ////////////////////
canvas.addEventListener("click", replacementTiles);

start.addEventListener("click", newGame);

stop.addEventListener("click", toggleStopTimer);
godMode.addEventListener("click", toggleGodMode);

volume.addEventListener("click", toggleMute);

buttonRowSize.addEventListener("click", choisDeskSize);

save.addEventListener("click", saveGame);
load.addEventListener("click", loadGame);
results.addEventListener("mouseenter", showResultMoves);

window.addEventListener("load", getLocalStorage);

///////////////    Drag and Drop //////////////////////
canvas.ondragover = allowDrop;

canvas.addEventListener("dragstart", drag);

canvas.addEventListener("drop", drop);
