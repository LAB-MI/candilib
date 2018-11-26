import sanitizeHtml from 'sanitize-html';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import serverConfig from '../config';
import { REDIRECTTOLEVEL } from '../util/redirect2Level';
import { USER_STATUS2EXPIRESIN, USER_STATUS2LEVEL } from '../util/jwt.constant';

export function register(req, res, next) {
  const hashPassowrd = bcrypt.hashSync(req.body.password, 8);
  const { email, name } = req.body;

  // verify user don't exist

  User.find(
    {
      email,
    },
    (err, previousUsers) => {
      if (err) {
        return res.status(500).send({
          success: false,
          message: err.errmsg,
        });
      } else if (previousUsers.length > 0) {
        return res.status(409).send({
          success: false,
          message: 'Error: Account already exist.',
        });
      }

      User.create(
        {
          email: sanitizeHtml(email),
          password: hashPassowrd,
          name: sanitizeHtml(name),
        },
        (error, user) => {
          if (error) {
            res.status(500).send('Il y a un problème avec votre demande!');
            next(error);
          } else {
            const token = jwt.sign(
              {
                id: user._id,
              },
              serverConfig.secret,
              {
                expiresIn: USER_STATUS2EXPIRESIN.candidat(),
              },
            );
            res.status(200).send({ auth: true, token });
            next();
          }
        },
      );
    },
  );
}

export function registerAdmin(req, res, next) {
  const { email, password } = req.body;

  const hashPassowrd = bcrypt.hashSync(password, 8);

  // verify user don't exist

  User.find({ email }, (err, previousUsers) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: err.errmsg,
      });
    } else if (previousUsers.length > 0) {
      return res.status(409).send({
        success: false,
        message: 'Error: Account already exist.',
      });
    }

    User.create(
      {
        email: sanitizeHtml(email),
        password: hashPassowrd,
        status: 'admin',
      },
      (error, user) => {
        if (error) {
          res.status(500).send('Il y a un problème avec votre demande!');
          next(error);
        } else {
          res
            .status(200)
            .send({ message: "l'utilisateur " + user.email + ' est créé.' });
          next();
        }
      },
    );
  });
}

export function verifyMe(req, res) {
  User.findById(req.userId, { password: 0 }, (err, user) => {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: 'Problème pour retrouver cet utilisateur .',
      });
    }

    if (!user) {
      return res
        .status(404)
        .send({ auth: false, message: 'Utilisateur non reconnu.' });
    }

    res.status(200).send(user);
  });
}

export function login(req, res) {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Erreur serveur ' });
    }

    if (!user) {
      return res
        .status(404)
        .send({ auth: false, message: 'Utilisateur non reconnu. ' });
    }

    let passwordIsValid = false;

    if (password !== undefined) {
      //      passwordIsValid = password === user.password;
      passwordIsValid = bcrypt.compareSync(password, user.password);
    }
    const usernameIsValid = email === user.email;

    if (!usernameIsValid || !passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        level: USER_STATUS2LEVEL[user.status],
      },
      serverConfig.secret,
      {
        expiresIn:
          USER_STATUS2EXPIRESIN[user.status] === undefined
            ? '0'
            : USER_STATUS2EXPIRESIN[user.status](),
      },
    );

    res.status(200).send({ auth: true, 'access-token': token });
  });
}

export function validateToken(req, res) {
  const token = req.headers['x-access-token'] || req.query.token;

  if (!token) {
    return res.status(403).send({ message: 'Pas de Token ' });
  }

  jwt.verify(token, serverConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(200).send({ isTokenValid: false });
    }
    if (req.query.redirect !== undefined) {
      let redirect = req.query.redirect.toLowerCase();
      if (!redirect.startsWith('/')) {
        redirect = '/' + redirect;
      }
      if (REDIRECTTOLEVEL[redirect] === undefined) {
        return res.status(200).send({ isTokenValid: false });
      }
      const level = decoded.level === undefined ? 0 : decoded.level;
      if (REDIRECTTOLEVEL[redirect] <= level) {
        return res.status(200).send({ isTokenValid: true, id: decoded.id });
      }
      return res.status(200).send({ isTokenValid: false });
    }

    res.status(200).send({ isTokenValid: true, id: decoded.id });
  });
}
