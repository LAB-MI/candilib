export default function isAdmin(req, res, next) {
  if (req.userLevel === 1) {
    return next();
  }
  res
    .status(401)
    .send({ auth: false, message: 'Erreur de vérification Token.' });
}
