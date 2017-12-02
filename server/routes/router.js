const router = require("express").Router();
const controller = require("../controllers/controller");

router.get("/start", controller.initializeGame);

router.post("/move", controller.postMove);

module.exports = router;
