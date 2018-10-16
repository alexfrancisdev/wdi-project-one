//TODO: IMPORTANT ALEX!!!! THE SPECIAL FUNCTION REPEATS EVERYTIME THE GAME RESETS
//CANCEL IT AT THE START

//Variables
let snakeLength;
let snakeDirection;
let snakeX;
let snakeY;
let snake2X;
let snake2Y;
let snake2Length;
let snake2Direction;
let refreshPaused;
let gameMode;
const grid = [];
const gridHeight = 20;
const gridWidth = 20;
let score = 0;
let score2 = 0;
const $splashMessage = $('#splashMsg');
const $playAgain = $('#playAgain');

// By Rob: add a button event listener to change screen
$('#p1-menu').click(() => {
  bringToFront('p1Start');
});

$('#p2-menu').click(() => {
  bringToFront('p2Start');
});

$('#p1-start').click(() => {
  bringToFront('main');
  gameMode = '1player';
  loadGame();
});

$('#p2-start').click(() => {
  bringToFront('main');
  gameMode = '2player';
  loadGame();
});

function bringToFront(className) {
  $(`.${className}`).css({ zIndex: 1 });
  $(`section:not(.${className})`).css({ zIndex: -1 });
}



function popDown(){
  $('.splashContainer').hide();
}

function popUp(){
  $('.splashContainer').show();
  $splashMessage.html('Congratulations, you scored ' + score + ' points!');
}

$playAgain.click(console.log('reset clicked'));

// const gridLimit = [];
// let isGameRunning = false;
// let isGamePaused = false;

//User Inputs
let pixel = {};
//Functions

//DOM elements

const $p1score = $('.p1score');
$p1score.html('Score: ' + score);


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
  if(gameMode === '1player'){
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
  } else {
    snakeX = 8;
    snakeY = 8;
    snakeLength = 4;
    snakeDirection = 'right';
    score = 0;
    snake2X = 10;
    snake2Y = 4;
    snake2Length = 4;
    snake2Direction = 'left';
    score2 = 0;
    for (let y = 0; y < gridHeight; ++y) {
      for (let x = 0; x < gridWidth; ++x) {
        grid[y][x].snake = 0;
        grid[y][x].apple = 0;
        grid[y][x].special = 0;
        grid[y][x].snake2 = 0;
      }
    }
    grid[snakeX][snakeY].snake = snakeLength;
    grid[snake2X][snake2Y].snake2 = snake2Length;
    createApple();
    createSpecial();
  }
}

popDown();

function gameRefresh(){
  if(gameMode === '1player'){
    $p1score.html('Score: ' + score);
    switch(snakeDirection) {
      case 'up':    snakeY--; break;
      case 'down':  snakeY++; break;
      case 'left':  snakeX--; break;
      case 'right': snakeX++; break;
    }
    if (snakeX < 0 || snakeY < 0 || snakeX >= gridWidth || snakeY >= gridHeight) {
      popUp();
    }
    if (grid[snakeY][snakeX].snake > 0) {
      popUp();
    }
    if (grid[snakeY][snakeX].apple === 1) {
      snakeLength++;
      score++;
      grid[snakeY][snakeX].apple = 0;
      createApple();
      createSpecial();
    }
    if (grid[snakeY][snakeX].special === 1) {
      score = score + 3;
      grid[snakeY][snakeX].special = 0;
    }
    grid[snakeY][snakeX].snake = snakeLength;

    for (let y = 0; y < gridHeight; ++y) {
      for (let x = 0; x < gridWidth; ++x) {
        const pixel = grid[y][x];

        if (pixel.snake > 0) {
          pixel.element.className = 'snake';
          const color = document.getElementById('p1Color').value;
          pixel.element.style.backgroundColor = color;
          pixel.snake -= 1;
        } else if (pixel.apple === 1){
          pixel.element.className = 'apple';
        } else if (pixel.special === 1){
          pixel.element.className = 'special';
        } else {
          pixel.element.className = '';
          pixel.element.style.backgroundColor = '';
        }
      }
    }
    setTimeout(gameRefresh, 1000/(snakeLength/2));
    //2 Players
  } else {
    $p1score.html('Score: ' + score);
    switch(snakeDirection) {
      case 'up':    snakeY--; break;
      case 'down':  snakeY++; break;
      case 'left':  snakeX--; break;
      case 'right': snakeX++; break;
    }
    switch(snake2Direction) {
      case 'up':    snake2Y--; break;
      case 'down':  snake2Y++; break;
      case 'left':  snake2X--; break;
      case 'right': snake2X++; break;
    }
    if (snakeX < 0 || snakeY < 0 || snakeX >= gridWidth || snakeY >= gridHeight) {
      console.log('Player 2 wins!');
      popUp();
    }
    if (grid[snakeY][snakeX].snake > 0 || grid[snakeY][snakeX].snake2) {
      console.log('Player 2 wins!');
      popUp();
    }
    if (snake2X < 0 || snake2Y < 0 || snake2X >= gridWidth || snake2Y >= gridHeight) {
      console.log('Player 1 wins!');
      popUp();
    }
    if (grid[snake2Y][snake2X].snake > 0 || grid[snake2Y][snake2X].snake2) {
      console.log('Player 1 wins!');
      popUp();
    }
    if (grid[snakeY][snakeX].apple === 1) {
      snakeLength++;
      score++;
      grid[snakeY][snakeX].apple = 0;
      createApple();
      createSpecial();
    }
    if (grid[snake2Y][snake2X].apple === 1) {
      snake2Length++;
      score2++;
      grid[snake2Y][snake2X].apple = 0;
      createApple();
      createSpecial();
    }
    if (grid[snakeY][snakeX].special === 1) {
      score = score + 3;
      grid[snakeY][snakeX].special = 0;
    }
    if (grid[snake2Y][snake2X].special === 1) {
      score2 = score2 + 3;
      grid[snake2Y][snake2X].special = 0;
    }
    grid[snakeY][snakeX].snake = snakeLength;
    grid[snake2Y][snake2X].snake2 = snake2Length;

    for (let y = 0; y < gridHeight; ++y) {
      for (let x = 0; x < gridWidth; ++x) {
        const pixel = grid[y][x];
        if (pixel.snake > 0) {
          pixel.element.className = 'snake';
          // const color = document.getElementById('pl1Color').value;
          // pixel.element.style.backgroundColor = color;
          pixel.snake -= 1;
        }else if (pixel.snake2 > 0) {
          pixel.element.className = 'snake2';
          // const color2 = document.getElementById('pl2Color').value;
          // pixel.element.style.backgroundColor = color2;
          pixel.snake2 -= 1;
        } else if (pixel.apple === 1){
          pixel.element.className = 'apple';
        } else if (pixel.special === 1){
          pixel.element.className = 'special';
        } else {
          pixel.element.className = '';
          pixel.element.style.backgroundColor = '';
        }
      }
    }
    setTimeout(gameRefresh, 600);
  }
}

function snakeUp() {
  if (snakeDirection !== 'down') {
    snakeDirection = 'up';
  }
}

function snake2Up() {
  if (snake2Direction !== 'down') {
    snake2Direction = 'up';
  }
}

function snakeDown() {
  if (snakeDirection !== 'up') {
    snakeDirection = 'down';
  }
}

function snake2Down() {
  if (snake2Direction !== 'up') {
    snake2Direction = 'down';
  }
}

function snakeRight() {
  if (snakeDirection !== 'left') {
    snakeDirection = 'right';
  }
}

function snake2Right() {
  if (snake2Direction !== 'left') {
    snake2Direction = 'right';
  }
}

function snakeLeft() {
  if (snakeDirection !== 'right') {
    snakeDirection = 'left';
  }
}

function snake2Left() {
  if (snake2Direction !== 'right') {
    snake2Direction = 'left';
  }
}

window.addEventListener('keydown', function(e) {
  console.log(e);
  if (e.which === 38) {
    snakeUp();
  } else if (e.which === 40) {
    snakeDown();
  } else if (e.which === 37) {
    snakeLeft();
  } else if (e.which === 39) {
    snakeRight();
  } else if (e.which === 87) {
    snake2Up();
  } else if (e.which === 83) {
    snake2Down();
  } else if (e.which === 65) {
    snake2Left();
    console.log('snake 2 left');
  } else if (e.which === 68) {
    snake2Right();
    console.log('snake 2 right');
  }
});
