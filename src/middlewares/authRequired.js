function authRequired(req, res, next) {
  const user = req.session.userId;

  if (!user) {
    return res.status(401).json({ errors: "Você precisa estar autenticado!" });
  }

  next();
}

module.exports = authRequired;
