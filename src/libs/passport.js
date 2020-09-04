const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../database/connection");
const helper = require("./helpers");

const Strategy = new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true,
  },
  async (req, username, password, done) => {
    const rows = await db.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (rows.length > 0) {
      const user = rows[0];

      const validPassword = await helper.matchPassword(password, user.password);

      if (!validPassword) {
        return done(
          null,
          false,
          req.flash("falied", "Los datos ingresados son incorrectos")
        );
      }

      return done(null, user);
    }

    return done(
      null,
      false,
      req.flash("falied", "Los datos ingresados son incorrectos")
    );
  }
);

passport.use("local-login", Strategy);

// serializacion
passport.serializeUser((user, done) => {
  done(null, user);
});

// deserializacion
passport.deserializeUser((user, done) => {
  done(null, user);
});
