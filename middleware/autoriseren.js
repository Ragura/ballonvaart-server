const jwt = require("jsonwebtoken");


const verifyJwt = (req, res, next) => {
  let token = req.headers["authorization"] || req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send("Geen autorisatietoken meegegeven.");
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trimStart();
  } else {
    return res.status(401).send("Ongeldig autorisatietoken.");
  }

  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err && err.name === "TokenExpiredError") {
      return res.status(401).send("Autorisatietoken vervallen.");
    } else if (err) {
      return res.unauthorized();
    }

    req.gebruiker = decoded.gebruiker;
    return next();   
  });
};

const autoriseren = (rollen = []) => {
  return [verifyJwt, (req, res, next) => {
    if (rollen.length && !rollen.some(rol => req.gebruiker.rol.includes(rol))) {
      return res.forbidden();
    }
    
    next();
  }];
};

module.exports = autoriseren;


