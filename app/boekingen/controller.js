const Boeking = require("./model");

exports.list = async (req, res) => {
  try {
    const boekingen = await Boeking.find();
    return res.send(boekingen);
  } catch (err) {
    return res.status(500).send("Serverfout");
  }
}

exports.create = async (req, res) => {
  const data = req.body;
  const nieuweBoeking = new Boeking(data);

  try {
    await nieuweBoeking.save();
    return res.send(nieuweBoeking);
  } catch (err) {
    return res.status(500).send("Maken van boeking mislukt!");
  }
}

exports.update = async (req, res) => {
   const { id } = req.params;
   const data = req.body;

   if (!id || !data) {
     return res.status(400).send("Ongeldige aanvraag.");
   }

   try {
     const boeking = await Boeking.findByIdAndUpdate(id, data, {new: true});
     return res.send(boeking);
   } catch (err) {
     return res.status(500).send("Updaten van boeking mislukt.");
   }
}

exports.delete = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("Ongeldig id");
  }

  try {
    await Boeking.findByIdAndDelete(id);
    return res.send("Boeking verwijderd");
  } catch (err) {
    return res.status(500).send("Boeking verwijderen mislukt.");
  }
}