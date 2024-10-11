import "./style.css";
// import quackSound from "./quack.mp3";

// GLOBALS.
const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Ducky Clicker";
const header = document.createElement("h1");
const divText = document.createElement("div"); // Current quacks.
// const quackAudio = new Audio(quackSound);

interface Item {
    name: string;
    price: number;
    increment: number;
    count: number;
    div: HTMLDivElement;
    button: HTMLButtonElement;
}

const availableItems : Item[] = [
    {name: "AutoQuacker", price: 10, increment: 0.1, count: 0, div: document.createElement("div"), button: document.createElement("button")},
    {name: "Lv2 AutoQuacker", price: 100, increment: 2.0, count: 0, div: document.createElement("div"), button: document.createElement("button")},  
    {name: "Lv3 AutoQuacker", price: 1000, increment: 50.0, count: 0, div: document.createElement("div"), button: document.createElement("button")} 
];

const button = document.createElement("button"); // main button. click to quack.
const PRICE_INCREMENT = 1.15; // price increase factor
let quackCounter: number = 0; // current quacks owned.
let lastTime: number;

// Initialize UI elements.
document.title = gameName;
header.innerHTML = gameName;
app.append(header);
divText.innerHTML = "Click the duck!"; // Prompt and quack counter.
app.append(divText);

app.append(document.createElement("br"));
button.innerHTML = "🦆";
button.addEventListener("click", click_quack);
app.append(button);

function buyItem (item: Item) {
    if (quackCounter >= item.price) {
        quackCounter -= item.price;
        item.count++;
        item.price *= PRICE_INCREMENT;
        update_status();
    }
}

for (const item of availableItems) {
    // const buyButton = document.createElement("button");
    app.append(document.createElement("br"));
    item.button.innerHTML = `Buy ${item.name}: ${item.price} quacks`;
    item.button.addEventListener("click", () => buyItem(item));
    app.append(item.button);
    app.append(item.div);
}

function update_status() {
  // truncate quackCounter to a whole integer
  const rounded_down_quacks = Math.floor(quackCounter);
  divText.innerHTML = `Quack! ${rounded_down_quacks} quacks.`;
  for (const item of availableItems) {
        item.div.innerHTML = `${item.name}s owned: ${item.count}`;
        item.button.innerHTML = `Buy ${item.name}: ${item.price} quacks`;
  }
}

function click_quack() {
  quackCounter++;
  update_status();
    // quackAudio.play();
}

function framebasedIncrement(timestamp: number) {
  const deltaSeconds = (timestamp - (lastTime ?? timestamp)) / 1000;
  lastTime = timestamp;
  // quackCounter += auto_quacker_coefficient * deltaSeconds;
  let increment = 0;
  for (const item of availableItems) {
        increment += item.count * item.increment;
  }
    // lv1Counter * LV1_INCREMENT +
    // lv2Counter * LV2_INCREMENT +
    // lv3Counter * LV3_INCREMENT;
  quackCounter += increment * deltaSeconds;

  update_status();
  requestAnimationFrame(framebasedIncrement);
}

requestAnimationFrame(framebasedIncrement);
