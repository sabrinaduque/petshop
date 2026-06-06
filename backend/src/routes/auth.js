const express = require("express");
const router = express.Router();
const db = require("../database/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const result = await db.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  const user = result.rows[0];

  if (!user) {
    return res.status(401).json({
      message: "Usuário inválido"
    });
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatch) {
    return res.status(401).json({
      message: "Senha inválida"
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    "secret_key",
    {
      expiresIn: "1d"
    }
  );

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email
    }
  });

});

module.exports = router;