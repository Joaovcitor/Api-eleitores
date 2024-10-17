const express = require("express");
const router = express.Router();

const checkData = require("../middlewares/checkDataEleitorAndLiderancaCreate");
const eleitorController = require("../controllers/eleitorController");
const authRequired = require("../middlewares/authRequired");
const authenticateJwt = require("../middlewares/authenticateJwt");

router.post(
  "/criar/:id",
  authRequired,
  authenticateJwt,
  checkData,
  eleitorController.store
);
router.get(
  "/eleitores/:id",
  authRequired,
  authenticateJwt,
  eleitorController.eleitoresDaLideranca
);
router.get("/:id", authRequired, authenticateJwt, eleitorController.show);

module.exports = router;
