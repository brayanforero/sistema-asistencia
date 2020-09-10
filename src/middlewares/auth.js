module.exports = {
  isLoginActive(req, res, next) {
    if (req.isAuthenticated()) res.redirect("/asistencias/");
    return next();
  },
  isNotLogin(req, res, next) {
    if (!req.isAuthenticated()) {
      req.flash("falied", "Estimado usuario, no has iniciado Sesión");
      res.redirect("/login/");
    }
    return next();
  },
};
