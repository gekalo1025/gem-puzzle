import { settings } from "../pages/home/home";
import { startWatch } from "../pages/home/home";
export default function toggleStopTimer() {
  const stop = document.querySelector("#stop");
  const isContainsPaiseClass = stop.classList.toggle("pause");
  if (isContainsPaiseClass) {
    windows.clearInterval(settings.timer);
    stop.textContent = "start timer";
  } else {
    windows.clearInterval(settings.timer);
    stop.textContent = "stop timer";
    startWatch();
  }
}
