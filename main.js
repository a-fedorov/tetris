// function Game() {
//  this.board = new Board();
// }

// Game.prototype = {
//  start: function() {

//  },

//  stop: function() {

//  }
// }


// function Board() {
//  this.array = [];
//  this.figures = {};
// }

// Board.prototype = {
//  init: function() {

//  },

// }

var board = [];
var boardElem = document.querySelector('.board');

// var figures = {
//   'I': [{top: 0, left: 0}, {top: 0, left: 30}, {top: 0, left: 60}, {top: 0, left: 90}],
//   'J': [{top: 30, left: 0}, {top: 30, left: 30}, {top: 30, left: 60}, {top: 0, left: 60}],
//   'L': [{top: 0, left: 0}, {top: 30, left: 0}, {top: 30, left: 30}, {top: 30, left: 60}],
//   'O': [{top: 0, left: 30}, {top: 30, left: 30}, {top: 0, left: 60}, {top: 30, left: 60}],
//   'S': [{top: 30, left: 0}, {top: 0, left: 30}, {top: 30, left: 30}, {top: 0, left: 60}],
//   'T': [{top: 30, left: 0}, {top: 0, left: 30}, {top: 30, left: 30}, {top: 30, left: 60}],
//   'Z': [{top: 0, left: 0}, {top: 0, left: 30}, {top: 30, left: 30}, {top: 30, left: 60}]
// };

var figures = [
  {type: 'I', pos: [{top: 0, left: 0}, {top: 0, left: 30}, {top: 0, left: 60}, {top: 0, left: 90}]},
  {type: 'J', pos: [{top: 30, left: 0}, {top: 30, left: 30}, {top: 30, left: 60}, {top: 0, left: 60}]},
  {type: 'L', pos: [{top: 0, left: 0}, {top: 30, left: 0}, {top: 30, left: 30}, {top: 30, left: 60}]},
  {type: 'O', pos: [{top: 0, left: 30}, {top: 30, left: 30}, {top: 0, left: 60}, {top: 30, left: 60}]},
  {type: 'S', pos: [{top: 30, left: 0}, {top: 0, left: 30}, {top: 30, left: 30}, {top: 0, left: 60}]},
  {type: 'T', pos: [{top: 30, left: 0}, {top: 0, left: 30}, {top: 30, left: 30}, {top: 30, left: 60}]},
  {type: 'Z', pos: [{top: 0, left: 0}, {top: 0, left: 30}, {top: 30, left: 30}, {top: 30, left: 60}]},
]

var ROWS = 20;
var COLS = 10;

function initBoard() {
  for (var row = 0; row < ROWS; row++) {
    board[row] = [];
    for (var col = 0; col < COLS; col++) {
      board[row][col] = 0;
    }
  } 
}

// function createFigureFragment(top, left) {

// }

function createFigure() {
  var figureElem = document.createElement('div');
  figureElem.classList.add('figure');
  figureElem.classList.add('figure--active');

  figureElem.style.top = 0 + 'px';
  figureElem.style.left = 90 + 'px';

  var figureIndex = Math.floor(Math.random() * 7);
  var figure = figures[figureIndex];
  var fragment = figure.pos;

  console.log(figureIndex, figure, fragment);


  for (var i = 0; i < 4; i++) {
    var fragmentElem = document.createElement('div');
    fragmentElem.classList.add('fragment');

    fragmentElem.style.top = fragment[i].top + 'px';
    fragmentElem.style.left = fragment[i].left + 'px';
    
    figureElem.appendChild(fragmentElem);
  }

  boardElem.appendChild(figureElem);

  moveFigure();
}

function moveFigure() {
  var figure = document.querySelector('.figure--active');
  figure.classList.remove('figure--active');

  var pos = {top: 0, left: 0};
  var step = 30;

  var timerId = setInterval(function() {
    pos.top += step;
    figure.style.top = pos.top + 'px';

    if (pos.top >= 570) {
      clearInterval(timerId);
      createFigure();
    }
  }, 500);
}

initBoard();
// createFigure();1
