const express = require("express");
const router = express.Router();

const checkData = require("../middlewares/checkDataEleitorAndLiderancaCreate");
const eleitorController = require("../controllers/eleitorController");
const authRequired = require("../middlewares/authRequired");
const authenticateJwt = require("../middlewares/authenticateJwt");

router.get("/todos-os-eleitores", authRequired, authenticateJwt, eleitorController.index);
router.post(
  "/criar/:id",

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
