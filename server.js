require("dotenv-flow").config({
  path: "./env"
});

const logger = require("./utils/logger");
const customResponses = require("./middleware/customResponses");

require("express-async-errors");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use(customResponses);

require("./config/mongoose");
require("./app")(app);

logger.info(process.env.PORT, process.env.DB_USER, process.env.DB_PASSWORD);

const port = process.env.PORT || 7000;

app.use((req, res) => {
  return res.notFound();
});

// eslint-disable-next-line
app.use((err, req, res, next) => {
  logger.error(err);
  return res.serverError();
});

app.listen(port, () => {
  logger.info(`Server luistert op poort ${port}`);
});
