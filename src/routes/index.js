const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../libs/passport");

router.get("/", (req, res) => {
  res.send("Hello");
});

router.get("/login/", (req, res) => {
  res.render("auth/login");
});

router.post(
  "/auth/login/",
  passport.authenticate("local-login", {
    successRedirect: "/asistencias/",
    failureRedirect: "/login/",
    failureFlash: true,
  })
);
module.exports = router;
