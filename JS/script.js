let selectedCharacter = "img/auto1.png";
let score = 0;
let isJumping = false;

function showCharacterSelect() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("character-select").style.display = "block";
}

function backToMenu() {
  document.getElementById("character-select").style.display = "none";
  document.getElementById("menu").style.display = "block";
}

function selectCharacter(imageSrc) {
  selectedCharacter = imageSrc;
  document.getElementById("preview-image").src = imageSrc; // <-- Actualiza vista previa
  alert("Seleccionaste tu personaje.");
}


function startGame() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("character-select").style.display = "none";
  document.getElementById("game").style.display = "block";

  const dino = document.getElementById("dino");
  dino.style.backgroundImage = `url('${selectedCharacter}')`;

  // Comienza la detección de colisiones
  gameLoop();
}

function playMusic() {
  const music = document.getElementById("bgm");
  music.play();
}

// SALTO
document.addEventListener("keydown", function (e) {
  if (e.code === "Space") jump();
});

document.addEventListener("touchstart", jump);

function jump() {
  const dino = document.getElementById("dino");
  if (!isJumping) {
    isJumping = true;
    dino.classList.add("jump");
    setTimeout(() => {
      dino.classList.remove("jump");
      isJumping = false;
    }, 400);
  }
}

// GAME LOOP Y COLISIONES
function gameLoop() {
  const dino = document.getElementById("dino");
  const obstacle = document.getElementById("obstacle");
  const scoreDisplay = document.getElementById("score");

  gameInterval = setInterval(() => {
    const dinoRect = dino.getBoundingClientRect();
    const obsRect = obstacle.getBoundingClientRect();

    if (
      dinoRect.right > obsRect.left &&
      dinoRect.left < obsRect.right &&
      dinoRect.bottom > obsRect.top
    ) {
      alert("💥 ¡Game Over! Puntaje: " + score);
      score = 0;
    } else {
      score++;
      scoreDisplay.textContent = "Puntaje: " + score;
    }
  }, 100);
}


let gameInterval = null; // Guardamos la referencia para detenerlo

function returnToMenu() {
  clearInterval(gameInterval); // Detenemos el loop del juego
  score = 0;
  document.getElementById("game").style.display = "none";
  document.getElementById("menu").style.display = "block";
  document.getElementById("score").textContent = "Puntaje: 0";

  // Reiniciar posiciones o animaciones si es necesario
}

function goToMusic() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("music-screen").style.display = "block";
}

document.getElementById("music-selector").addEventListener("change", function () {
  const url = this.value;

  if (url === "none") {
    document.getElementById("music-player").innerHTML = "";
    return;
  }

  document.getElementById("music-player").innerHTML = `
    <iframe src="${url}" allow="autoplay" allowfullscreen></iframe>
  `;
});

const musicPlayer = document.getElementById("bg-music");
const fileInput = document.getElementById("music-upload");

fileInput.addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    const url = URL.createObjectURL(file);
    musicPlayer.src = url;
    musicPlayer.play();
  }
});
