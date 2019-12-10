const Boeking = require("./model");
const dayjs = require("dayjs");
const Gebruiker = require("../gebruikers/model");

exports.list = async (req, res) => {
  const boekingen = await Boeking.find();
  return res.send(boekingen);
};

exports.geboekteData = async (req, res) => {
  const volgendeDatum = dayjs().add(7, "day").startOf("day");
  
  const boekingen = await Boeking.find({
    datum: {
      $gt: volgendeDatum.format()
    }
  }).select("datum moment").sort("datum -moment");
  
  return res.send(boekingen.map(b => {
    return {
      datum: b.datum,
      moment: b.moment
    };
  }));
};

exports.create = async (req, res) => {
  const data = req.body;
  const nieuweBoeking = new Boeking(data);

  await nieuweBoeking.save();
  return res.send(nieuweBoeking);
};

exports.boeken = async (req, res) => {
  const { datum, moment, aantalPersonen, type} = req.body;

  const bestaandeBoeking = await Boeking.findOne({datum, moment});
  if (bestaandeBoeking) {
    return res.badRequest("Er bestaat al een boeking op dit moment");
  }

  const gebruiker = await Gebruiker.findOne({email: req.gebruiker.email});

  const nieuweBoeking = new Boeking({ datum, moment, aantalPersonen, type, gebruiker});

  await nieuweBoeking.save();
  return res.send(nieuweBoeking);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!id || !data) {
    return res.badRequest();
  }

  const boeking = await Boeking.findByIdAndUpdate(id, data, {new: true});
  return res.send(boeking);
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.badRequest();
  }

  await Boeking.findByIdAndDelete(id);
  return res.send("Boeking verwijderd");
};