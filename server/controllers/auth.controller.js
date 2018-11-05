import sanitizeHtml from 'sanitize-html';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import serverConfig from '../config';
import sendMagicLink from '../util/sendMagicLink';


export function register(req, res, next) {
  const hashPassowrd = bcrypt.hashSync(req.body.password, 8);
  const {
    email,
    name,
  } = req.body;

  // verify user don't exist

  User.find({
    email,
  }, (err, previousUsers) => {
    if (err) {
      return res.status(500)
        .send({
          success: false,
          message: err.errmsg,
        });
    } else if (previousUsers.length > 0) {
      return res.status(409)
        .send({
          success: false,
          message: 'Error: Account already exist.',
        });
    }


    User.create({
      email: sanitizeHtml(email),
      password: hashPassowrd,
      name: sanitizeHtml(name),
    }, (error, user) => {
      if (error) {
        res.status(500)
          .send('Il y a un problème avec votre demande!');
        next(error);
      } else {
        const token = jwt.sign(
          {
            id: user._id,
          },
          serverConfig.secret,
          {
            expiresIn: 86400,
          },
        );
        res.status(200)
          .send({ auth: true, token });
        next();
      }
    });
  });
}

export function verifyMe(req, res) {
  User.findById(req.userId,
    { password: 0 },
    (err, user) => {
      if (err) {
        return res.status(500)
          .send({ auth: false, message: 'Problème pour retrouver cet utilisateur .' });
      }

      if (!user) {
        return res.status(404)
          .send({ auth: false, message: 'Utilisateur non reconnu.' });
      }

      res.status(200)
        .send(user);
    });
}

export function login(req, res) {
  const {
    email,
  } = req.body;

  User.findOne({ email },
    (err, user) => {
      if (err) {
        return res.status(500)
          .send({ auth: false, message: 'Erreur serveur ' });
      }

      if (!user) {
        return res.status(404)
          .send({ auth: false, message: 'Utilisateur non reconnu. ' });
      }

      // const passwordIsValid = bcrypt.compareSync(password, user.password) check pour passord
      const emailIsValid = email === user.email;

      if (!emailIsValid) {
        return res.status(401)
          .send({ auth: false, token: null });
      }

      const token = jwt.sign(
        {
          id: user._id,
        },
        serverConfig.secret,
        {
          expiresIn: 86400,
        },
      );

      sendMagicLink(user.email, token);
      res.status(200).end();
    });
}


export function validateToken(req, res){

  const token = req.headers['x-access-token'] || req.query.token;
  if (!token) {
      return res.status(403)
      .send({  message: 'Pas de Token ' });
  }

  jwt.verify(token, serverConfig.secret, (err, decoded) => {
    if (err) {
        return res.status(200)
          .send({ isTokenValid:false  });
    }
    res.status(200).send({isTokenValid:true});
  });
}