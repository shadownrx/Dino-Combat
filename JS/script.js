// 🌍 Variables globales
let selectedCharacter = null;
let isJumping = false;
let score = 0;
let gameInterval = null;
let gameRunning = false;

// 🎯 Referencias DOM
const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");
const bgm = document.getElementById("bgm");
const jumpSound = document.getElementById("jumpSound");
const startSound = document.getElementById("startSound");
const menu = document.getElementById("menu");
const characterSelect = document.getElementById("character-select");
const gameScreen = document.getElementById("game");
const gameOverScreen = document.getElementById("game-over-screen");
const finalScore = document.getElementById("final-score");

// 🎵 Música
function playMusic() {
  bgm.play();
  jumpSound.play();
  jumpSound.pause(); // Pre-carga para evitar delay
}

// 🧍 Selección de personaje
function selectCharacter(src) {
  selectedCharacter = src;
  Object.assign(dino.style, {
    backgroundImage: `url('${src}')`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    width: "80px",
    height: "80px"
  });
  startGame();
}

// 🔁 Inicio y reinicio de juego
function initGame() {
  score = 0;
  gameRunning = true;
  obstacle.style.animation = "moveObstacle 2s linear infinite";
  scoreDisplay.textContent = "Puntaje: 0";

  clearInterval(gameInterval);
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

function startGame() {
  startSound.currentTime = 0;
  startSound.play().catch(() => {});
  menu.style.display = "none";
  characterSelect.style.display = "none";
  gameScreen.style.display = "block";
  initGame();
}

function retryGame() {
  gameOverScreen.style.display = "none";
  gameScreen.style.display = "block";
  initGame();
}

// ⛔ Game Over y Detención
function gameOver() {
  stopGame();
  gameScreen.style.display = "none";
  gameOverScreen.style.display = "flex";
  finalScore.textContent = "Puntaje final: " + score;
}

function stopGame() {
  clearInterval(gameInterval);
  obstacle.style.animation = "none";
  gameRunning = false;
}

// ⬆️ Salto
function jump() {
  if (!isJumping && gameRunning) {
    jumpSound.currentTime = 0;
    jumpSound.play();
    dino.classList.add("jump");
    isJumping = true;
    setTimeout(() => {
      dino.classList.remove("jump");
      isJumping = false;
    }, 600);
  }
}

// 📺 Pantallas
function showCharacterSelect() {
  menu.style.display = "none";
  characterSelect.style.display = "block";
}

function backToMenu() {
  characterSelect.style.display = "none";
  menu.style.display = "block";
}

// 🔙 Volver al menú

function returnToMenu() {
  stopGame();
  startSound.pause();           // 🔇 Pausa la música
  startSound.currentTime = 0;   // ⏮️ Opcional: reinicia desde el inicio
  gameScreen.style.display = "none";
  gameOverScreen.style.display = "none";
  menu.style.display = "block";
  scoreDisplay.textContent = "Puntaje: 0";
}

// 🎯 Combo (decorativo)
function showCombo() {
  const comboText = document.createElement("div");
  comboText.innerText = "¡Combo!";
  comboText.className = "combo";
  document.body.appendChild(comboText);
  setTimeout(() => comboText.remove(), 1000);
}

// 🎮 Controles
document.addEventListener("keydown", (event) => {
  if (["Space", " ", "ArrowUp"].includes(event.code || event.key)) {
    jump();
  }
});

document.addEventListener("touchstart", jump);

function returnToMenuFromGameOver() {
  stopGame();
  document.getElementById("game-over-screen").style.display = "none";
  document.getElementById("menu").style.display = "block";
  scoreDisplay.textContent = "Puntaje: 0";
}


