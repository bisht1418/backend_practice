const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
      if (decoded) {
        req.body.userId = decoded.userData._id;
        req.body.userName = decoded.userData.username;
        next();
      }
    } catch (error) {
      res.status(401).send({ error: "Invalid token" });
    }
  } else {
    res.status(401).send({ error: "Please login" });
  }
};
module.exports = { auth };
