// Variables globales
let selectedCharacter = null;
let isJumping = false;
let score = 0;
let gameInterval = null;
let gameRunning = false;

// Referencias
const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");
const bgm = document.getElementById("bgm");

// 🎵 Reproducir música
function playMusic() {
  bgm.play();
}

// 📍 Navegación de pantallas
function showCharacterSelect() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("character-select").style.display = "block";
}

function backToMenu() {
  document.getElementById("character-select").style.display = "none";
  document.getElementById("menu").style.display = "block";
}

function returnToMenu() {
  stopGame();
  document.getElementById("game").style.display = "none";
  document.getElementById("menu").style.display = "block";
  scoreDisplay.textContent = "Puntaje: 0";
}

// 🧍 Selección de personaje
function selectCharacter(src) {
  selectedCharacter = src;
  dino.style.backgroundImage = `url('${selectedCharacter}')`;
  dino.style.backgroundSize = "contain";
  dino.style.backgroundRepeat = "no-repeat";
  dino.style.width = "80px";
  dino.style.height = "80px";
  startGame();
}

// 🚀 Iniciar juego
function startGame() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("character-select").style.display = "none";
  document.getElementById("game").style.display = "block";
  obstacle.style.animation = "moveObstacle 2s linear infinite";
  score = 0;
  gameRunning = true;

  gameInterval = setInterval(() => {
    const dinoRect = dino.getBoundingClientRect();
    const obsRect = obstacle.getBoundingClientRect();

    if (
      dinoRect.right > obsRect.left &&
      dinoRect.left < obsRect.right &&
      dinoRect.bottom > obsRect.top
    ) {
      gameOver();
    } else if (gameRunning) {
      score++;
      scoreDisplay.textContent = "Puntaje: " + score;
    }
  }, 100);
}

// ❌ Game Over
function gameOver() {
  stopGame();
  document.getElementById("game").style.display = "none";
  const gameOverScreen = document.getElementById("game-over-screen");
  gameOverScreen.style.display = "flex";
  document.getElementById("final-score").textContent = "Puntaje final: " + score;
}

// 🛑 Detener juego
function stopGame() {
  clearInterval(gameInterval);
  obstacle.style.animation = "none";
  gameRunning = false;
}

// ⬆️ Salto con voltereta
function jump() {
  if (!isJumping && gameRunning) {
    dino.classList.add("jump");
    isJumping = true;
    setTimeout(() => {
      dino.classList.remove("jump");
      isJumping = false;
    }, 600);
  }
}

function retryGame() {
  document.getElementById("game-over-screen").style.display = "none";
  document.getElementById("game").style.display = "block";
  obstacle.style.animation = "moveObstacle 2s linear infinite";
  score = 0;
  scoreDisplay.textContent = "Puntaje: 0";
  gameRunning = true;

  gameInterval = setInterval(() => {
    const dinoRect = dino.getBoundingClientRect();
    const obsRect = obstacle.getBoundingClientRect();

    if (
      dinoRect.right > obsRect.left &&
      dinoRect.left < obsRect.right &&
      dinoRect.bottom > obsRect.top
    ) {
      gameOver();
    } else {
      score++;
      scoreDisplay.textContent = "Puntaje: " + score;
    }
  }, 100);
}

function returnToMenuFromGameOver() {
  stopGame();
  document.getElementById("game-over-screen").style.display = "none";
  document.getElementById("menu").style.display = "block";
  scoreDisplay.textContent = "Puntaje: 0";
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Space" || event.key === " " || event.key === "ArrowUp") {
    jump();
  }
});

document.addEventListener("touchstart", jump);
