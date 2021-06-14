const $start = document.querySelector("#start");
const $game = document.querySelector("#game");
const $time = document.querySelector("#time");
let $timeHeader = document.querySelector("#time-header");
let $resultHeader = document.querySelector("#result-header");
let $result = document.querySelector("#result");
let $gameTime = document.querySelector("#game-time");
let isGameStarted = false;
let score = 0;
function RandomColor() {
  let x = Math.round(0xffffff * Math.random()).toString(16);
  let y = 6 - x.length;
  let z = "000000";
  let z1 = z.substring(0, y);
  let color = "#" + z1 + x;
  return color;
}
function renderBox() {
  $game.innerHTML = "";
  let box = document.createElement("div");
  let boxSize = getRandom(30, 100);
  let gameSize = $game.getBoundingClientRect();
  let maxTop = gameSize.height - boxSize;
  let maxLeft = gameSize.width - boxSize;
  box.style.height = box.style.width = boxSize + "px";
  box.style.position = "absolute";
  box.style.backgroundColor = RandomColor();
  box.style.top = getRandom(0, maxTop) + "px";
  box.style.left = getRandom(0, maxLeft) + "px";
  box.style.cursor = "pointer";
  box.setAttribute("data-box", "true");
  $game.insertAdjacentElement("afterbegin", box);
  return box;
}
$start.addEventListener("click", startGame);
$game.addEventListener("click", handleBoxClick);
$gameTime.addEventListener("input", setGameTime);

function startGame() {
  setGameTime();
  score = 0;
  $gameTime.setAttribute("disabled", true);
  $timeHeader.classList.remove("hide");
  $resultHeader.classList.add("hide");
  isGameStarted = true;
  $game.style.backgroundColor = "#fff";
  $start.classList.add("hide");
  var interval = setInterval(function () {
    let time = parseFloat($time.textContent);
    if (time <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);
  renderBox();
}
function setGameScore() {
  $result.textContent = score.toString();
}
function setGameTime() {
  let time = +$gameTime.value;
  $time.textContent = time.toFixed(1);
}
function endGame() {
  isGameStarted = false;
  setGameScore();
  $gameTime.removeAttribute("disabled");
  $start.classList.remove("hide");
  $game.style.backgroundColor = "#ccc";
  $game.innerHTML = "";
  $timeHeader.classList.add("hide");
  $resultHeader.classList.remove("hide");
}
function handleBoxClick(event) {
  if (isGameStarted) {
    if (event.target.dataset.box) {
      score++;
      console.log(score);
      renderBox();
    }
  } else {
    return;
  }
}
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
