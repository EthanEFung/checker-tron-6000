const Game = require("../../models/Game");
const model = new Game(8);

module.exports = {
  initializeGame: (req, res) => {
    model.startGame();
    const state = JSON.stringify(model);
    res.send(state);
  },
  postMove: (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
  }
};
