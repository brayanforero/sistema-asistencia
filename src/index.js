const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const exhbs = require("express-handlebars");

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
app.set("public", express.static(path.join(__dirname, "public")));

// GLOBAL VARS
// app.use((req, res, next) => {
//   next();
// });
// MIDDELWARES
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cookieParser("system college"));
// app.use(
//   session({
//     secret: "system college",
//     resave: true,
//     saveUninitialized: true,
//     cookie: { secure: true, maxAge: 3600 },
//   })
// );

// ROUTES
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

// HANDDLER 404
app.use((req, res) => {
  res.status(404).render("404");
});
app.listen(app.get("port"), () => {
  console.log(`SERVER ON PORT ${app.get("port")}`);
});
