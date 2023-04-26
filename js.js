

// Получаем доступ к холсту
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Задаем начальные координаты игрока
var playerX = canvas.width / 2;
var playerY = canvas.height - 30;

// Задаем размеры и скорость мяча
var ballRadius = 10;
var ballX = canvas.width / 2;
var ballY = canvas.height - 40;
var ballSpeedX = 2;
var ballSpeedY = -2;

// Задаем размеры и скорость платформы
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddleSpeed = 7;

alert("Привет! Это простая игра, где игрок управляет платформой, чтобы не дать мячу упасть. Для перемещения платформы используй клавиши (стрелки) влево и вправо :)");

// Обработчик нажатия клавиш
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Функции для обработки нажатия и отпускания клавиш
function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  }
}

// Функция для отрисовки мяча
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// Функция для отрисовки платформы
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// Основной цикл игры
function draw() {
  // Очищаем холст
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Рисуем мяч и платформу
  drawBall();
  drawPaddle();

  // Двигаем мяч
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Отскок мяча от стен
  if (ballX + ballSpeedX > canvas.width - ballRadius || ballX + ballSpeedX < ballRadius) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballY + ballSpeedY < ballRadius) {
    ballSpeedY = -ballSpeedY;
  } else if (ballY + ballSpeedY > canvas.height - ballRadius) {
    // Если мяч коснулся дна, игра заканчивается
    alert("Game over ");
    document.location.reload();
    clearInterval(interval);
  }

  // Отскок мяча от платформы
  if (ballY + ballSpeedY > canvas.height - ballRadius - paddleHeight) {
    if (ballX > paddleX && ballX < paddleX + paddleWidth) {
      ballSpeedY = -ballSpeedY;
    } else {
      // Если мяч коснулся платформы, игрок проигрывает
      alert("Game over!");
      document.location.reload();
      clearInterval(interval);
    }
  }

  // Двигаем платформу в зависимости от нажатых клавиш
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += paddleSpeed;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= paddleSpeed;
  }
}

// Запускаем игру
var interval = setInterval(draw, 10);

