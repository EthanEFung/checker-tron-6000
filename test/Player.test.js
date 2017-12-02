const Game = require("../models/Game");
const Player = require("../models/Player");
const Checker = require("../models/Checker");

describe("Player", function() {
  it("should have a side", function() {
    const test = new Player("red");
    const expected = "red";
    expect(test.side).toBe(expected);
  });
  it("should be able to move a piece", function() {
    const game = new Game(2);
    const board = game.board;
    board[0][0] = new Checker("red");
    const player = new Player("red");
    player.movePiece(board, 0, 0, 0, 1);
    expect(board[0][1]).toEqual(new Checker("red"));
    expect(board[0][0]).toBeNull();
  });
  it("should be able to capture a piece", function() {
    const game = new Game(3);
    const { board } = game;
    const player = new Player("red");
    board[0][0] = new Checker("red");
    board[1][1] = new Checker("black");
    player.capturePiece(board, 0, 0, 2, 2);
    expect(board[0][0]).toBeNull();
    expect(board[1][1]).toBeNull();
    expect(board[2][2]).toEqual(new Checker("red"));
  });
  it("should play its turn properly", function() {
    const game = new Game(3);
    const player = new Player("red");
    const test = player.playTurn(game, 0, 0, 1, 1);
    expect(game.turns[1]).toEqual(player);
    expect(game.turns[0]).not.toEqual(player);
  });
});
