const routerBoekingen = require("./boekingen/router");
const routerBerichten = require("./berichten/router");

module.exports = (app) => {
  app.use("/boekingen", routerBoekingen);
  app.use("/berichten", routerBerichten);
}