import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Super awesome amazing awesome game of awesomeness";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

function quack() {
  quackCounter++;
  divtext.innerHTML = `Quack! ${quackCounter} quacks.`;
}

const divtext = document.createElement("div");
divtext.innerHTML = "Click the duck!";
app.append(divtext);

let quackCounter : number = 0;

const button = document.createElement("button");
button.innerHTML = "🦆";
button.addEventListener("click", quack);
app.append(button);

