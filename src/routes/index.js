const express = require("express");
const router = express.Router();
const { isLoginActive } = require("../middlewares/auth");
router.get("/", (req, res) => {
  res.send("Hello");
});

router.get("/login/", isLoginActive, (req, res) => {
  res.render("auth/login");
});

module.exports = router;
