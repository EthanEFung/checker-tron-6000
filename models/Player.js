class Player {
  constructor(side) {
    this.side = side;
  }
  playTurn(game, currR, currC, targetR, targetC) {
    const checker = game.board[currR][currC];
    if (game.activePlayer === this && checker.side === this.side) {
      if (
        game.square(currR, currC).isOneAway(targetR, targetC) &&
        game.square(targetR, targetC).isVacant()
      ) {
        this.movePiece(board, currR, currC, targetR, targetC);
        game.endTurn();
      }
      if (
        game.square(currR, currC).isTwoAway(targetR, targetC) &&
        game
          .square(currR, currC)
          .btwn(targetR, targetC)
          .hasOpposition(this.side)
      ) {
        this.capturePiece(game.board, currR, currC, targetR, targetC);
        game.endTurn();
      }
    }
  }
  movePiece(board, currR, currC, targetR, targetC) {
    board[targetR][targetC] = board[currR][currC];
    board[currR][currC] = null;
  }
  capturePiece(board, currR, currC, targetR, targetC) {
    const btwnR = Math.min(currR, targetR) + 1;
    const btwnC = Math.min(currR, targetC) + 1;

    board[btwnR][btwnC] = null;
    board[targetR][targetC] = board[currR][currC];
    board[currR][currC] = null;
  }
}

module.exports = Player;
