const express = require("express");
const router = express.Router();

const demandaController = require("../controllers/demandaController");
const authRequired = require("../middlewares/authRequired");
const authenticateJwt = require("../middlewares/authenticateJwt");

router.post("/criar", authRequired, authenticateJwt, demandaController.store);
router.get(
  "/todas-as-demandas",
  authRequired,
  authenticateJwt,
  demandaController.index
);
router.get("/:id", authRequired, authenticateJwt, demandaController.show);
router.put(
  "/editar/:id",
  authRequired,
  authenticateJwt,
  demandaController.update
);

module.exports = router;
