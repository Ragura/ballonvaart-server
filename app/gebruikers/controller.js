const Gebruiker = require("./model");

exports.list = async (req, res) => {
  const gebruikers = await Gebruiker.find();
  return res.send(gebruikers);
};

exports.create = async (req, res) => {
  const data = req.body;

  const bestaandeGebruiker = await Gebruiker.find({email: data.email});
  
  if (bestaandeGebruiker.length) {
    return res.badRequest(`Gebruiker met e-mailadres ${data.email} bestaat al.`);
  }
  

  const nieuweGebruiker = new Gebruiker(data);

  await nieuweGebruiker.save();
  return res.send(nieuweGebruiker);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!id || !data) {
    return res.badRequest();
  }

  const bestaandeGebruiker = await Gebruiker.find({email: data.email});
  if (bestaandeGebruiker.length) {
  return res.badRequest(`Gebruiker met e-mailadres ${data.email} bestaat al.`);
  }

  const gebruiker = await Gebruiker.findByIdAndUpdate(id, data, {new: true});
  return res.send(gebruiker);
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.badRequest();
  }

  await Gebruiker.findByIdAndDelete(id);
  return res.send("Gebruiker verwijderd");
};