import "./style.css";


// import quackSound from "./quack.mp3";

// GLOBALS.
const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Ducky Clicker";
const header = document.createElement("h1");
const divText = document.createElement("div"); // Current quacks.
const quacksPS = document.createElement("div"); // Quacks per second.
quacksPS.innerHTML = "Quacks per second: 0";
// const leftcontainer = document.createElement("div");
const quackAudio = new Audio('./quack.mp3');

interface Item {
  name: string;
  price: number;
  increment: number;
  count: number;
  div: HTMLDivElement;
  button: HTMLButtonElement;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "AutoQuacker",
    price: 10,
    increment: 0.1,
    count: 0,
    div: document.createElement("div"),
    button: document.createElement("button"),
    description: "Handheld toy duck. Automatically quacks for you.",
  },
  {
    name: "Actual Duck",
    price: 100,
    increment: 2.0,
    count: 0,
    div: document.createElement("div"),
    button: document.createElement("button"),
    description: "Handheld to--- hey wait a second, this is a real duck!",
  },
  {
    name: "Robot Ducky Fog Horn",
    price: 1000,
    increment: 50.0,
    count: 0,
    div: document.createElement("div"),
    button: document.createElement("button"),
    description:
      "Quacks so loud it can be heard for miles. Can be scheduled to quack at 2AM every day. You monster.",
  },
  {
    name: "MegaMallard",
    price: 10000,
    increment: 1000.0,
    count: 0,
    div: document.createElement("div"),
    button: document.createElement("button"),
    description:
      "A giant duck that quacks so loud it can be heard from space. It's also a mallard, which is a type of duck.",
  },
  {
    name: "Ducktastrophe",
    price: 100000,
    increment: 20000.0,
    count: 0,
    div: document.createElement("div"),
    button: document.createElement("button"),
    description:
      "A singularity of quacks. The universe will never be the same.",
  },
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
app.append(quacksPS);

app.append(document.createElement("br"));
button.innerHTML = "🦆";
button.addEventListener("click", click_quack);
app.append(button);

function buyItem(item: Item) {
  if (quackCounter >= item.price) {
    quackCounter -= item.price;
    item.count++;
    item.price *= PRICE_INCREMENT;
    // update_status();
    ui_manager.updateItemStatus();
  }
}

for (const item of availableItems) {
  // const buyButton = document.createElement("button");
  app.append(document.createElement("br"));
  item.button.innerHTML = `Buy ${item.name}: ${item.price} quacks`;
  item.button.addEventListener("click", () => buyItem(item));
  app.append(item.button);
  const description = document.createElement("div");
  description.innerHTML = item.description;
  app.append(description);
  app.append(item.div);
}
class UIManager {
  private divText: HTMLDivElement;
  private quacksPS: HTMLDivElement;
  private items: Item[];

  constructor(divText: HTMLDivElement, quacksPS: HTMLDivElement, items: Item[]) {
    this.divText = divText;
    this.quacksPS = quacksPS;
    this.items = items;
  }

  updateQuackCount(count: number) {
    this.divText.innerHTML = `Quack! ${Math.floor(count)} quacks.`;
  }

  updateItemStatus() {
    for (const item of this.items) {
      item.div.innerHTML = `${item.name}s owned: ${item.count}`;
      item.button.innerHTML = `Buy ${item.name}: ${item.price} quacks`;
    }
  }

  updateQuacksPerSecond(increment: number) {
    this.quacksPS.innerHTML = `Quacks per second: ${increment.toFixed(2)}`;
  }
}
const ui_manager = new UIManager(divText, quacksPS, availableItems);
// function update_status() {
//   // truncate quackCounter to a whole integer
//   const rounded_down_quacks = Math.floor(quackCounter);
//   divText.innerHTML = `Quack! ${rounded_down_quacks} quacks.`;
//   for (const item of availableItems) {
//     item.div.innerHTML = `${item.name}s owned: ${item.count}`;
//     item.button.innerHTML = `Buy ${item.name}: ${item.price} quacks`;
//   }
//   let increment = 0;
//   for (const item of availableItems) {
//     increment += item.count * item.increment;
//   }
//   quacksPS.innerHTML = `Quacks per second: ${increment.toFixed(2)}`;
// }
function click_quack() {
  quackCounter++;
  // update_status();
  ui_manager.updateQuackCount(quackCounter);
  quackAudio.play();
}

// hover mouse over button to show description as floating text
// button.addEventListener("mouseover", () => {
//   const description = document.createElement("div");
//   description.innerHTML = "Click the duck!";
//   app.append(description);
// });

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

  // update_status();
  ui_manager.updateQuackCount(quackCounter);
  requestAnimationFrame(framebasedIncrement);
}

requestAnimationFrame(framebasedIncrement);
