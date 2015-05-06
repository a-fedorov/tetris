var board = [];
var boardElem = document.querySelector('.board');

var figures = [
  {type: 'J', fragments: [[1,0],[1,1],[1,2],[0,2]]},
  {type: 'T', fragments: [[1,0],[0,1],[1,1],[1,2]]},
  {type: 'S', fragments: [[1,0],[0,1],[1,1],[0,2]]},
  {type: 'Z', fragments: [[0,0],[0,1],[1,1],[1,2]]},
  {type: 'O', fragments: [[0,1],[1,1],[0,2],[1,2]]},
  {type: 'I', fragments: [[0,0],[0,1],[0,2],[0,3]]},
  {type: 'L', fragments: [[0,0],[1,0],[1,1],[1,2]]},
]

var ROWS = 20;
var COLS = 10;
var fragmentSize = 30;
var currentFigure = null;
var maxRow = 0;

function initBoard() {
  for (var row = 0; row < ROWS; row++) {
    board[row] = [];
    for (var col = 0; col < COLS; col++) {
      board[row][col] = 0;
    }
  } 
}

function createFigure() {
  var figureElem = document.createElement('div');
  figureElem.classList.add('figure');
  figureElem.classList.add('figure--active');
  figureElem.style.top = 0 + 'px';
  figureElem.style.left = fragmentSize * 3 + 'px';

  var figureIndex = Math.floor(Math.random() * 7);
  var figure = figures[figureIndex];
  var fragments = figure.fragments;

  currentFigure = figure;

  for (var i = 0; i < 4; i++) {
    var fragmentElem = document.createElement('div');
    fragmentElem.classList.add('fragment');
    fragmentElem.style.top = fragments[i][0] * fragmentSize + 'px';
    fragmentElem.style.left = fragments[i][1] * fragmentSize + 'px';
    
    figureElem.appendChild(fragmentElem);
  }

  boardElem.appendChild(figureElem);

  moveFigure();
}

function moveFigure() {
  var figureElem = document.querySelector('.figure--active');
  figureElem.classList.remove('figure--active');

  var figure = currentFigure;
  var fragments = figure.fragments;

  var pos = {top: 0, left: 0};
  var step = 30;
  var startRow = 1;
  var curRow = 0;
  var curCol = 3;

  if (figure.type == 'I') {
    startRow = 0;
  }

  
  var timerId = setInterval(function fallDown() {
    if (curRow < (ROWS - startRow) && 
      board[curRow + fragments[0][0]][curCol + fragments[0][1]] !== 1 &&
      board[curRow + fragments[1][0]][curCol + fragments[1][1]] !== 1 &&
      board[curRow + fragments[2][0]][curCol + fragments[2][1]] !== 1 &&
      board[curRow + fragments[3][0]][curCol + fragments[3][1]] !== 1) {

      figureElem.style.top = curRow * fragmentSize + 'px';

      curRow++;
    } else {
      clearInterval(timerId);

      if (curRow - fragments[0][0] - 1 >= 0 &&
          curRow - fragments[1][0] - 1 >= 0 &&
          curRow - fragments[2][0] - 1 >= 0 &&
          curRow - fragments[3][0] - 1 >= 0) {

        board[curRow + fragments[0][0] - 1][curCol + fragments[0][1]] = 1;
        board[curRow + fragments[1][0] - 1][curCol + fragments[1][1]] = 1;
        board[curRow + fragments[2][0] - 1][curCol + fragments[2][1]] = 1;
        board[curRow + fragments[3][0] - 1][curCol + fragments[3][1]] = 1;

      } else {
        console.log('game over');
        return;
      }
      createFigure();
    }
  }, 200);
}

initBoard();
createFigure();
