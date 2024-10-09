import "./style.css";

// GLOBALS.
const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Super awesome amazing awesome game of awesomeness";
const header = document.createElement("h1");
const divtext = document.createElement("div"); // Current quacks.
const lv1text = document.createElement("div"); // Current lv1 quackers.
const lv2text = document.createElement("div"); // Current lv2 quackers.
const lv3text = document.createElement("div"); // Current lv3 quackers.

// buttons.
const button = document.createElement("button"); // first button. click to quack.
const buyLv1QuackerButton = document.createElement("button"); // second button. buy quacker.
const buyLv2QuackerButton = document.createElement("button"); // third button. buy l2 quacker.
const buyLv3QuackerButton = document.createElement("button"); // fourth button. buy l3 quacker.
const LV1_INCREMENT = 0.1;
const LV2_INCREMENT = 2.0;
const LV3_INCREMENT = 50.0;
let lv1_price = 10;
let lv2_price = 100;
let lv3_price = 1000;
const PRICE_INCREMENT = 1.15;
let quackCounter: number = 0;
let lv1Counter: number = 0;
let lv2Counter: number = 0;
let lv3Counter: number = 0;
let lastTime: number;
// let auto_quacker_coefficient: number = 0;

// Initialize UI elements.
document.title = gameName;
header.innerHTML = gameName;
app.append(header);
divtext.innerHTML = "Click the duck!"; // Prompt and quack counter.
app.append(divtext);
// append a new line using typescript
app.append(document.createElement("br"));
button.innerHTML = "🦆";
button.addEventListener("click", click_quack);
app.append(button);

app.append(document.createElement("br"));
buyLv1QuackerButton.innerHTML = `Buy AutoQuacker: ${lv1_price} quacks`;
buyLv1QuackerButton.addEventListener("click", buy_one_quacker);
app.append(buyLv1QuackerButton);
app.append(lv1text);

app.append(document.createElement("br"));
buyLv2QuackerButton.innerHTML = `Buy Lv2 AutoQuacker: ${lv2_price} quacks`;
buyLv2QuackerButton.addEventListener("click", buy_two_quacker);
app.append(buyLv2QuackerButton);
app.append(lv2text);

app.append(document.createElement("br"));
buyLv3QuackerButton.innerHTML = `Buy Lv3 AutoQuacker: ${lv3_price} quacks`;
buyLv3QuackerButton.addEventListener("click", buy_three_quacker);
app.append(buyLv3QuackerButton);
app.append(lv3text);

function update_status() {
  // truncate quackCounter to a whole integer
  const rounded_down_quacks = Math.floor(quackCounter);
  divtext.innerHTML = `Quack! ${rounded_down_quacks} quacks.`;
  lv1text.innerHTML = `Lv1 Quackers: ${lv1Counter}`;
  lv2text.innerHTML = `Lv2 Quackers: ${lv2Counter}`;
  lv3text.innerHTML = `Lv3 Quackers: ${lv3Counter}`;
  buyLv1QuackerButton.innerHTML = `Buy AutoQuacker: ${lv1_price} quacks`;
  buyLv2QuackerButton.innerHTML = `Buy Lv2 AutoQuacker: ${lv2_price} quacks`;
  buyLv3QuackerButton.innerHTML = `Buy Lv3 AutoQuacker: ${lv3_price} quacks`;

}

function click_quack() {
  quackCounter++;
  //   divtext.innerHTML = `Quack! ${quackCounter} quacks.
  update_status();
  // sound effect quack
  // const audio = new Audio("quack.mp3");
}

function buy_one_quacker() {
  if (quackCounter >= lv1_price) {
    quackCounter -= lv1_price;
    // auto_quacker_coefficient += LV1_INCREMENT;
    lv1Counter++;
    lv1_price *= PRICE_INCREMENT;
    update_status();
  }
}

function buy_two_quacker() {
  if (quackCounter >= lv2_price) {
    quackCounter -= lv2_price;
    // auto_quacker_coefficient += LV2_INCREMENT;
    lv2Counter++;
    lv2_price *= PRICE_INCREMENT;
    update_status();
  }
}

function buy_three_quacker() {
  if (quackCounter >= lv3_price) {
    quackCounter -= lv3_price;
    // auto_quacker_coefficient += LV3_INCREMENT;
    lv3Counter++;
    lv3_price *= PRICE_INCREMENT;
    update_status();
  }
}

function framebasedIncrement(timestamp: number) {
  const deltaSeconds = (timestamp - (lastTime ?? timestamp)) / 1000;
  lastTime = timestamp;
  // quackCounter += auto_quacker_coefficient * deltaSeconds;
  const increment =
    lv1Counter * LV1_INCREMENT +
    lv2Counter * LV2_INCREMENT +
    lv3Counter * LV3_INCREMENT;
  quackCounter += increment * deltaSeconds;

  update_status();
  requestAnimationFrame(framebasedIncrement);
}

requestAnimationFrame(framebasedIncrement);
