const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello");
});

router.get("/login/", (req, res) => {
  res.render("auth/login");
});

module.exports = router;
