const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const exhbs = require("express-handlebars");
const MySQLStore = require("express-mysql-session");
const database = require("./database/config");
const passport = require("passport");
require("dotenv").config();

// SETTINGS
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exhbs({
    defaultLayout: "template",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./libs/hbs"),
  })
);
app.set("view engine", ".hbs");

// STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

// MIDDELWARES
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());
app.use(cookieParser("system college"));
app.use(
  session({
    secret: "system college",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// GLOBAL VARS
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.falied = req.flash("falied");
  app.locals.user = req.user;
  next();
});

// ROUTES
app.use("/", require("./routes/index"));
app.use("/personal", require("./routes/workers"));
app.use("/cargos/", require("./routes/positions"));
app.use("/jornadas/", require("./routes/journals"));
app.use("/asistencias/", require("./routes/assistances"));
app.use("/usuarios/", require("./routes/users"));
app.use("/auth/", require("./routes/auth"));
// HANDDLER 404
app.use((req, res) => {
  res.status(200).render("404");
});
app.listen(app.get("port"), () => {
  console.log(`SERVER ON PORT ${app.get("port")}`);
});
