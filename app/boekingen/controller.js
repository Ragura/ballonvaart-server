const Boeking = require("./model");

exports.list = async (req, res) => {
  try {
    const boekingen = await Boeking.find();
    return res.send(boekingen);
  } catch (err) {
    return res.status(500).send("Serverfout");
  }
}