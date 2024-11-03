import "./style.css";

// import quackSound from "./quack.mp3";

// GLOBALS.
const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Ducky Clicker";
const header = document.createElement("h1");
const leftcontainer = document.createElement("div");
const rightcontainer = document.createElement("div");
const divText = document.createElement("div"); // Current quacks.
const quacksPS = document.createElement("div"); // Quacks per second.
quacksPS.innerHTML = "Quacks per second: 0";
// const leftcontainer = document.createElement("div");
const quackAudio = new Audio("./quack.mp3");

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

function buyItem(item: Item) {
  if (quackCounter >= item.price) {
    quackCounter -= item.price;
    item.count++;
    item.price *= PRICE_INCREMENT;
    // update_status();
    ui_manager.updateItemStatus();
    ui_manager.updateQuacksPerSecond();
  }
}

class UIManager {
  private quackCountDivText: HTMLDivElement;
  private quacksPerSecond: HTMLDivElement;
  private items: Item[];

  constructor(
    quackCountDivText: HTMLDivElement,
    quacksPS: HTMLDivElement,
    items: Item[],
  ) {
    this.quackCountDivText = quackCountDivText;
    this.quacksPerSecond = quacksPS;
    this.items = items;
  }

  updateQuackCount(count: number) {
    this.quackCountDivText.innerHTML = `Quack! ${count.toFixed(2)} quacks.`;
  }

  updateItemStatus() {
    for (const item of this.items) {
      item.div.innerHTML = `${item.name}s owned: ${item.count}`;
      item.button.innerHTML = `Buy ${item.name}: ${item.price} quacks`;
    }
  }

  updateQuacksPerSecond() {
    const inc = calculateIncrement();
    this.quacksPerSecond.innerHTML = `Quacks per second: ${inc.toFixed(2)}`;
  }
}
const ui_manager = new UIManager(divText, quacksPS, availableItems);
function manualQuackerClicked() {
  quackCounter++;
  // update_status();
  ui_manager.updateQuackCount(quackCounter);
  quackAudio.play();
}

function updateQuacksByDeltaTime(timestamp: number) {
  const deltaSeconds = calculateDeltaSeconds(timestamp);
  const increment = calculateIncrement();
  updateQuackCounter(increment, deltaSeconds);
  requestAnimationFrame(updateQuacksByDeltaTime);
}

function calculateDeltaSeconds(timestamp: number): number {
  const deltaSeconds = (timestamp - (lastTime ?? timestamp)) / 1000;
  lastTime = timestamp;
  return deltaSeconds;
}

function calculateIncrement(): number {
  let increment = 0;
  for (const item of availableItems) {
    increment += item.count * item.increment;
  }
  return increment;
}

function updateQuackCounter(increment: number, deltaSeconds: number) {
  quackCounter += increment * deltaSeconds;
  ui_manager.updateQuackCount(quackCounter);
}

function mainInit() {
  // Initialize UI elements.
  document.title = gameName;
  header.innerHTML = gameName;

  app.style.display = "flex";
  app.style.width = "100%";
  app.style.height = "100%";
  // app.style.justifyContent = "center";
  // app.style.alignItems = "center";
  // app.style.flexDirection = "column";
  app.style.backgroundColor = "#f0f0f0";

  // make a div container that will align left
  // init the leftcontainer

  leftcontainer.style.float = "left";
  leftcontainer.style.width = "50%";
  app.append(leftcontainer);

  rightcontainer.style.float = "right";
  rightcontainer.style.width = "50%";
  app.append(rightcontainer);

  leftcontainer.append(header);

  quacksPS.style.position = "fixed";
  quacksPS.style.top = "0";
  quacksPS.style.right = "0";
  quacksPS.style.padding = "10px";
  quacksPS.style.backgroundColor = "#333";
  quacksPS.style.color = "white";
  quacksPS.style.fontSize = "1.2em";
  quacksPS.style.zIndex = "1000";
  app.append(quacksPS);

  /*
ADDING MAIN QUACK CLICKER BUTTON.
*/
  leftcontainer.append(document.createElement("br"));
  button.innerHTML = "🦆";
  button.addEventListener("click", manualQuackerClicked);
  // make this button REALLY big
  button.style.fontSize = "5em";
  button.style.width = "60%";
  button.style.height = "60%";
  leftcontainer.append(button);

  
  divText.innerHTML = "Click the duck!"; // Prompt and quack counter.
  leftcontainer.append(divText);

  /*
ADDING ITEMS, BUTTONS, EVENT CLICKERS
*/
  for (const item of availableItems) {
    // const buyButton = document.createElement("button");
    rightcontainer.append(document.createElement("br"));
    item.button.innerHTML = `Buy ${item.name}: ${item.price} quacks`;
    item.button.addEventListener("click", () => buyItem(item));
    rightcontainer.append(item.button);
    const description = document.createElement("div");
    description.innerHTML = item.description;
    rightcontainer.append(description);
    rightcontainer.append(item.div);
  }

  requestAnimationFrame(updateQuacksByDeltaTime);
}

mainInit();
