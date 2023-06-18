export const myGameArea = {
  canvas: document.createElement("div"),
  movesCounter: 0,
  start: function () {
    this.canvas.classList.add("canvas");
    document.body.insertBefore(this.canvas, document.body.childNodes[1]);
  },
};
