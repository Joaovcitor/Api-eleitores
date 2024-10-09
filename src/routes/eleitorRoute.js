const express = require("express");
const router = express.Router();

const checkData = require("../middlewares/checkDataEleitorAndLiderancaCreate");
const eleitorController = require("../controllers/eleitorController");

router.post("/criar/:id", checkData, eleitorController.store);

module.exports = router;
