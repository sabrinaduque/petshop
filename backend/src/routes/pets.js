const express = require("express");
const router = express.Router();
const db = require("../database/connection");

// GET todos pets
router.get("/", async (req, res) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  const petsResult = await db.query(
    "SELECT * FROM pets ORDER BY id LIMIT $1 OFFSET $2",
    [limit, offset]
  );

  const totalResult = await db.query("SELECT COUNT(*) FROM pets");

  const total = parseInt(totalResult.rows[0].count);
  const totalPages = Math.ceil(total / limit);

  res.json({
    pets: petsResult.rows,
    pagination: {
      page,
      limit,
      total,
      totalPages
    }
  });

});

// GET pet por id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await db.query("SELECT * FROM pets WHERE id = $1", [id]);
  res.json(result.rows[0]);
});

// POST criar pet
router.post("/", async (req, res) => {
  const { nome, especie, raca, idade, peso, nome_dono, telefone_dono, status } = req.body;

  const result = await db.query(
    `INSERT INTO pets 
    (nome, especie, raca, idade, peso, nome_dono, telefone_dono, status)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [nome, especie, raca, idade, peso, nome_dono, telefone_dono, status]
  );

  res.json(result.rows[0]);
});

// PUT editar pet
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, especie, raca, idade, peso, nome_dono, telefone_dono, status } = req.body;

  await db.query(
    `UPDATE pets SET
     nome=$1, especie=$2, raca=$3, idade=$4, peso=$5,
     nome_dono=$6, telefone_dono=$7, status=$8
     WHERE id=$9`,
    [nome, especie, raca, idade, peso, nome_dono, telefone_dono, status, id]
  );

  res.json({ message: "Pet atualizado" });
});

// DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM pets WHERE id=$1", [id]);
  res.json({ message: "Pet deletado" });
});

module.exports = router;