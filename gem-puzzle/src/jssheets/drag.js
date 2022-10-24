export default function drag(event) {
  document.querySelector(".emptiness").style.zIndex = "10";
  event.dataTransfer.setData("name", event.target.attributes.name.nodeValue);
}
