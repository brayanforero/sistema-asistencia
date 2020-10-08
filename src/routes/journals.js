const express = require("express");
const router = express.Router();
const db = require("../database/connection");
const { isNotLogin } = require("../middlewares/auth");
// render de vista para agregar una nueva jornada
router.get("/agregar/", isNotLogin, (req, res) => {
  res.render("journals/newjournal");
});

// agregar una nueva jornada laboral
router.post("/agregar/", isNotLogin, async (req, res) => {
  const { day, month, year } = req.body;
  const date = `${year}-${month}-${day}`;
  await db.query("INSERT INTO journal VALUES (NULL, ?, 0)", [date]);
  req.flash("success", "Jornada agregada con exito");
  res.redirect("/jornadas/");
});

// render de vista lista de jornadas
router.get("/", isNotLogin, async (req, res) => {
  const rows = await db.query(
    "SELECT id_journal AS id, date_format(created_at,'%d/%m/%Y') AS date, IF(is_closed, 'si', 'no') AS close FROM journal"
  );
  res.render("journals/listjournal", { journals: rows });
});

// Elimina jornadas
router.get("/eliminar/:id", isNotLogin, async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM journal WHERE id_journal = ? LIMIT 1", [id]);
    req.flash("success", "Jornada eliminida con exito");
    res.redirect("/jornadas/");
  } catch (error) {
    req.flash("falied", "Operacion Fallida");
    res.redirect("/jornadas/");
  }
});

// cerrar jornada - marcar como terminada

router.get("/cerrar/:id", isNotLogin, async (req, res) => {
  const { id } = req.params;

  try {
    await db.query(
      "UPDATE journal SET is_closed = 1 WHERE id_journal = ? LIMIT 1",
      [id]
    );
    req.flash("success", `Jornada ${id} se ha cerrado con Exito`);
    res.redirect("/jornadas/");
  } catch (error) {
    req.flash("falied", `No se pudo completar su Operacion`);
    res.redirect("/jornadas/");
  }
});

module.exports = router;
