const express = require("express");
const router = express.Router();
const db = require("../database/connection");
const helper = require("../libs/helpers");

// render de la vista para agregar un nuevo usuario
router.get("/agregar/", async (req, res) => {
  const workers = await db.query(
    "SELECT id_worker AS id, CONCAT(name,' ',last_name) AS fullname FROM workers WHERE state = 1"
  );
  res.render("users/newuser", { workers });
});

// proceso de registro de usuario
router.post("/agregar/", async (req, res) => {
  const { person, username, password } = req.body;
  const hash = await helper.encryptPass(password);
  try {
    const row = await db.query(
      "INSERT INTO users (id_worker,username, password, is_habilited) VALUES(?,?,?,1)",
      [person, username, hash]
    );

    req.flash("success", "Usuario Registrado");
    res.redirect("/usuarios/agregar/");
  } catch (error) {
    req.flash("falied", "Operacion Fallida");
    res.redirect("/usuarios/agregar/");
  }
});

// render de la vista para listar los usuarios
router.get("/", async (req, res) => {
  const users = await db.query(
    "SELECT u.id_user AS id, u.username, u.is_habilited, concat(w.name, ' ',w.last_name) AS person FROM users AS u, workers AS w WHERE u.id_worker = w.id_worker"
  );
  res.render("users/listuser", { users });
});

// funcion para desactivar usuarios
router.get("/desactivar/:id", async (req, res) => {
  const users = await db.query("UPDATE users SET is_habilited = 0");
  req.flash("success", "Usuario desactivado con Exito");
  res.redirect("/usuarios/");
});

// funcion para activar usuarios
router.get("/activar/:id", async (req, res) => {
  const { id } = req.params;
  await db.query("UPDATE users SET is_habilited = 1");
  req.flash("success", "Usuario activado con Exito");
  res.redirect("/usuarios/");
});
module.exports = router;
