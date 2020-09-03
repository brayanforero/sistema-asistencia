const express = require("express");
const router = express.Router();
const db = require("../database/connection");
// render de vista para agregar una nueva jornada
router.get("/add", (req, res) => {
  res.render("journals/newjournal");
});

// agregar una nueva jornada laboral
router.post("/add", async (req, res) => {
  const { day, month, year } = req.body;
  const date = `${year}-${month}-${day}`;
  await db.query("INSERT INTO journal VALUES (NULL, ?)", [date]);
  req.flash("success", "Jornada agregada con exito");
  res.redirect("/journals/add");
});

// render de vista lista de jornadas
router.get("/", async (req, res) => {
  const rows = await db.query(
    "SELECT id_journal AS id, created_at AS date FROM journal"
  );
  res.render("journals/listjournal", { journals: rows });
});

// Elimina jornadas
router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;

  await db.query("DELETE FROM journal WHERE id_journal = ? LIMIT 1", [id]);
  req.flash("success", "Jornada eliminida con exito");
  res.redirect("/journals/");
});

module.exports = router;
