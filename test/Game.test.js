const Game = require("../models/Game");
const Checker = require("../models/Checker");
const Player = require("../models/Player");

describe("Game", function() {
  it("should work", function() {});

  it("should setup a board", function() {
    const test = new Game(2);

    const expected = [[null, null], [null, null]];
    expect(test.board).toEqual(expected);
  });

  it("should start with an active player", function() {
    const test = new Game(8);
    test.startGame();
    expect(test.activePlayer).toEqual(test.turns[0]);
  });

  it("should place checkers ", function() {
    const test = new Game(8);
    test.startGame();
    const expected = [
      [
        null,
        new Checker("red"),
        null,
        new Checker("red"),
        null,
        new Checker("red"),
        null,
        new Checker("red")
      ],
      [
        new Checker("red"),
        null,
        new Checker("red"),
        null,
        new Checker("red"),
        null,
        new Checker("red"),
        null
      ],
      [
        null,
        new Checker("red"),
        null,
        new Checker("red"),
        null,
        new Checker("red"),
        null,
        new Checker("red")
      ],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [
        new Checker("black"),
        null,
        new Checker("black"),
        null,
        new Checker("black"),
        null,
        new Checker("black"),
        null
      ],
      [
        null,
        new Checker("black"),
        null,
        new Checker("black"),
        null,
        new Checker("black"),
        null,
        new Checker("black")
      ],
      [
        new Checker("black"),
        null,
        new Checker("black"),
        null,
        new Checker("black"),
        null,
        new Checker("black"),
        null
      ]
    ];

    expect(test.board).toEqual(expected);
  });
  it("should have methods to check on the status of a square", function() {
    const test = new Game(3);
    expect(test.square).toBeTruthy();
  });
  it("should check to see if a target sq is one away", function() {
    const test = new Game(3);
    const actual = test.square(0, 0).isOneAway(1, 1);
    expect(actual).toBeTruthy();

    const actual2 = test.square(1, 2).isOneAway(0, 1);
    expect(actual2).toBeTruthy();
  });
  it("should check to see if a target sq is two away", function() {
    const test = new Game(3);
    const actual = test.square(0, 0).isTwoAway(2, 2);
    expect(actual).toBeTruthy();

    const actual2 = test.square(0, 2).isTwoAway(2, 0);
    expect(actual2).toBeTruthy();
  });
  it("should check to see if a target sq is not two away", function() {
    const test = new Game(3);
    const actual = test.square(2, 0).isTwoAway(2, 2);
    expect(actual).toBeFalsy();

    const test2 = new Game(3);
    const actual2 = test.square(0, 2).isTwoAway(1, 1);
    expect(actual2).toBeFalsy();
  });
  it("should check if btwn square has an opposing piece", function() {
    const game = new Game(3);
    game.board[0][0] = new Checker("red");
    game.board[1][1] = new Checker("black");
    const player = new Player("red");
    const test = game
      .square(0, 0)
      .btwn(2, 2)
      .hasOppositionTo(player.side);
    expect(test).toBeTruthy();
  });
});
