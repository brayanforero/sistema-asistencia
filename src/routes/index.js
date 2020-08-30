const express = require("express");
const router = express.Router();
const db = require("../database/connection");
router.get("/", (req, res) => {
  res.render("home", { username: "brayan" });
});
module.exports = router;
