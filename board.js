function Board() {
  this.figures = [
    {type: 'I', fragments: [[0,0],[0,1],[0,2],[0,3]]},
    {type: 'J', fragments: [[1,0],[1,1],[1,2],[0,2]]},
    {type: 'L', fragments: [[0,0],[1,0],[1,1],[1,2]]},
    {type: 'O', fragments: [[0,1],[1,1],[0,2],[1,2]]},
    {type: 'S', fragments: [[1,0],[0,1],[1,1],[0,2]]},
    {type: 'T', fragments: [[1,0],[0,1],[1,1],[1,2]]},
    {type: 'Z', fragments: [[0,0],[0,1],[1,1],[1,2]]},
  ];

  this.totalFigures = this.figures.length;

  this.ROWS = 20;
  this.COLS = 10;
  this.fallenFigures = [];
  this.currentFigure = new Figure();
  this.domElement = null;

  this.KEYS = {
    left: 37,
    right: 39
  };
}

Board.prototype = {
  init: function() {
    for (var row = 0; row < this.ROWS; row++) {
      this.fallenFigures[row] = [];
      for (var col = 0; col < this.COLS; col++) {
        this.fallenFigures[row][col] = 0;
      }
    }

    this.domElement = document.querySelector('.board');
    this.bindEvents();
  },

  update: function() {
    if (this.currentFigure.isFallComplete) {
      this.currentFigure.isFallComplete = false;
      this.addNewFigure();
    }
  },

  addNewFigure: function() {
    var figureIndex = this.getNextFigureIndex();
    var currentFigureObj = this.figures[figureIndex];

    this.currentFigure.init(currentFigureObj.type, currentFigureObj.fragments, this.domElement);
  },

  getNextFigureIndex: function() {
    return Math.floor(Math.random() * this.totalFigures)
  },

  bindEvents: function() {
    window.addEventListener('keydown', function(event){
      // console.log(event.keyCode);
      // event.preventDefault();

      var key = event.keyCode;

      if (key === this.KEYS.left) {
        event.preventDefault();

        this.currentFigure.curCol--;
        this.currentFigure.domElement.style.left = this.currentFigure.fragmentSize * this.currentFigure.curCol + 'px';
      } else if (key === this.KEYS.right) {        
        event.preventDefault();
        
        this.currentFigure.curCol++;
        this.currentFigure.domElement.style.left = this.currentFigure.fragmentSize * this.currentFigure.curCol + 'px';
      }
    }.bind(this), false);
  },
}