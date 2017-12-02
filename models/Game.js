const Player = require("./Player");
const Checker = require("./Checker");

class Game {
  constructor(n) {
    this.board = this.createBoard(n);
    this.turns = [new Player("black"), new Player("red")];
    this.activePlayer = null;
    this.winner = null;
  }

  createBoard(n) {
    const board = [];
    for (let i = 0; i < n; i++) {
      let row = [];
      for (let j = 0; j < n; j++) {
        row.push(null);
      }
      board.push(row);
    }
    return board;
  }

  startGame() {
    const { board } = this;
    const first = [board[0], 0];
    const second = [board[1], 1];
    const third = [board[2], 2];
    this.placeCheckersInRows(this.turns[1].side, board, first, second, third);

    const thirdL = [board[board.length - 3], board.length - 3];
    const secondL = [board[board.length - 2], board.length - 2];
    const last = [board[board.length - 1], board.length - 1];
    this.placeCheckersInRows(this.turns[0].side, board, thirdL, secondL, last);

    this.activePlayer = this.turns[0];
  }

  placeCheckersInRows(side, board, ...rows) {
    rows.forEach(row => {
      const i = row[1];
      row[0].forEach((sq, j) => {
        if ((i + j) % 2 === 1) board[i][j] = new Checker(side);
      });
    });
  }

  square(currR, currC) {
    return {
      isOneAway: (targetR, targetC) => {
        const minR = Math.min(currR, targetR);
        const minC = Math.min(currC, targetC);
        const maxR = Math.max(currR, targetR);
        const maxC = Math.max(currC, targetC);
        return minR + 1 === maxR && minC + 1 === maxC;
      },
      isTwoAway: (targetR, targetC) => {
        const minR = Math.min(currR, targetR);
        const minC = Math.min(currC, targetC);
        const maxR = Math.max(currR, targetR);
        const maxC = Math.max(currC, targetC);
        return minR + 2 === maxR && minC + 2 === maxC;
      },
      isVacant: () => {
        return this.board[currR][currC] === null;
      },
      btwn: (targetR, targetC) => {
        const btwnR = Math.min(currR, targetR) + 1;
        const btwnC = Math.min(currC, targetC) + 1;
        return {
          hasOppositionTo: side =>
            this.board[btwnR][btwnC]
              ? side !== this.board[btwnR][btwnC].side
              : false
        };
      }
    };
  }

  endTurn() {
    const player = this.turns.shift();
    this.turns.push(player);
    this.activePlayer = this.turns[0];
  }

  endGame(winningPlayer) {
    this.winner = winningPlayer;
  }
}

module.exports = Game;
