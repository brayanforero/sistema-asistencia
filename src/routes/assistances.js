const express = require("express");
const router = express.Router();
const db = require("../database/connection");
// render de la vista lista de entradas

router.get("/entrance/", async (req, res) => {
  const entrances = await db.query(
    "SELECT en.id_entrance AS id,wrk.worker_document AS doc,concat(wrk.name, ' ', wrk.last_name) AS person,wrk.state,en.is_assist,time_format(en.time_entrance, '%h:%i %p') AS time,en.observation AS ob,date_format(jor.created_at,'%d/%m/%Y') AS journal FROM entrances AS en INNER JOIN workers AS wrk	ON wrk.id_worker = en.id_worker INNER JOIN journal AS jor ON jor.id_journal = en.id_journal"
  );
  res.render("assistances/entrances", { entrances });
});
// render de la vista para agregar una entrada
router.get("/entrance/add", async (req, res) => {
  const journals = await db.query(
    "SELECT id_journal AS id, date_format(created_at,'%d-%m-%Y') AS fecha FROM journal;"
  );
  const workers = await db.query(
    "SELECT id_worker AS id, CONCAT(name,' ',last_name ) AS fullname FROM workers;"
  );
  res.render("assistances/newentrance", { journals, workers });
});

// proceso para agregar una nueva entrada
router.post("/entrance/add", async (req, res) => {
  let { journal, worker, assist, observation } = req.body;

  try {
    const rows = await db.query(
      "INSERT INTO entrances (id_journal, id_worker, is_assist, observation, time_entrance) VALUES(?,?,?,?,CURRENT_TIME)",
      [journal, worker, assist, observation]
    );
    req.flash("success", "Operacion completa con Exito");
    res.redirect("/assistances/entrance/add");
  } catch (error) {
    req.flash("falied", "Operacion fallida");
    res.redirect("/assistances/entrance/add");
  }
});

// render de vista lista de salidas
router.get("/exit", async (req, res) => {
  const departures = await db.query(
    "SELECT de.id_departure AS id,wrk.worker_document AS doc,concat(wrk.name, ' ', wrk.last_name) AS person,wrk.state,de.is_assist,time_format(de.time_entrance, '%h:%i %p') AS time,de.observation AS ob,date_format(jor.created_at,'%d/%m/%Y') AS journal FROM departures AS de INNER JOIN workers AS wrk	ON wrk.id_worker = de.id_worker INNER JOIN journal AS jor ON jor.id_journal = de.id_journal"
  );
  res.render("departures/exits.hbs", { departures });
});

// render de vista para agregar una salida

router.get("/exit/add", async (req, res) => {
  const journals = await db.query(
    "SELECT id_journal AS id, date_format(created_at,'%d-%m-%Y') AS fecha FROM journal;"
  );
  const workers = await db.query(
    "SELECT id_worker AS id, CONCAT(name,' ',last_name ) AS fullname FROM workers;"
  );
  res.render("departures/newexit", { journals, workers });
});

// proceso para agregar una salida
router.post("/exit/add", async (req, res) => {
  let { journal, worker, assist, observation } = req.body;

  try {
    const rows = await db.query(
      "INSERT INTO departures (id_journal, id_worker, is_assist, observation, time_entrance) VALUES(?,?,?,?,CURRENT_TIME)",
      [journal, worker, assist, observation]
    );
    req.flash("success", "Operacion completa con Exito");
    res.redirect("/assistances/exit/add");
  } catch (error) {
    req.flash("falied", "Operacion fallida");
    res.redirect("/assistances/exit/add");
  }
});

module.exports = router;
