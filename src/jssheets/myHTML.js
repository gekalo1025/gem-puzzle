export const myHTML = {
  body: document.body,
  header: null,
  header_title: null,
  container: null,
  container2: null,
  navResult: null,
  buttonStart: null,
  buttonStop: null,
  buttonSave: null,
  buttonLoad: null,
  buttonResults: null,
  buttonGodMode: null,
  buttonRow: null,
  buttonRowSize: null,
  analyticRow: null,
  moves: null,
  time: null,
  sound: null,
  size3: null,
  size4: null,
  size5: null,
  size6: null,
  size7: null,
  size8: null,

  addElement: function () {
    this.header.append(this.container);
    this.container.append(this.header_title);
    this.container.append(this.buttonRow);
    this.container.append(this.analyticRow);
    this.buttonRow.append(this.buttonStart);
    this.buttonRow.append(this.buttonStop);
    this.buttonRow.append(this.buttonSave);
    this.buttonRow.append(this.buttonLoad);
    this.buttonRow.append(this.buttonResults);
    this.buttonRow.append(this.buttonGodMode);
    this.buttonRow.append(this.sound);
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

    this.body.insertBefore(this.header, this.body.childNodes[0]);
    this.body.insertBefore(this.buttonRowSize, this.body.childNodes[2]);
  },
  createElements: function () {
    (this.header = document.createElement("header")),
      (this.header_title = document.createElement("h1")),
      (this.container = document.createElement("div")),
      (this.container2 = document.createElement("div")),
      (this.navResult = document.createElement("div")),
      (this.buttonStart = document.createElement("button")),
      (this.buttonStop = document.createElement("button")),
      (this.buttonSave = document.createElement("button")),
      (this.buttonLoad = document.createElement("button")),
      (this.buttonResults = document.createElement("button")),
      (this.buttonGodMode = document.createElement("button")),
      (this.buttonRow = document.createElement("div")),
      (this.buttonRowSize = document.createElement("div")),
      (this.analyticRow = document.createElement("div")),
      (this.moves = document.createElement("div")),
      (this.time = document.createElement("div")),
      (this.sound = document.createElement("button")),
      (this.size3 = document.createElement("button")),
      (this.size4 = document.createElement("button")),
      (this.size5 = document.createElement("button")),
      (this.size6 = document.createElement("button")),
      (this.size7 = document.createElement("button")),
      (this.size8 = document.createElement("button"));
  },
  addClassElements: function () {
    this.header_title.classList.add("header_title");
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
  },
  addIdElement: function () {
    this.buttonStart.id = "start";
    this.buttonStop.id = "stop";
    this.buttonSave.id = "save";
    this.buttonLoad.id = "load";
    this.buttonResults.id = "results";
    this.buttonGodMode.id = "god-mode";
  },
  addSetAttribute: function () {
    // this.buttonGodMode.setAttribute("data-tooltip", "Двигай как хочешь");
  },
  addTextContentElement: function () {
    this.header_title.textContent = "Gem puzzle";
    this.buttonStop.textContent = "stop timer";
    this.buttonSave.textContent = "Save";
    this.buttonLoad.textContent = "Load";
    this.buttonResults.textContent = "Results";
    this.buttonStart.textContent = "Shuffle and start";
    this.buttonGodMode.textContent = "GodMode";
    this.moves.textContent = "Moves: ";
    this.time.textContent = "Time: ";
    this.size3.textContent = "3x3";
    this.size4.textContent = "4x4";
    this.size5.textContent = "5x5";
    this.size6.textContent = "6x6";
    this.size7.textContent = "7x7";
    this.size8.textContent = "8x8";
  },
};
