const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");
let score = 0;
let isJumping = false;

// Función de salto
function jump() {
  if (!isJumping) {
    dino.classList.add("jump");
    isJumping = true;
    setTimeout(() => {
      dino.classList.remove("jump");
      isJumping = false;
    }, 400);
  }
}

// Control con barra espaciadora o pantalla táctil
document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    jump(600);
  }
});

document.addEventListener("touchstart", jump);

// Verificación de colisión con bounding boxes
const checkCollision = setInterval(() => {
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


function playMusic() {
  const musicContainer = document.getElementById("music-container");

  if (!document.getElementById("ytplayer")) {
    const player = document.createElement("iframe");
    iframe.id = "ytplayer";
    iframe.src = "https://youtu.be/BxsNnUAyfd4";
    iframe.width = "0";
    iframe.height = "0";
    iframe.frameBorder = "0";
    iframe.allow = "autoplay";
    musicContainer.appendChild(iframe);
  }
}