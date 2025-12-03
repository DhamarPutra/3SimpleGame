const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let bird = {
  x: 60,
  y: 250,
  w: 30,
  h: 30,
  dy: 0,
  gravity: 0.8,
  jump: -12,
};

let pipes = [];
let frame = 0;
let speed = 3;
let score = 0;

document.addEventListener("keydown", () => {
  bird.dy = bird.jump;
});

function spawnPipe() {
  let gap = 130;
  let topHeight = Math.floor(Math.random() * 250) + 50;

  pipes.push({
    x: 400,
    top: topHeight,
    bottom: topHeight + gap,
    w: 50,
  });
}

function update() {
  frame++;
  score++;

  // Speed scaling
  speed = 3 + Math.floor(score / 300);

  // Spawn pipes
  if (frame % 90 === 0) {
    spawnPipe();
  }

  // Bird physics
  bird.dy += bird.gravity;
  bird.y += bird.dy;

  // Collision with floor/ceiling
  if (bird.y + bird.h > 500 || bird.y < 0) {
    alert("Game Over! Score: " + score);
    document.location.reload();
  }

  // Pipe movement & collision
  pipes.forEach((p, i) => {
    p.x -= speed;

    if (p.x + p.w < 0) {
      pipes.splice(i, 1);
    }

    // Collision check
    if (
      bird.x < p.x + p.w &&
      bird.x + bird.w > p.x &&
      (bird.y < p.top || bird.y + bird.h > p.bottom)
    ) {
      gameOver();
    }
  });
}

function draw() {
  ctx.fillStyle = "#70c5ce";
  ctx.fillRect(0, 0, 400, 500);

  // Bird
  const birdPng = new Image();
  birdPng.src = "./bird.png";

  ctx.drawImage(birdPng, bird.x, bird.y, bird.w, bird.h);

  // Pipes
  ctx.fillStyle = "green";
  pipes.forEach((p) => {
    ctx.fillRect(p.x, 0, p.w, p.top);
    ctx.fillRect(p.x, p.bottom, p.w, 500 - p.bottom);
  });

  // Score
  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

function gameOver() {
  alert("Game Over!");
  window.location.href = "../";
}

loop();
