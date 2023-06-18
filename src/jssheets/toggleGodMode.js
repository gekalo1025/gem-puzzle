import { settings } from "../pages/home/home";
export default function toggleGodMode() {
  const godMode = document.querySelector("#god-mode");
  godMode.classList.toggle("active");

  if (godMode.classList.contains("active")) {
    settings.godMode = true;
  } else {
    settings.godMode = false;
  }
}
