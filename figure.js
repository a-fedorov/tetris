function Figure() {
  this.domElement = null;
  this.domClasses = ['figure', 'figure--active'];
  
  this.fragments = [];
  this.totalFragments = 4;
  this.fragmentSize = 30;

  this.curRow = 0;
  this.curCol = 3;
}

Figure.prototype = {
  init: function(type, fragments, boardDom) {
    console.log('init figure');
  
    this.board = game.board;

    this.type = type;
    this.fragments = fragments;
    this.startRow = (this.type == 'I') ? 0 : 1;

    // TODO - Find another way to get boardDom element in Figure object
    this.boardDom = boardDom;

    this.create();
  },

  createDomElement: function() {
    this.domElement = document.createElement('div');

    this.domClasses.forEach(function(className) {
      this.domElement.classList.add(className);
    }, this);

    this.domElement.style.top = 0 + 'px';
    this.domElement.style.left = this.fragmentSize * this.curCol + 'px';
    this.boardDom.appendChild(this.domElement);
  },

  create: function() {
    this.createDomElement();

    this.fragments.forEach(function(fragment) {
      var fragmentDom = document.createElement('div');
      fragmentDom.classList.add('fragment');
      fragmentDom.style.top = fragment[0] * this.fragmentSize + 'px';
      fragmentDom.style.left = fragment[1] * this.fragmentSize + 'px';

      this.domElement.appendChild(fragmentDom);
    }, this);

    this.timerId = setInterval(this.moveDown.bind(this), 200);
  },

  moveDown: function() {
    console.log('move');
  
    if (this.curRow < (this.board.ROWS - this.startRow) && 
      this.board.fallenFigures[this.curRow + this.fragments[0][0]][this.curCol + this.fragments[0][1]] !== 1 &&
      this.board.fallenFigures[this.curRow + this.fragments[1][0]][this.curCol + this.fragments[1][1]] !== 1 &&
      this.board.fallenFigures[this.curRow + this.fragments[2][0]][this.curCol + this.fragments[2][1]] !== 1 &&
      this.board.fallenFigures[this.curRow + this.fragments[3][0]][this.curCol + this.fragments[3][1]] !== 1) {

      this.domElement.style.top = this.curRow * this.fragmentSize + 'px';

      this.curRow++;
    } else {
      clearInterval(this.timerId);

      this.domElement.classList.remove('figure--active');

      if (this.curRow - this.fragments[0][0] - 1 >= 0 &&
          this.curRow - this.fragments[1][0] - 1 >= 0 &&
          this.curRow - this.fragments[2][0] - 1 >= 0 &&
          this.curRow - this.fragments[3][0] - 1 >= 0) {

        this.board.fallenFigures[this.curRow + this.fragments[0][0] - 1][this.curCol + this.fragments[0][1]] = 1;
        this.board.fallenFigures[this.curRow + this.fragments[1][0] - 1][this.curCol + this.fragments[1][1]] = 1;
        this.board.fallenFigures[this.curRow + this.fragments[2][0] - 1][this.curCol + this.fragments[2][1]] = 1;
        this.board.fallenFigures[this.curRow + this.fragments[3][0] - 1][this.curCol + this.fragments[3][1]] = 1;

        this.curRow = 0;
        this.curCol = 3;
        this.isFallComplete = true;

        // return;

      } else {
        console.log('game over');
        return;
      }
    }
  },

  

  moveRight: function() {

  },

  moveLeft: function() {

  }

}