const snakeboard = document.getElementById("gameCanvas");
const snakeboard_ctx = gameCanvas.getContext("2d");
document.addEventListener("keydown", direction);

let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 },
];

let score = 0;
let dx = 10;
let dy = 0;
let changeDir = false;
let food_x;
let food_y;

game();
generateFood();

function game() {
  if (endGame()) return;
  changeDir = false;
  setTimeout(function onTick() {
    clearCanvas();
    drawFood();
    advanceSnake();
    drawSnake();
    game();
  }, 100);
}
function clearCanvas() {
  snakeboard_ctx.fillStyle = "green";
  snakeboard_ctx.strokestyle = "red";
  snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
  snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

function drawFood() {
  snakeboard_ctx.fillStyle = "yellow";
  snakeboard_ctx.strokestyle = "blue";
  snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
  snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
}

function drawSnakePart(snakePart) {
  snakeboard_ctx.fillStyle = "red";
  snakeboard_ctx.strokestyle = "darkblue";
  snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function endGame() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > snakeboard.width - 10;
  const hitTopWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > snakeboard.height - 10;
  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

function randomFood(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}
console.log(randomFood);

function generateFood() {
  food_x = randomFood(0, snakeboard.width - 10);
  food_y = randomFood(0, snakeboard.height - 10);
  snake.forEach(function has_snake_eaten_food(part) {
    const hasEaten = part.x == food_x && part.y == food_y;
    if (hasEaten) generateFood();
  });
}

function direction(event) {
  const left = 37;
  const right = 39;
  const up = 38;
  const down = 40;
  if (changeDir) return;
  changeDir = true;
  const keyPress = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingLeft = dx === -10;
  const goingRight = dx === 10;
  if (keyPress === left && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if (keyPress === up && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if (keyPress === right && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if (keyPress === down && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

function advanceSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  const hasEaten = snake[0].x === food_x && snake[0].y === food_y;
  if (hasEaten) {
    score += 10;
    document.getElementById("cScore").innerHTML = score;
    generateFood();
  } else {
    snake.pop();
  }
}
