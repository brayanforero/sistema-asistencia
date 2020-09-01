const express = require("express");
const router = express.Router();
const db = require("../database/connection");

// lista el personal
router.get("/", async (req, res) => {
  const workers = await db.query(
    "SELECT  wr.id_worker AS id, wr.worker_document AS doc, wr.name, wr.last_name, pos.name AS cargo, state FROM workers AS wr INNER JOIN positions AS pos	ON pos.id_position = wr.id_position"
  );
  res.render("workers/listworker", { workers });
});
// vista para agregar un nuevo personal
router.get("/add", async (req, res) => {
  const positions = await db.query("SELECT id_position, name FROM positions");
  res.render("workers/newworker", {
    positions,
  });
});

// registro del personal
router.post("/add", async (req, res) => {
  const { document, name, lastname, position } = req.body;

  const result = await db.query(
    "INSERT INTO workers (worker_document, name, last_name, id_position) VALUES (?,?,?,?)",
    [document, name, lastname, position]
  );
  req.flash("success", "Regitro completado");
  res.redirect("/workers/add");
});

// eliminar un registro
router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;

  await db.query("DELETE FROM workers WHERE id_worker = ? ", [id]);
  req.flash("success", "Eliminacion completada");
  res.redirect("/workers/");
});

// vista actualizacion de datos del personal
router.get("/update/:id", async (req, res) => {
  const { id } = req.params;
  const rows = await db.query(
    "SELECT  wr.id_worker AS id,wr.worker_document AS doc , wr.name, wr.last_name, pos.name AS cargo, state FROM workers AS wr INNER JOIN positions AS pos	ON pos.id_position = wr.id_position WHERE wr.id_worker = ?",
    [id]
  );
  const worker = rows[0];
  res.render("workers/updateworker", { worker });
});

router.post("/update", async (req, res) => {
  const { name, lastname, id, document } = req.body;

  await db.query(
    "UPDATE workers SET name= ?, last_name = ?, worker_document = ? WHERE id_worker = ? LIMIT 1",
    [name, lastname, document, id]
  );
  req.flash("success", "Actualizacion exitosa");
  res.redirect("/workers");
});
module.exports = router;
