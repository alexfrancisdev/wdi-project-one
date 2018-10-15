//IMPORTANT ALEX!!!! THE SPECIAL FUNCTION REPEATS EVERYTIME THE GAME RESETS
//CANCEL IT AT THE START



//Variables
let snakeLength;
let snakeDirection;
let snakeX;
let snakeY;
const grid = [];
const gridHeight = 20;
const gridWidth = 20;
let score = 0;
// const gridLimit = [];
// let isGameRunning = false;
// let isGamePaused = false;

//User Inputs
let pixel = {};
//Functions

//DOM elements
const $p1score = $('p1score');
$p1score.html('test score');

function loadGame() {
  const gameGrid = document.getElementById('grid');

  for (let y = 0; y < gridHeight; y++) {
    const row = [];
    for (let x = 0; x < gridWidth; x++) {
      pixel = {
      };
      pixel.element = document.createElement('div');
      gameGrid.appendChild(pixel.element);
      row.push(pixel);
    }
    grid.push(row);
  }
  startGame();
  gameRefresh();
}

function createApple() {
  const appleX = Math.floor(Math.random() * gridWidth);
  const appleY = Math.floor(Math.random() * gridHeight);

  grid[appleX][appleY].apple = 1;
}

function createSpecial() {
  const randomNum = Math.floor(Math.random() * 4);
  if(randomNum === 1){
    const specialX = Math.floor(Math.random() * gridWidth);
    const specialY = Math.floor(Math.random() * gridHeight);
    grid[specialX][specialY].special = 1;
  }
}
//startGame
function startGame(){
  snakeX = 8;
  snakeY = 8;
  snakeLength = 4;
  snakeDirection = 'right';
  score = 0;
  for (let y = 0; y < gridHeight; ++y) {
    for (let x = 0; x < gridWidth; ++x) {
      grid[y][x].snake = 0;
      grid[y][x].apple = 0;
      grid[y][x].special = 0;
    }
  }
  grid[snakeX][snakeY].snake = snakeLength;
  createApple();
  createSpecial();
  // gameRefresh();
}

function gameRefresh(){
  switch(snakeDirection) {
    case 'up':    snakeY--; break;
    case 'down':  snakeY++; break;
    case 'left':  snakeX--; break;
    case 'right': snakeX++; break;
  }
  if (snakeX < 0 || snakeY < 0 || snakeX >= gridWidth || snakeY >= gridHeight) {
    startGame();
  }
  if (grid[snakeY][snakeX].snake > 0) {
    startGame();
  }
  if (grid[snakeY][snakeX].apple === 1) {
    snakeLength++;
    score++;
    console.log(score);
    grid[snakeY][snakeX].apple = 0;
    createApple();
    createSpecial();
  }
  if (grid[snakeY][snakeX].special === 1) {
    score = score + 3;
    console.log('SPECIAL!');
    grid[snakeY][snakeX].special = 0;
  }
  grid[snakeY][snakeX].snake = snakeLength;

  for (let y = 0; y < gridHeight; ++y) {
    for (let x = 0; x < gridWidth; ++x) {
      const pixel = grid[y][x];

      if (pixel.snake > 0) {
        pixel.element.className = 'snake';
        pixel.snake -= 1;
      } else if (pixel.apple === 1){
        pixel.element.className = 'apple';
      } else if (pixel.special === 1){
        pixel.element.className = 'special';
      } else {
        pixel.element.className = '';
      }
    }
  }
  setTimeout(gameRefresh, 1000/snakeLength);
}

function snakeUp() {
  if (snakeDirection !== 'down') {
    snakeDirection = 'up';
  }
}

function snakeDown() {
  if (snakeDirection !== 'up') {
    snakeDirection = 'down';
  }
}

function snakeRight() {
  if (snakeDirection !== 'left') {
    snakeDirection = 'right';
  }
}

function snakeLeft() {
  if (snakeDirection !== 'right') {
    snakeDirection = 'left';
  }
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

loadGame();
