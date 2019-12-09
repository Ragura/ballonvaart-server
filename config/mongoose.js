const mongoose = require("mongoose");
const logger = require("../utils/logger");

const connectionString = "mongodb+srv://" + 
                         `${process.env.DB_USER}:${process.env.DB_PASSWORD}` +
                         `@cluster0-kruq0.mongodb.net/${process.env.DB_NAME}` + 
                         "?retryWrites=true&w=majority";


mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useFindAndModify: false,
  // useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  logger.info("Connectie met MongoDB gelegd.");
}).catch(err => {
  logger.error("Connectie met MongoDB kon niet worden gelegd!\n" + err.stack);
  console.log(err.stack);
  process.exit(1);
});