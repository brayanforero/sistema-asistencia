const express = require("express");
const router = express.Router();
const { isLoginActive } = require("../middlewares/auth");
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/login/", isLoginActive, (req, res) => {
  res.render("auth/login");
});

module.exports = router;
