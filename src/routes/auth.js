const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../libs/passport");
// autenticacion para inicio de sesion
router.post(
  "/login/",
  passport.authenticate("local-login", {
    successRedirect: "/asistencias/",
    failureRedirect: "/login/",
    failureFlash: true,
  })
);
router.get("/logout/", (req, res) => {
  req.logOut();
  req.flash("success", "Tu sesion se ha cerrado con Exito");
  res.redirect("/login/");
});

module.exports = router;
