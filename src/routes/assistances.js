const express = require("express");
const router = express.Router();
const db = require("../database/connection");
router.get("/entrance", async (req, res) => {
  const journals = await db.query(
    "SELECT id_journal AS id, CONCAT(date_year,'-',date_month,'-',date_day) AS fecha FROM journal;"
  );
  const workers = await db.query(
    "SELECT id_worker AS id, CONCAT(name,' ',last_name ) AS fullname FROM workers;"
  );
  res.render("assistances/newentrance", { journals, workers });
});
router.post("/entrance", async (req, res) => {
  let { journal, worker, assist, observation } = req.body;
  if (observation !== "") observation = "N/O";

  const rows = await db.query(
    "INSERT INTO assists (id_journal, id_worker,is_assist, observation) VALUES(?,?,?,?)",
    [journal, worker, assist, observation]
  );
  req.flash("success", "Operacion completa con Exito");
  res.redirect("/assistances/entrance/");
});
module.exports = router;
