const jwt = require("jsonwebtoken");
require('dotenv').config()

const tokenVerify = (req, res, next) => {
  //token verification logic here

  //get bearer token from "headers" property of req object
  const bearerToken = req.headers.authorization;
  //console.log(bearerToken)
  //if bearer token not found
  if (bearerToken === undefined) {
    return res.send({ message: "Unauthorised access" });
  }
  //extract token frm bearer token
  const token = bearerToken.split(" ")[1];
  //verify the token
  try {
    let decode = jwt.verify(token, process.env.SECRET_KEY);
    next();
    // console.log(decode)
  } catch (err) {
    res.send({ message: "token expired. Plz relogin to continue" });
  }
};

module.exports = tokenVerify;
