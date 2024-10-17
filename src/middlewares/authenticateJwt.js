const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ errors: "Token inválido ou não informado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    req.user = decoded;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errors: "Ocorreu um erro desconhecido, tente novamente mais tarde"
    });
  }
};

module.exports = authenticateJWT;
