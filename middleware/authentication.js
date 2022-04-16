const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentification invalid");
  }
  // splitting the header into array (for instance "Bearer: eBxxsajiuauioNOIU"nlkjslikKKD" turns into => ["Bearer", "eBxxsajiuauioNOIU"nlkjslikKKD"]) and we get the second item from the array
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentification invalid");
  }
};
module.exports = auth;
