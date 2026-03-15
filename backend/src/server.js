const express = require("express");
const cors = require("cors");

const petsRoutes = require("./routes/pets");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/pets", petsRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});