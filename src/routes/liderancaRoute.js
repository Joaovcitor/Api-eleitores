const express = require("express");
const router = express.Router();

const checkData = require("../middlewares/checkDataEleitorAndLiderancaCreate");
const liderancaController = require("../controllers/liderancaController");

router.post("/criar", checkData, liderancaController.store);

module.exports = router;
