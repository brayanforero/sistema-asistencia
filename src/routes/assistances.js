const express = require("express");
const router = express.Router();
const db = require("../database/connection");
router.get("/entrance/add", async (req, res) => {
  const journals = await db.query(
    "SELECT id_journal AS id, date_format(created_at,'%d-%m-%Y') AS fecha FROM journal;"
  );
  const workers = await db.query(
    "SELECT id_worker AS id, CONCAT(name,' ',last_name ) AS fullname FROM workers;"
  );
  res.render("assistances/newentrance", { journals, workers });
});
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
