const express = require("express");
const router = express.Router();
const db = require("../database/connection");

// render vista lista de cargos
router.get("/", async (req, res) => {
  const rows = await db.query("SELECT id_position AS id, name FROM positions");
  res.render("positions/listposition", { positions: rows });
});

// render de vista para agregar un nuevo cargo
router.get("/agregar/", (req, res) => {
  res.render("positions/newposition");
});

// agrega nuevo cargo
router.post("/agregar/", async (req, res) => {
  const { cargo } = req.body;

  await db.query("INSERT INTO positions SET name = ?", [cargo]);
  req.flash("success", "Cargo agregado con Exito");
  res.redirect("/cargos/");
});

// render de la vista para actualziar el cargo
router.get("/actualizar/:id", async (req, res) => {
  const { id } = req.params;

  const rows = await db.query(
    "SELECT id_position AS id,name FROM positions WHERE id_position = ? LIMIT 1",
    [id]
  );

  res.render("positions/updateposition", { position: rows[0] });
});

// actulizar el cargo
router.post("/actualizar/", async (req, res) => {
  const { id, cargo } = req.body;
  await db.query("UPDATE positions SET name = ? WHERE id_position = ?", [
    cargo,
    id,
  ]);
  req.flash("success", "Cargo actualizado con Exito");
  res.redirect("/cargos/");
});

// eliminar cargo
router.get("/eliminar/:id", async (req, res) => {
  const { id } = req.params;
  const rows = await db.query(
    "DELETE FROM positions WHERE id_position = ? LIMIT 1",
    [id]
  );

  req.flash("success", "Cargo elimanado con Exito");
  res.redirect("/cargos/");
});
module.exports = router;
