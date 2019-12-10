require("dotenv-flow").config({
  path: "./env"
});
const history = require("connect-history-api-fallback");
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

// Serveer alle statische bestanden in de map "client" via static middleware
const staticFileMiddleware = express.static("client/dist");
app.use(staticFileMiddleware);
// Vue applicaties met vue-router in history mode hebben een extra workaround nodig
app.use(history());
app.use(staticFileMiddleware);

require("./app")(app);

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
