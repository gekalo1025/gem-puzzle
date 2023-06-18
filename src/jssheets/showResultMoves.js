import sortResultMoves from "./sortResultMoves";

export default function showResultMoves() {
  let sortResult = sortResultMoves();
  const results = document.querySelector("#results");
  if (sortResult.length === 0) {
    results.setAttribute("data-tooltip", `No results yet`);
  } else {
    let topTenResult = sortResult.slice(0, 11);
    let tooltip = "";
    for (let i = 0; i < topTenResult.length; i++) {
      tooltip += `   ${i + 1}. ` + topTenResult[i];
    }
    results.setAttribute("data-tooltip", `${tooltip}`);
  }
}
