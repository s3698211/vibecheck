const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  //check if there is any token sent from the request
  const accessToken = req.header("accessToken");
  console.log("middleWare", accessToken);
  console.log(process.env.SECRET);
  if (!accessToken)
    return res.status(400).send({ error: "User not logged in" });

  //verify the token
  try {
    const validToken = jwt.verify(accessToken, process.env.SECRET); //return true or false
    req.user = validToken;
    //if the token is verified, process the request
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.status(400).send({ error: err });
  }
};

// const authorizeRole = (req,res,next) => {
//   const
// }

module.exports = { validateToken };
