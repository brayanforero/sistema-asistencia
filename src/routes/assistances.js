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

  console.log(req.body);
  try {
    const rows = await db.query(
      "INSERT INTO entrances (id_journal, id_worker, is_assist, observation, time_entrance) VALUES(?,?,?,?,CURRENT_TIME)",
      [journal, worker, assist, observation]
    );
    req.flash("success", "Operacion completa con Exito");
    res.redirect("/assistances/entrance/add");
  } catch (error) {
    console.log(error);
    req.flash("falied", "Operacion fallida");
    res.redirect("/assistances/entrance/add");
  }
});
module.exports = router;
