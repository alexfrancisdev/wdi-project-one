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
// let refreshPaused;
let gameMode;
const grid = [];
const gridHeight = 20;
const gridWidth = 20;
let score = 0;
let score2 = 0;
const $splashMessage = $('#splashMsg');
const $playAgain = $('#playAgain');
const deathSound = document.getElementById('deathSound');
const bananaSound = document.getElementById('bananaSound');
const startSound = document.getElementById('startSound');
const eatingSound = document.getElementById('eatingSound');
const menuSound = document.getElementById('menuSound');
const returnSound = document.getElementById('returnSound');
const introSound = document.getElementById('introSound');

// By Rob: add a button event listener to change screen

let executed = false;
function loadMusic() {
  if (!executed) {
    introSound.play();
    executed = true;
  }
}

$('body').click(() => {
  loadMusic();
});

$('#p1-menu').click(() => {
  bringToFront('p1Start');
  menuSound.play();
});

$('#p2-menu').click(() => {
  bringToFront('p2Start');
  menuSound.play();
});

$('#p1-start').click(() => {
  bringToFront('main');
  gameMode = '1player';
  $('.p2info').hide();
  startSound.play();
  introSound.pause();
  loadGame();
});

$('#p2-start').click(() => {
  bringToFront('main');
  gameMode = '2player';
  startSound.play();
  introSound.pause();
  loadGame();
});

$('#return-to-start1').click(() => {
  bringToFront('startScreen');
  returnSound.play();
});

$('#return-to-start2').click(() => {
  bringToFront('startScreen');
  returnSound.play();
});

$('#p1exit').click(() => {
  bringToFront('gameover');
});

$('#mainmenu').click(() => {
  bringToFront('startScreen');
  introSound.play();
});

$('#playAgain').click(() => {
  popDown();
  for (let y = 0; y < gridHeight; ++y) {
    for (let x = 0; x < gridWidth; ++x) {
      grid[y][x].snake = 0;
      grid[y][x].apple = 0;
      grid[y][x].special = 0;
      grid[y][x].snake2 = 0;
    }
  }
  snakeX = 8;
  snakeY = 8;
  snakeLength = 4;
  snakeDirection = 'right';
  score = 0;
  if(gameMode === '2player'){
    snake2X = 15;
    snake2Y = 15;
    snake2Length = 4;
    snake2Direction = 'left';
    score2 = 0;
  }
  createApple();
  createSpecial();
  gameRefresh();
});

function bringToFront(className) {
  $(`.${className}`).css({ zIndex: 1 });
  $(`section:not(.${className})`).css({ zIndex: -1 });
  $('footer').css({zIndex: 1});
}

function popDown(){
  $('.splashContainer').hide();
}

function popUp(){
  deathSound.play();
  $('.splashContainer').show();
  // $splashMessage.html('Congratulations, you scored ' + score + ' points!');
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

const $p2score = $('.p2score');
$p2score.html('Score: ' + score2);

const $p1name = $('.display-p1-name');
$p1name.html('test name');

const p1name = $('.p1name');


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
  setTimeout(startGame, 1000);
  setTimeout(gameRefresh, 1000);
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
    snakeX = 4;
    snakeY = 4;
    snakeLength = 4;
    snakeDirection = 'right';
    score = 0;
    snake2X = 15;
    snake2Y = 15;
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
    $p1score.css('color', document.getElementById('color').value);
    $p1score.html('Score: ' + score);
    $p1name.html(JSON.stringify(p1name));
    switch(snakeDirection) {
      case 'up':    snakeY--; break;
      case 'down':  snakeY++; break;
      case 'left':  snakeX--; break;
      case 'right': snakeX++; break;
    }
    if (snakeX < 0 || snakeY < 0 || snakeX >= gridWidth || snakeY >= gridHeight) {
      deathSound.play();
      popUp();
    }
    if (grid[snakeY][snakeX].snake > 0) {
      deathSound.play();
      popUp();
    }
    if (grid[snakeY][snakeX].apple === 1) {
      snakeLength++;
      score++;
      grid[snakeY][snakeX].apple = 0;
      createApple();
      createSpecial();
      eatingSound.play();
    }
    if (grid[snakeY][snakeX].special === 1) {
      score = score + 3;
      grid[snakeY][snakeX].special = 0;
      bananaSound.play();
    }
    grid[snakeY][snakeX].snake = snakeLength;

    for (let y = 0; y < gridHeight; ++y) {
      for (let x = 0; x < gridWidth; ++x) {
        const pixel = grid[y][x];

        if (pixel.snake === snakeLength) {
          if (snakeDirection === 'up'){
            pixel.element.className = 'snakehead-up';
          } else if (snakeDirection === 'down'){
            pixel.element.className = 'snakehead-down';
          } else if (snakeDirection === 'right'){
            pixel.element.className = 'snakehead-right';
          } else if (snakeDirection === 'left'){
            pixel.element.className = 'snakehead-left';
          }
          const color = document.getElementById('color').value;
          pixel.element.style.backgroundColor = color;
          pixel.snake -= 1;
        } else if (pixel.snake > 0) {
          pixel.element.className = 'snake';
          const color = document.getElementById('color').value;
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
    $p1score.css('color', document.getElementById('pl1Color').value);
    $p2score.css('color', document.getElementById('pl2Color').value);
    $p1score.html('Score: ' + score);
    $p2score.html('Score: ' + score2);
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
      $('#gameover').html('Player 2 Wins!');
      $('#splashMsg').html('Their score is ' + score2);
      popUp();
    }
    if (grid[snakeY][snakeX].snake > 0 || grid[snakeY][snakeX].snake2) {
      $('#gameover').html('Player 2 Wins!');
      $('#splashMsg').html('Their score is ' + score2);
      popUp();
    }
    if (snake2X < 0 || snake2Y < 0 || snake2X >= gridWidth || snake2Y >= gridHeight) {
      $('#gameover').html('Player 1 Wins!');
      $('#splashMsg').html('Their score is ' + score);
      popUp();
    }
    if (grid[snake2Y][snake2X].snake > 0 || grid[snake2Y][snake2X].snake2) {
      $('#gameover').html('Player 1 Wins!');
      $('#splashMsg').html('Their score is ' + score);
      popUp();
    }
    if (grid[snakeY][snakeX].apple === 1) {
      snakeLength++;
      score++;
      grid[snakeY][snakeX].apple = 0;
      createApple();
      createSpecial();
      eatingSound.play();
    }
    if (grid[snake2Y][snake2X].apple === 1) {
      snake2Length++;
      score2++;
      console.log(score2);
      grid[snake2Y][snake2X].apple = 0;
      createApple();
      createSpecial();
      eatingSound.play();
    }
    if (grid[snakeY][snakeX].special === 1) {
      score = score + 3;
      grid[snakeY][snakeX].special = 0;
      bananaSound.play();
    }
    if (grid[snake2Y][snake2X].special === 1) {
      score2 = score2 + 3;
      grid[snake2Y][snake2X].special = 0;
      bananaSound.play();
    }
    grid[snakeY][snakeX].snake = snakeLength;
    grid[snake2Y][snake2X].snake2 = snake2Length;

    for (let y = 0; y < gridHeight; ++y) {
      for (let x = 0; x < gridWidth; ++x) {
        const pixel = grid[y][x];
        //Coloring Snake 1
        if (pixel.snake === snakeLength) {
          if (snakeDirection === 'up'){
            pixel.element.className = 'snakehead-up';
          } else if (snakeDirection === 'down'){
            pixel.element.className = 'snakehead-down';
          } else if (snakeDirection === 'right'){
            pixel.element.className = 'snakehead-right';
          } else if (snakeDirection === 'left'){
            pixel.element.className = 'snakehead-left';
          }
          const color = document.getElementById('pl1Color').value;
          pixel.element.style.backgroundColor = color;
          pixel.snake -= 1;
        } else if (pixel.snake > 0) {
          pixel.element.className = 'snake';
          const color = document.getElementById('pl1Color').value;
          pixel.element.style.backgroundColor = color;
          pixel.snake -= 1;
          //Coloring snake 2
        }else if (pixel.snake2 === snake2Length) {
          if (snake2Direction === 'up'){
            pixel.element.className = 'snakehead-up';
          } else if (snake2Direction === 'down'){
            pixel.element.className = 'snakehead-down';
          } else if (snake2Direction === 'right'){
            pixel.element.className = 'snakehead-right';
          } else if (snake2Direction === 'left'){
            pixel.element.className = 'snakehead-left';
          }
          const pl2Color = document.getElementById('pl2Color').value;
          pixel.element.style.backgroundColor = pl2Color;
          pixel.snake2 -= 1;
        }else if (pixel.snake2 > 0) {
          pixel.element.className = 'snake2';
          const pl2Color = document.getElementById('pl2Color').value;
          pixel.element.style.backgroundColor = pl2Color;
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
    setTimeout(gameRefresh, 250);
  }
}

function snakeUp() {
  if (snakeDirection !== 'down') {
    snakeDirection = 'up';
    pixel.element.style.transform='rotate(0deg)';
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
    pixel.element.style.transform='rotate(180deg)';
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
  if (e.which === 38) {
    e.preventDefault();
    snakeUp();
  } else if (e.which === 40) {
    e.preventDefault();
    snakeDown();
  } else if (e.which === 37) {
    e.preventDefault();
    snakeLeft();
  } else if (e.which === 39) {
    e.preventDefault();
    snakeRight();
  } else if (e.which === 87) {
    snake2Up();
  } else if (e.which === 83) {
    snake2Down();
  } else if (e.which === 65) {
    snake2Left();
  } else if (e.which === 68) {
    snake2Right();
  }
});
