const express = require("express");
const cors = require("cors");

const petsRoutes = require("./routes/pets");
const authRoutes = require("./routes/auth");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/pets", petsRoutes);

app.listen(3333, () => {
  console.log("Servidor rodando na porta 3333");
});


app.use("/auth", authRoutes);