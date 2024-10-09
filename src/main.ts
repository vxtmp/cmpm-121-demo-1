import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Super awesome amazing awesome game of awesomeness";
const header = document.createElement("h1");
const divtext = document.createElement("div");
const button = document.createElement("button");
let quackCounter: number = 0;
let lastTime: number;

document.title = gameName;
header.innerHTML = gameName;
app.append(header);

divtext.innerHTML = "Click the duck!";
app.append(divtext);
button.innerHTML = "🦆";
button.addEventListener("click", click_quack);
app.append(button);

function click_quack() {
  quackCounter++;
  divtext.innerHTML = `Quack! ${quackCounter} quacks.`;
  // sound effect quack
  // const audio = new Audio("quack.mp3");
}

// DEPRECATED. Use framebasedIncrement instead.
// function quack_interval() {
//   quackCounter++;
//   divtext.innerHTML = `Quack! ${quackCounter} quacks.`;
// }

function framebasedIncrement(timestamp: number) {
  const deltaTime = timestamp - (lastTime ?? timestamp);
  lastTime = timestamp;

  quackCounter += deltaTime / 1000;
  divtext.innerHTML = `Quack! ${quackCounter} quacks.`;
  requestAnimationFrame(framebasedIncrement);
}


// DEPRECATED. Use framebasedIncrement instead.
// setInterval(quack_interval, 1000);
requestAnimationFrame(framebasedIncrement);
