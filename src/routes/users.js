const express = require("express");
const router = express.Router();
const db = require("../database/connection");
const helper = require("../libs/helpers");
const { isNotLogin } = require("../middlewares/auth");

// render de la vista para agregar un nuevo usuario
router.get("/agregar/", isNotLogin, async (req, res) => {
  const workers = await db.query(
    "SELECT id_worker AS id, CONCAT(name,' ',last_name) AS fullname FROM workers WHERE state = 1"
  );
  res.render("users/newuser", { workers });
});

// proceso de registro de usuario
router.post("/agregar/", isNotLogin, async (req, res) => {
  const { person, username, password } = req.body;
  const hash = await helper.encryptPass(password);
  try {
    const row = await db.query(
      "INSERT INTO users (id_worker,username, password, is_habilited) VALUES(?,?,?,1)",
      [person, username, hash]
    );

    req.flash("success", "Usuario Registrado");
    res.redirect("/usuarios/");
  } catch (error) {
    req.flash("falied", "Operacion Fallida");
    res.redirect("/usuarios/agregar/");
  }
});

// render de la vista para listar los usuarios
router.get("/", isNotLogin, async (req, res) => {
  const users = await db.query(
    "SELECT u.id_user AS id, u.username, u.is_habilited, concat(w.name, ' ',w.last_name) AS person FROM users AS u, workers AS w WHERE u.id_worker = w.id_worker"
  );
  res.render("users/listuser", { users });
});

// funcion para desactivar usuarios
router.get("/desactivar/:id", isNotLogin, async (req, res) => {
  const { id } = req.params;
  const users = await db.query(
    "UPDATE users SET is_habilited = 0 WHERE id_user = ?",
    [id]
  );
  try {
    req.flash("success", "Usuario desactivado con Exito");
    res.redirect("/usuarios/");
  } catch (error) {
    req.flash("falied", "No se pudo completar su Operacion");
    res.redirect("/usuarios/");
  }
});

// funcion para activar usuarios
router.get("/activar/:id", isNotLogin, async (req, res) => {
  const { id } = req.params;
  await db.query("UPDATE users SET is_habilited = 1 WHERE id_user = ?", [id]);
  try {
    req.flash("success", "Usuario activado con Exito");
    res.redirect("/usuarios/");
  } catch (error) {
    req.flash("falied", "No se pudo completar su Operacion");
    res.redirect("/usuarios/");
  }
});

// funcion para desactivar usuarios
router.get("/eliminar/:id", isNotLogin, async (req, res) => {
  const { id } = req.params;
  try {
    const users = await db.query("DELETE FROM users WHERE id_user = ?", [id]);
    req.flash("success", "Usuario eliminado con Exito");
    res.redirect("/usuarios/");
  } catch (error) {
    req.flash("falied", "Operacion Fallida");
    res.redirect("/usuarios/");
  }
});

router.get("/changepassword/:id", isNotLogin, async (req, res) => {
  const { id } = req.params;
  res.render("users/changePassword", { id });
});

router.post("/changepassword/", isNotLogin, async (req, res) => {
  const { id, password, password2 } = req.body;

  if (password !== password2) {
    req.flash("falied", "Las contraseñas no coinciden");
    return res.redirect(`/usuarios/changepassword/${id}`);
  }

  try {
    const hash = await helper.encryptPass(password);
    await db.query("UPDATE users SET password = ? WHERE id_user = ?", [
      hash,
      id,
    ]);
    req.flash("success", "Las contraseña se cambio con exito");
    res.redirect(`/usuarios/`);
  } catch (error) {
    req.flash("falied", "Operacion fallida");
    res.redirect(`/usuarios/changepassword/${id}`);
  }
});
module.exports = router;
