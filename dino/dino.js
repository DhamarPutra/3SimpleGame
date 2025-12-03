const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let dino = {
  x: 50,
  y: 150,
  w: 40,
  h: 40,
  dy: 0,
  gravity: 1.2,
  jumpForce: -18,
  onGround: true,
};

let obstacles = [];
let frame = 0;
let speed = 6;
let score = 0;

document.addEventListener("keydown", () => {
  if (dino.onGround) {
    dino.dy = dino.jumpForce;
    dino.onGround = false;
  }
});

function spawnObstacle() {
  obstacles.push({
    x: 600,
    y: 150,
    w: 20,
    h: 40,
  });
}

function update() {
  frame++;
  score++;

  // Spawn obstacle
  if (frame % 90 === 0) {
    spawnObstacle();
  }

  // Speed scaling
  speed = 6 + Math.floor(score / 200);

  // Dino physics
  dino.dy += dino.gravity;
  dino.y += dino.dy;

  if (dino.y > 150) {
    dino.y = 150;
    dino.dy = 0;
    dino.onGround = true;
  }

  // Move obstacles
  obstacles.forEach((o, i) => {
    o.x -= speed;

    // Remove off-screen
    if (o.x + o.w < 0) {
      obstacles.splice(i, 1);
    }

    // Collision
    if (
      dino.x < o.x + o.w &&
      dino.x + dino.w > o.x &&
      dino.y < o.y + o.h &&
      dino.y + dino.h > o.y
    ) {
      gameOver();
    }
  });
}

function draw() {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, 600, 200);

  // Draw dino
  const dinoPng = new Image();
  dinoPng.src = "./dino.png";

  ctx.drawImage(dinoPng, dino.x, dino.y, dino.w, dino.h);

  // Draw obstacles
  const obstaclePng = new Image();
  obstaclePng.src = "./obstacle.png";
  obstacles.forEach((o) => {
    ctx.drawImage(obstaclePng, o.x, o.y, o.w, o.h);
  });

  // Draw score
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 450, 30);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

function gameOver() {
  alert("Game Over!");
  window.location.href = "../";
}

gameLoop();
