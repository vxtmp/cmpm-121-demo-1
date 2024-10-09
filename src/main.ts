import "./style.css";


// Globals.
const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Super awesome amazing awesome game of awesomeness";
const header = document.createElement("h1");
const divtext = document.createElement("div");
const button = document.createElement("button"); // first button. click to quack.
const buyQuackerButton = document.createElement("button"); // second button. buy quacker.
let quackCounter: number = 0;
let lastTime: number;
let auto_increment_by_one_times: number = 0;

// Initialize UI elements.
document.title = gameName;
header.innerHTML = gameName;
app.append(header);
divtext.innerHTML = "Click the duck!";
app.append(divtext);
button.innerHTML = "🦆";
button.addEventListener("click", click_quack);
app.append(button);
buyQuackerButton.innerHTML = "Buy AutoQuacker: 10 quacks";
buyQuackerButton.addEventListener("click", buy_one_quacker);
app.append(buyQuackerButton);

function click_quack() {
  quackCounter++;
  divtext.innerHTML = `Quack! ${quackCounter} quacks.`;
  // sound effect quack
  // const audio = new Audio("quack.mp3");
}

function buy_one_quacker(){
    if (quackCounter >= 10){
        quackCounter -= 10;
        auto_increment_by_one_times++;
        divtext.innerHTML = `Quack! ${quackCounter} quacks.`;
    }
}

function framebasedIncrement(timestamp: number) {
  const deltaSeconds = (timestamp - (lastTime ?? timestamp)) / 1000;
  lastTime = timestamp;
  quackCounter += auto_increment_by_one_times * deltaSeconds;

  divtext.innerHTML = `Quack! ${quackCounter} quacks.`;
  requestAnimationFrame(framebasedIncrement);
}

requestAnimationFrame(framebasedIncrement);
