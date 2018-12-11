import sanitizeHtml from 'sanitize-html';
import bcrypt from 'bcrypt';

import User from '../models/user';

// eslint-disable-next-line import/prefer-default-export
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
