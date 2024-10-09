const express = require("express");
const router = express.Router();

const demandaController = require("../controllers/demandaController")

router.post("/criar", demandaController.store);
router.get("/todas-as-demandas", demandaController.index);
router.get("/:id", demandaController.show);
router.put("/editar/:id", demandaController.update);

module.exports = router;