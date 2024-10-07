import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Super awesome amazing awesome game of awesomeness";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

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

const divtext = document.createElement("div");
divtext.innerHTML = "Click the duck!";
app.append(divtext);

let quackCounter: number = 0;

const button = document.createElement("button");
button.innerHTML = "🦆";
button.addEventListener("click", click_quack);
app.append(button);

// DEPRECATED. Use framebasedIncrement instead.
// setInterval(quack_interval, 1000);
let lastTime : number;
requestAnimationFrame(framebasedIncrement);