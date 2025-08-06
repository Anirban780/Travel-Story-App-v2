const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticate = require("../middlewares/authMiddleware");

router.post("/create", authenticate, userController.createUser);
router.get("/activity/:userId", authenticate, userController.getUserActivity);

module.exports = router;
