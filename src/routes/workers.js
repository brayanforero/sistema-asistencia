const express = require("express");
const router = express.Router();
const db = require("../database/connection");
const { isNotLogin } = require("../middlewares/auth");
// lista el personal
router.get("/", isNotLogin, async (req, res) => {
  const workers = await db.query(
    "SELECT  wr.id_worker AS id, wr.worker_document AS doc, wr.name, wr.last_name, pos.name AS cargo, state FROM workers AS wr INNER JOIN positions AS pos	ON pos.id_position = wr.id_position WHERE wr.isshow = 1"
  );
  res.render("workers/listworker", { workers });
});

// vista para agregar un nuevo personal
router.get("/agregar/", isNotLogin, async (req, res) => {
  const positions = await db.query("SELECT id_position, name FROM positions");
  res.render("workers/newworker", {
    positions,
  });
});

// registro del personal
router.post("/agregar/", isNotLogin, async (req, res) => {
  const { document, name, lastname, position } = req.body;

  const result = await db.query(
    "INSERT INTO workers (worker_document, name, last_name, id_position) VALUES (?,?,?,?)",
    [document, name, lastname, position]
  );
  req.flash("success", "Regitro completado");
  res.redirect("/personal/");
});

// eliminar un registro
router.get("/eliminar/:id", isNotLogin, async (req, res) => {
  const { id } = req.params;

  await db.query("UPDATE workers SET isshow = 0 WHERE id_worker = ? ", [id]);
  req.flash("success", "Eliminacion completada");
  res.redirect("/personal/");
});

// vista actualizacion de datos del personal
router.get("/actualizar/:id", isNotLogin, async (req, res) => {
  const { id } = req.params;
  const rows = await db.query(
    "SELECT  wr.id_worker AS id,wr.worker_document AS doc , wr.name, wr.last_name, pos.name AS cargo, state FROM workers AS wr INNER JOIN positions AS pos	ON pos.id_position = wr.id_position WHERE wr.id_worker = ?",
    [id]
  );
  const positions = await db.query("SELECT id_position, name FROM positions");
  const worker = rows[0];
  res.render("workers/updateworker", {
    worker,
    positions,
    cargo: worker.cargo,
  });
});

// actualizacion de datos
router.post("/actualizar/", isNotLogin, async (req, res) => {
  const { name, lastname, id, document } = req.body;

  await db.query(
    "UPDATE workers SET name= ?, last_name = ?, worker_document = ? WHERE id_worker = ? LIMIT 1",
    [name, lastname, document, id]
  );
  req.flash("success", "Actualizacion exitosa");
  res.redirect("/personal/");
});

// cambio de estado
router.get("/cambio/estado/:id", isNotLogin, async (req, res) => {
  const { id } = req.params;
  await db.query("UPDATE workers SET state = !state WHERE id_worker = ?", [id]);
  req.flash("success", "Cambio de estado Realizado");
  res.redirect("/personal/");
});
module.exports = router;
