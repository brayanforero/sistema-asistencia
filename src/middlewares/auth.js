module.exports = {
  isLoginActive(req, res, next) {
    if (req.isAuthenticated()) return res.redirect("/asistencias/");
    return next();
  },
  isNotLogin(req, res, next) {
    if (!req.isAuthenticated()) {
      req.flash("falied", "Estimado usuario, no has iniciado Sesión");
      return res.redirect("/login/");
    }
    return next();
  },
};
