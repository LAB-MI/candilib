import jwt from 'jsonwebtoken';
import serverConfig from '../config';

export default function verifyToken(req, res, next) {
  if (req.url === '/candidats/login' || req.url === '/candidats/signup' || req.url === '/export' || req.url === '/candidats') {
    return next();
  }

  const token = req.headers['x-access-token'] || req.query.token;
  if (!token) {
    return res.status(403)
      .send({ auth: false, message: 'Pas de Token ' });
  }

  jwt.verify(token, serverConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(500)
        .send({ auth: false, message: 'Erreur de verification Token.' });
    }
    req.userId = decoded.id;
    next();
  });
}
