export default function isAdmin(req, res, next) {
  if (req.userLevel === 1) {
    return next();
  }
  res
    .status(500)
    .send({ auth: false, message: 'Erreur de verification Token.' });
}
