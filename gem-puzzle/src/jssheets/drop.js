import replacementTilesForDrop from "./replacementTilesForDrop";

export default function drop(event) {
  if (event.target.classList.contains("emptiness")) {
    let itemNameValue = document.getElementsByName(
      event.dataTransfer.getData("name")
    )[0];

    replacementTilesForDrop(itemNameValue);
  }
}
