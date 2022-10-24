import { audio } from "../pages/home/home";
export default function toggleMute() {
  const sound = document.querySelector(".sound");
  sound.classList.toggle("mute");

  if (sound.classList.contains("mute")) {
    audio.volume = 0;
  } else {
    audio.volume = 0.2;
  }
}
