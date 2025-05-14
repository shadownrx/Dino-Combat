// 🌍 Variables globales
let selectedCharacter = null;
let isJumping = false;
let score = 0;
let gameInterval = null;
let gameRunning = false;
let nederCoins = 0;

// 🎯 Referencias DOM
const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");
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
  jumpSound.pause(); // Precarga
}

// 🧍 Selección de personaje
function selectCharacter(src, name) {
  if (!src) return;
  selectedCharacter = src;
  Object.assign(dino.style, {
    backgroundImage: `url('${src}')`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    width: "80px",
    height: "80px"
  });

  showCharacterName(name); // 👈 Mostrar el nombre seleccionado
  startGame();
}


// ✨ Pantallas (transiciones)
function fadeIn(element) {
  element.style.opacity = 0;
  element.style.display = "flex";
  setTimeout(() => (element.style.opacity = 1), 10);
}

function fadeOut(element, callback) {
  element.style.opacity = 0;
  setTimeout(() => {
    element.style.display = "none";
    if (callback) callback();
  }, 300);
}

// 🔁 Inicio y reinicio de juego
function initGame() {
  score = 0;
  nederCoins = 0;  // Reinicia las monedas al iniciar el juego
  lastCoinScore = 0;  // Reinicia el puntaje de la última moneda
  gameRunning = true;
  obstacle.style.animation = "moveObstacle 2s linear infinite";
  scoreDisplay.textContent = "Puntaje: 0";
  document.getElementById("coins").textContent = `🪙 Neder Coins: ${nederCoins}`;

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

      // Incrementa monedas cada vez que el puntaje sea múltiplo de 50
      if (score - lastCoinScore >= 50) {
        nederCoins++;
        lastCoinScore = score;  // Actualiza el último puntaje para monedas
        document.getElementById("coins").textContent = `🪙 Neder Coins: ${nederCoins}`;
        showCoinEarned();
      }
    }
  }, 100);
}


function startGame() {
  startSound.currentTime = 0;
  startSound.play().catch(() => {});
  fadeOut(menu);
  fadeOut(characterSelect);
  fadeIn(gameScreen);
  initGame();
}

function retryGame() {
  fadeOut(gameOverScreen, () => {
    fadeIn(gameScreen);
    initGame();
  });
}

// ⛔ Game Over y Detención
function gameOver() {
  stopGame();
  shakeElement(dino);
  fadeOut(gameScreen, () => {
    finalScore.textContent = "Puntaje final: " + score;
    fadeIn(gameOverScreen);
  });
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

// 🎯 Combo decorativo
function showCombo() {
  const comboText = document.createElement("div");
  comboText.innerText = "¡Combo!";
  comboText.className = "combo";
  document.body.appendChild(comboText);
  setTimeout(() => comboText.remove(), 1000);
}

// 💥 Sacudida al dino
function shakeElement(el) {
  el.style.animation = "shake 0.5s";
  el.addEventListener("animationend", () => {
    el.style.animation = "";
  }, { once: true });
}

// 📺 Pantallas
function showCharacterSelect() {
  fadeOut(menu, () => fadeIn(characterSelect));
}

function backToMenu() {
  fadeOut(characterSelect, () => fadeIn(menu));
}


// 🎮 Controles
document.addEventListener("keydown", (event) => {
  if (["Space", " ", "ArrowUp"].includes(event.code || event.key)) {
    jump();
  }
});

document.addEventListener("touchstart", jump);

// 🎵 Música de fondo
function returnToMenuFromGameOver() {
  stopGame();
  bgm.pause();
  bgm.currentTime = 0;
  startSound.pause();
  startSound.currentTime = 0;
  fadeOut(gameOverScreen, () => fadeIn(menu));
  scoreDisplay.textContent = "Puntaje: 0";
}

function showCharacterName(name) {
  const nameBanner = document.createElement("div");
  nameBanner.innerText = `¡Has elegido a ${name}!`;
  nameBanner.className = "character-name-banner";
  document.body.appendChild(nameBanner);
  setTimeout(() => nameBanner.remove(), 2000);
}

function showCoinEarned() {
  const coinMsg = document.createElement("div");
  coinMsg.className = "coin-earned";
  coinMsg.innerText = "+1 Neder Coin!";
  document.body.appendChild(coinMsg);
  setTimeout(() => coinMsg.remove(), 1000);  // El mensaje desaparece después de 1 segundo
  console.log("Moneda ganada!"); // Verifica si la función se ejecuta
}
