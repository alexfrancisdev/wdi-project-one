//Variables
let snakeLength;
let snakeDirection;
let snakeX;
let snakeY;
const snakeSpeed = 1000;
const grid = [];
const gridHeight = 20;
const gridWidth = 20;
// const gridLimit = [];
// let isGameRunning = false;
// let isGamePaused = false;
// let score = 0;

//User Inputs
let pixel = {};
//Functions
function loadGame() {
  const gameGrid = document.getElementById('grid');
  for (let y = 0; y < gridHeight; y++) {
    const row = [];
    for (let x = 0; x < gridWidth; x++) {
      pixel = {
        snake: false
      };
      pixel.element = document.createElement('div');
      gameGrid.appendChild(pixel.element);
      row.push(pixel);
    }
    grid.push(row);
  }
  startGame();
}


function startGame(){
  snakeX = 8;
  snakeY = 8;
  snakeLength = 4;
  snakeDirection = 'right';
  grid[snakeX][snakeY].snake = 1;
  gameRefresh();
}

function gameRefresh(){
  switch(snakeDirection) {
    case 'up':    snakeY--; break;
    case 'down':  snakeY++; break;
    case 'left':  snakeX--; break;
    case 'right': snakeX++; break;
  }
  grid[snakeY][snakeX].snake = 1;
  for (let y = 0; y < gridHeight; ++y) {
    for (let x = 0; x < gridWidth; ++x) {
      const pixel = grid[y][x];

      if (pixel.snake) {
        pixel.element.className = 'snake';
      } else {
        pixel.element.className = '';
      }
    }
  }
  setTimeout(gameRefresh, snakeSpeed);
  console.log('refreshing');
}

function snakeUp(){
  snakeDirection = 'up';
}

function snakeDown(){
  snakeDirection = 'down';
}

function snakeRight(){
  snakeDirection = 'right';
}

function snakeLeft(){
  snakeDirection = 'left';
}

window.addEventListener('keydown', function(e) {
  console.log(e.which);
  if (e.which === 38) {
    snakeUp();
  } else if (e.which === 40) {
    snakeDown();
  } else if (e.which === 37) {
    snakeLeft();
  } else if (e.which === 39) {
    snakeRight();
  }
});
