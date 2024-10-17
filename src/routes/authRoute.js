const express = require("express");
const router = express.Router();

const checkData = require("../middlewares/checkDataUserCreate");
const authController = require("../controllers/authController");

router.post("/", authController.login);
router.post("/sair", authController.logout);

module.exports = router;
