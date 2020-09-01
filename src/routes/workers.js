const express = require("express");
const router = express.Router();
const db = require("../database/connection");

router.get("/", async (req, res) => {
  const workers = await db.query(
    "SELECT id_worker AS id,worker_document AS doc , name, last_name, id_position AS position, state FROM workers"
  );
  res.render("workers/listworker", { workers });
});
router.get("/add", async (req, res) => {
  const positions = await db.query("SELECT id_position, name FROM positions");
  res.render("workers/newworker", {
    positions,
  });
});

router.post("/add", async (req, res) => {
  const { document, name, lastname, position } = req.body;

  const result = await db.query(
    "INSERT INTO workers (worker_document, name, last_name, id_position) VALUES (?,?,?,?)",
    [document, name, lastname, position]
  );
  req.flash("success", "Regitro completado");
  res.redirect("/workers/add");
});
module.exports = router;
