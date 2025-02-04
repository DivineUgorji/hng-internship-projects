const colorBox = document.getElementById("color-box");
const colorOptionsContainer = document.getElementById("color-options");
const roundDisplay = document.getElementById("round-display");
const scoreDisplay = document.getElementById("score-display");
const restartBtn = document.getElementById("restart-btn");
const gameOverModal = document.getElementById("game-over-modal");
const finalScoreDisplay = document.getElementById("final-score");
const playAgainBtn = document.getElementById("play-again");
const messageDisplay = document.getElementById("message-display");

const predefinedColors = [
  "rgb(255, 0, 0)",
  "rgb(0, 255, 0)",
  "rgb(0, 0, 255)",
  "rgb(255, 255, 0)",
  "rgb(255, 165, 0)",
  "rgb(128, 0, 128)",
  "rgb(0, 255, 255)",
  "rgb(255, 192, 203)",
  "rgb(139, 69, 19)",
  "rgb(128, 128, 128)",
  "rgb(0, 128, 0)",
  "rgb(75, 0, 130)",
  "rgb(255, 105, 180)",
  "rgb(173, 216, 230)",
  "rgb(255, 223, 186)",
  "rgb(0, 100, 0)",
  "rgb(220, 20, 60)",
  "rgb(105, 105, 105)",
  "rgb(30, 144, 255)",
  "rgb(47, 79, 79)",
];

let pickedColor, rounds, winScore, lossScore;

function generateShadesAndContrasts(baseColor) {
  const [r, g, b] = baseColor.match(/\d+/g).map(Number);
  let shades = [],
    contrasts = [];

  for (let i = 0; i < 3; i++) {
    let factor = i * 20;
    let newR = Math.min(255, Math.max(0, r + factor));
    let newG = Math.min(255, Math.max(0, g + factor));
    let newB = Math.min(255, Math.max(0, b + factor));
    shades.push(`rgb(${newR}, ${newG}, ${newB})`);
  }

  while (contrasts.length < 3) {
    let contrastColor =
      predefinedColors[Math.floor(Math.random() * predefinedColors.length)];
    if (contrastColor !== baseColor && !shades.includes(contrastColor)) {
      contrasts.push(contrastColor);
    }
  }

  return [...shades, ...contrasts];
}

function updateUI() {
  roundDisplay.textContent = `Round: ${rounds}/6`;
  scoreDisplay.textContent = `Score: ${winScore}`;
  //   | Losses: ${lossScore}
}

function startGame() {
  rounds = 1;
  winScore = 0;
  lossScore = 0;
  gameOverModal.classList.add("hidden");
  generateNewRound();
}

function generateNewRound() {
  if (rounds >= 6) {
    endGame();
    return;
  }

  pickedColor =
    predefinedColors[Math.floor(Math.random() * predefinedColors.length)];
  colorBox.style.background = pickedColor;

  let options = generateShadesAndContrasts(pickedColor);
  options.sort(() => Math.random() - 0.7);

  colorOptionsContainer.innerHTML = "";
  options.forEach((color) => {
    const colorBtn = document.createElement("div");
    colorBtn.classList.add("color-option");
    colorBtn.style.background = color;
    colorBtn.addEventListener("click", () => checkGuess(color, colorBtn));
    colorOptionsContainer.appendChild(colorBtn);
  });

  updateUI();
}

function checkGuess(selectedColor, element) {
  if (selectedColor === pickedColor) {
    element.style.transform = "scale(1.3)";
    winScore++;
    messageDisplay.textContent = "Yay! nice guess! 🎉";
    messageDisplay.style.color = "green";
  } else {
    element.style.opacity = "0.3";
    lossScore++;
    messageDisplay.textContent = "Wrong! Try again next round. 😔";
    messageDisplay.style.color = "crimson";
  }

  messageDisplay.style.opacity = "1";

  rounds++;

  setTimeout(() => {
    messageDisplay.style.opacity = "0";
    generateNewRound();
  }, 1000);
}

function endGame() {
  gameOverModal.classList.remove("hidden");
  gameOverModal.style.display = "block";
  finalScoreDisplay.textContent = `Wins: ${winScore}/6`;
}

playAgainBtn.addEventListener("click", () => {
  gameOverModal.style.display = "none";
  startGame();
});

restartBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", startGame);

startGame();
