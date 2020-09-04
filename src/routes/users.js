const express = require("express");
const router = express.Router();
const db = require("../database/connection");
const helper = require("../libs/helpers");
const { user } = require("../database/config");

// render de la vista para agregar un nuevo usuario
router.get("/add", async (req, res) => {
  const workers = await db.query(
    "SELECT id_worker AS id, CONCAT(name,' ',last_name) AS fullname FROM workers WHERE state = 1"
  );
  res.render("users/newuser", { workers });
});

// proceso de registro de usuario
router.post("/add", async (req, res) => {
  const { person, username, password } = req.body;
  const hash = await helper.encryptPass(password);
  try {
    const row = await db.query(
      "INSERT INTO users (id_worker,username, password, is_habilited) VALUES(?,?,?,1)",
      [person, username, hash]
    );

    req.flash("success", "Usuario Registrado");
    res.redirect("/users/add");
  } catch (error) {
    req.flash("falied", "Operacion Fallida");
    res.redirect("/users/add");
  }
});
module.exports = router;
