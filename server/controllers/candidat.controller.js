/* eslint no-console: ["error", { allow: ["warn"] }] */
import Candidat from '../models/candidat';
import sanitizeHtml from 'sanitize-html';
import csv from '../util/csv-express-candilib'; // eslint-disable-line no-unused-vars
import sendMailToAccount from '../util/sendMail';
import jwt from 'jsonwebtoken';
import serverConfig from '../config';
import sendMagicLink from '../util/sendMagicLink';
import moment from 'moment';
// import retourAurige from './candidatsLibresEnrichis_20180921_110004.json';
const retourAurige = []; // TODO fix docker

import {
  INSCRIPTION_OK,
  EPREUVE_PRATIQUE_OK,
  EPREUVE_ETG_KO,
  CANDIDAT_NOK,
  CANDIDAT_NOK_NOM,
} from '../util/constant';

const DATE_CODE_VALID = 5;

/**
 * signUp
 * @param req
 * @param res
 * @returns void
 */
export function signUp(req, res) {
  const {
    body,
  } = req;

  const {
    nom,
    neph,
    email,
    prenom,
    portable,
    adresse,
  } = body;

  if (!email) {
    return res.status(403)
      .send({
        success: false,
        message: 'Error: Email ne doit pas être vide.',
      });
  }
  // Steps:
  // 1. Verify neph and mail doesn't exist
  // 2. Save

  Candidat.find({
    email,
  }, (err, previousUsers) => {
    if (err) {
      return res.status(500)
        .send({
          success: false,
          message: 'Error: Server error',
        });
    } else if (previousUsers.length > 0) {
      return res.status(422)
        .send({
          success: false,
          message: 'Error: Candidat déjà existant',
        });
    }

    // Save the new user
    const newCandidat = new Candidat();

    // Let's sanitize inputs
    newCandidat.nomNaissance = sanitizeHtml(nom);
    // see https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
    newCandidat.prenom = sanitizeHtml(prenom.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
    newCandidat.codeNeph = neph;
    newCandidat.dateReussiteETG = null;
    newCandidat.dateDernierEchecPratique = null;
    newCandidat.reussitePratique = null;
    newCandidat.portable = sanitizeHtml(portable);
    newCandidat.adresse = sanitizeHtml(adresse);
    newCandidat.email = sanitizeHtml(email);
    newCandidat.isValid = false;

    newCandidat.save((error, candidat) => {
      if (error) {
        return res.status(500)
          .send({
            success: false,
            message: error.message,
          });
      }

      sendMailToAccount(candidat, INSCRIPTION_OK);

      const token = jwt.sign(
        {
          id: candidat._id,
        },
        serverConfig.secret,
        {
          expiresIn: 86400,
        },
      );

      return res.status(200)
        .send({
          success: true,
          message: 'Votre demande a été prise en compte, veuillez consulter votre messagerie.',
          candidat,
          auth: true,
          token,
        });
    });
  });
}


export function verifyMe(req, res) {
  Candidat.findById(req.userId,
    (err, user) => {
      if (err) {
        return res.status(500)
          .send({ auth: false, message: 'Problème pour retrouver cet utilisateur .' });
      }
      if (!user) {
        return res.status(404)
          .send({ auth: false, message: 'Utilisateur non reconnu.' });
      }
      res.redirect('/sites');
    });
}

export function login(req, res) {
  const {
    email,
  } = req.body;

  Candidat.findOne({ email },
    (err, user) => {
      if (err) {
        return res.status(500)
          .send({ auth: false, message: 'Erreur serveur.' });
      }

      if (!user) {
        return res.status(404)
          .send({ auth: false, message: 'Utilisateur non reconnu. ' });
      }

      const emailIsValid = email === user.email;

      if (!emailIsValid) {
        return res.status(401)
          .send({ auth: false, token: null });
      }

      if (!user.isValid) {
        return res.status(401)
          .send({ auth: false, token: null, message: 'Utiliseur en attente de validation.' });
      }

      const token = jwt.sign(
        {
          id: user._id,
        },
        serverConfig.secret,
        {
          expiresIn: '7d',
        },
      );

      sendMagicLink(user.email, token);

      return res.status(200).send({ success: true, token, message: 'Veuillez consulter votre boîte mail pour vous connecter.' });
    });
}

/**
 * Get all Candidats
 * @param req
 * @param res
 * @returns void
 */
export function getCandidats(req, res) {
  Candidat.find()
    .sort('-dateAdded')
    .exec((err, Candidats) => {
      if (err) {
        res.status(500)
          .send(err);
      }
      res.status(200).json(Candidats);
    });
}

/**
 * Save a Candidat
 * @param req
 * @param res
 * @returns void
 */
export function addCandidat(req, res) {
  if (!req.body.candidat.nomNaissance || !req.body.candidat.codeNeph || !req.body.candidat.email) {
    res.status(403)
      .end();
  }

  const newCandidat = new Candidat(req.body.candidat);

  // Let's sanitize inputs
  newCandidat.nomNaissance = sanitizeHtml(newCandidat.nomNaissance);
  newCandidat.nomUsage = sanitizeHtml(newCandidat.nomUsage);
  newCandidat.prenom = sanitizeHtml(newCandidat.prenom);
  newCandidat.codeNeph = sanitizeHtml(newCandidat.codeNeph);
  newCandidat.dateNaissance = sanitizeHtml(newCandidat.dateNaissance);
  newCandidat.dateReussiteETG = sanitizeHtml(newCandidat.dateReussiteETG);
  newCandidat.dateDernierEchecPratique = sanitizeHtml(newCandidat.dateDernierEchecPratique);
  newCandidat.reussitePratique = sanitizeHtml(newCandidat.reussitePratique);
  newCandidat.portable = sanitizeHtml(newCandidat.portable);
  newCandidat.adresse = sanitizeHtml(newCandidat.adresse);
  newCandidat.email = sanitizeHtml(newCandidat.email);

  newCandidat.save((err, saved) => {
    if (err) {
      res
        .send(err);
    }
    res.status(200)
      .json({ candidat: saved });
  });
}

/**
 * Get a single Candidat
 * @param req
 * @param res
 * @returns void
 */
export function getCandidat(req, res) {
  Candidat.findOne({ _id: req.params.id })
    .exec((err, candidat) => {
      if (err) {
        res
          .send(err);
      }
      res.json({ candidat });
    });
}

/**
 * Get a single Candidat by Neph
 * @param req
 * @param res
 * @returns void
 */
export function getCandidatNeph(req, res, next) {
  const neph = parseInt(req.params.neph, 10);
  Candidat.find({ codeNeph: neph })
    .exec((err, candidat) => {
      if (err) {
        next(err);
      }
      res.json({ candidat });
    });
}

/**
 * update a single Candidat by Neph
 * @param req
 * @param res
 * @returns void
 */

export function updateCandidat(req, res, next) {
  Candidat.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
    if (err) {
      next(err);
    } else {
      res.json(user);
    }
  });
}

/**
 * Delete a Candidat
 * @param req
 * @param res
 * @returns void
 */
export function deleteCandidat(req, res) {
  Candidat.findOne({ _id: req.params.id })
    .exec((err, candidat) => {
      if (err) {
        res.status(500)
          .send(err);
      }

      candidat.remove(() => {
        res.status(200)
          .end('candidat delete');
      });
    });
}


/**
 * Delete a Candidat Neph
 * @param req
 * @param res
 * @returns void
 */
export function deleteCandidatNeph(req, res) {
  Candidat.findOne({ codeNeph: req.params.neph })
    .exec((err, candidat) => {
      if (err) {
        res.status(500)
          .send(err);
      }

      candidat.remove(() => {
        res.status(200)
          .end('candidat delete');
      });
    });
}


export function exportToCSV(req, res) {
  const filename = 'candidatsLibresPrintel.csv';

  Candidat.find({}, {
    _id: 0,
    email: 1,
    prenom: 1,
    nomUsage: 1,
    nomNaissance: 1,
    codeNeph: 1,
  })
    .lean()
    .exec({}, (err, candidats) => {
      if (err) res.send(err);
      const newData = [];
      candidats.map((n) => {
        newData.push({
          'Code NEPH': n.codeNeph,
          'Nom de naissance': n.nomNaissance,
          'Nom d\'usage': n.nomUsage,
          'Prénom': n.prenom,
          'email': n.email,
        });
        return true;
      });

      res.status(200);
      res.setHeader('Content-Type', ['text/csv ; charset=utf-8']);
      res.setHeader('Content-Disposition', `attachment; filename= ${filename}`);
      res.csv(newData, 'utf-8', true);
    });
}


export function destroyAll(req, res) {
  Candidat.remove({}, (err) => {
    if (err) {
      console.log(err); // eslint-disable-line no-console
    } else {
      res.send(' destroy success');
      res.end();
    }
  });
}


export const epreuveEtgInvalid = (candidatAurige) => {
  return !moment(candidatAurige.dateReussiteETG).isValid() || candidatAurige.dateReussiteETG === '';
};


export function synchroAurige(req, res) {
  Candidat.find({}, (err, candidatsBase) => {
    const lgtCandilib = candidatsBase.length;
    const lgthsAurige = retourAurige.length;

    for (let i = 0; i < lgtCandilib; i++) {
      for (let j = 0; j < lgthsAurige; j++) {
        const candidatAurige = retourAurige[j];
        const candidatCandilib = candidatsBase[i];
        if (candidatCandilib.codeNeph === candidatAurige.codeNeph) {
          if (candidatAurige.candidatExistant === CANDIDAT_NOK) { // Neph inconnu dans Aurige
            // Date du code valid
            Candidat.findOneAndRemove({
              $or: [
                {
                  email: candidatAurige.email,
                },
                {
                  nomNaissance: candidatAurige.nomNaissance,
                },
                {
                  codeNeph: candidatAurige.codeNeph,
                },
              ],
            }, () => {
              if (err) {
                console.warn(err);
              } else {
                console.dir('Ce candidat a été detruit '); // eslint-disable-line no-console
                sendMailToAccount(candidatAurige, CANDIDAT_NOK);
              }
            });
          } else if (candidatAurige.candidatExistant === CANDIDAT_NOK_NOM) { // Nom inconnu de Aurige
            // Date du code valid
            Candidat.findOneAndRemove({
              $or: [
                {
                  email: candidatAurige.email,
                },
                {
                  nomNaissance: candidatAurige.nomNaissance,
                },
                {
                  codeNeph: candidatAurige.codeNeph,
                },
              ],
            }, () => {
              if (err) {
                console.warn(err);
              } else {
                console.dir('Ce candidat a été detruit '); // eslint-disable-line no-console
                sendMailToAccount(candidatAurige, CANDIDAT_NOK_NOM);
              }
            });
          } else if (epreuveEtgInvalid(candidatAurige)) { // check si code invalid
            Candidat.findOneAndRemove({
              $or: [
                {
                  email: candidatAurige.email,
                },
                {
                  nomNaissance: candidatAurige.nomNaissance,
                },
                {
                  codeNeph: candidatAurige.codeNeph,
                },
              ],
            }, () => {
              if (err) {
                console.warn(err);
              } else {
                console.dir('Ce candidat a été detruit '); // eslint-disable-line no-console
                sendMailToAccount(candidatAurige, EPREUVE_ETG_KO);
              }
            });
          } else if (moment().diff(candidatAurige.dateReussiteETG, 'years', true) > DATE_CODE_VALID) { // check si code moins de 5 ans
            Candidat.findOneAndRemove({
              $or: [
                {
                  email: candidatAurige.email,
                },
                {
                  nomNaissance: candidatAurige.nomNaissance,
                },
                {
                  codeNeph: candidatAurige.codeNeph,
                },
              ],
            }, () => {
              if (err) {
                console.warn(err);
              } else {
                console.dir('Ce candidat a été detruit '); // eslint-disable-line no-console
                sendMailToAccount(candidatAurige, EPREUVE_ETG_KO);
              }
            });
          } else if (candidatAurige.reussitePratique === EPREUVE_PRATIQUE_OK) { // check si permis obtenu
            Candidat.findOneAndRemove({
              $or: [
                {
                  email: candidatAurige.email,
                },
                {
                  nomNaissance: candidatAurige.nomNaissance,
                },
                {
                  codeNeph: candidatAurige.codeNeph,
                },
              ],
            }, () => {
              if (err) {
                console.warn(err);
              } else {
                console.dir('Ce candidat a été detruit '); // eslint-disable-line no-console
                sendMailToAccount(candidatAurige, EPREUVE_PRATIQUE_OK);
              }
            });
          } else { // eligible pour Candilib
            Candidat.update(
              { email: candidatAurige.email },
              {
                $set: {
                  isValid: true,
                  dateReussiteETG: candidatAurige.dateReussiteETG,
                  dateDernierEchecPratique: candidatAurige.dateDernierEchecPratique,
                  reussitePratique: candidatAurige.reussitePratique,
                },
              },
              () => {
                if (err) {
                  console.warn(err.message);  // eslint-disable-line no-console
                } else {
                  const token = jwt.sign(
                    {
                      id: candidatCandilib._id,
                    },
                    serverConfig.secret,
                    {
                      expiresIn: 86400,
                    },
                  );
                  sendMagicLink(candidatCandilib.email, token);
                }
              }
            );
          }
        }
      }
    }
  });

  res.status(200).send({
    message: 'Synchonisation done',
  });
}

export function purgePermisOk(req, res) {
  Candidat.find({
    reussitePratique: 'OK',
  }, (err, candidats) => {
    if (err) {
      console.log(err); // eslint-disable-line no-console
    } else {
      candidats.map((c) => {
        Candidat.findOne({ _id: c._id })
          .exec((error, cand) => {
            if (error) {
              res
                .send(error);
            }
            cand.remove(() => {
              res.status(200)
                .end();
            });
          });
      });
    }
  });
}
