import sanitizeHtml from 'sanitize-html';

import User from '../models/user';
import { getHash } from '../util/crypto';

// eslint-disable-next-line import/prefer-default-export
export function registerAdmin(req, res, next) {
  const { email, password } = req.body;

  const hashPassword = getHash(password);

  // verify user don't exist

  User.find({ email }, (err, previousUsers) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: err.errmsg,
      });
    }

    if (previousUsers.length > 0) {
      return res.status(409).send({
        success: false,
        message: 'Error: Account already exist.',
      });
    }

    User.create(
      {
        email: sanitizeHtml(email),
        password: hashPassword,
        status: 'admin',
      },
      (error, user) => {
        if (error) {
          res.status(500).send('Il y a un problème avec votre demande !');
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
