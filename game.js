function Game() {
  this.board = null;
}

Game.prototype = {
  start: function() {
    this.board = new Board();
    this.board.init();
    this.board.addNewFigure();

    requestAnimationFrame(this.update.bind(this));
  },

  update: function() {
    this.board.update();
    
    requestAnimationFrame(this.update.bind(this));
  }
}
