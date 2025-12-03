const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let box = 20;
let snake = [{ x: 10 * box, y: 10 * box }];
let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box,
};
let dx = box;
let dy = 0;

document.addEventListener("keydown", direction);

function direction(e) {
  if (e.key === "ArrowUp" && dy === 0) {
    dx = 0;
    dy = -box;
  } else if (e.key === "ArrowDown" && dy === 0) {
    dx = 0;
    dy = box;
  } else if (e.key === "ArrowLeft" && dx === 0) {
    dx = -box;
    dy = 0;
  } else if (e.key === "ArrowRight" && dx === 0) {
    dx = box;
    dy = 0;
  }
}

function draw() {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, 400, 400);

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Draw snake
  ctx.fillStyle = "lime";
  for (let s of snake) {
    ctx.fillRect(s.x, s.y, box, box);
  }

  let head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy,
  };

  // Game over
  if (
    head.x < 0 ||
    head.x >= 400 ||
    head.y < 0 ||
    head.y >= 400 ||
    snake.some((s) => s.x === head.x && s.y === head.y)
  ) {
    gameOver();
  }

  // Eat food
  if (head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box,
    };
  } else {
    snake.pop();
  }

  snake.unshift(head);
}

function gameOver() {
  alert("Game Over!");
  window.location.href = "../";
}

setInterval(draw, 100);
