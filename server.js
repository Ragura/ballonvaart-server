require("dotenv-flow").config({
  path: "./env"
});
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


require("./config/mongoose");
require("./app")(app);

const port = process.env.PORT || 7000;

app.use((req, res) => {
  return res.status(404).send("Bron niet gevonden");
});

app.listen(port, () => {
  console.log(`Server luistert op poort ${port}`);
});
