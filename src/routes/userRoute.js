const express = require("express");
const router = express.Router();

const checkData = require("../middlewares/checkDataUserCreate");
const userController = require("../controllers/usersController")

router.post("/criar", checkData, userController.store);

module.exports = router