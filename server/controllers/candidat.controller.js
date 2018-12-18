/* eslint no-console: ["error", { allow: ["warn"] }] */
import fs from 'fs';
import * as csvParser from 'fast-csv';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import path from 'path';
import sanitizeHtml from 'sanitize-html';

import Candidat from '../models/candidat';
import csv from '../util/csv-express-candilib'; // eslint-disable-line no-unused-vars
import sendMailToAccount from '../util/sendMail';
import serverConfig from '../config';
import sendMagicLink from '../util/sendMagicLink';
import {
  CANDIDAT_EXISTANT,
  INSCRIPTION_OK,
  EPREUVE_PRATIQUE_OK,
  EPREUVE_ETG_KO,
  CANDIDAT_NOK,
  CANDIDAT_NOK_NOM,
  MAIL_CONVOCATION,
  ANNULATION_CONVOCATION,
  INSCRIPTION_UPDATE,
} from '../util/constant';
import Creneau from '../models/creneau';
import messagesConstant from '../util/messages.constant.json';
import { USER_STATUS_EXPIRES_IN } from '../util/jwt.constant';
import { TOKEN_HEADER_NAME } from '../constants';

const DATE_CODE_VALID = 5;

export function ValidationParamRegister(req, res, next) {
  const {
    nom,
    neph,
    email,
    portable,
    adresse,
  } = req.body;
  let isOk = false;

  if (!email) {
    return res.status(403).send({
      success: false,
      message: 'Error: Email ne doit pas être vide.',
    });
  }

  isOk = nom
    && nom.trim().length > 0
    && neph
    && neph.trim().length > 0
    && portable
    && portable.trim().length > 0
    && adresse
    && adresse.trim().length > 0;

  if (!isOk) {
    return res.status(403).send({
      success: false,
      message: messagesConstant.ERROR_FIELDS_EMPTY,
      codemessage: 'ERROR_FIELDS_EMPTY',
    });
  }
  return next();
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export function CheckCandidatIsSignedBefore(req, res, next) {
  const {
    nom,
    neph,
    email,
    prenom,
    portable,
    adresse,
  } = req.body;

  Candidat.findOne({
    nomNaissance: nom,
    codeNeph: neph,
  }).exec((err, candidat) => {
    if (candidat) {
      if (candidat.isValid === true) {
        return res.status(422).send({
          success: false,
          message: messagesConstant.ALREADY_REGISTERED,
          codemessage: 'ALREADY_REGISTERED',
        });
      }
      if (
        candidat.email === email
        && candidat.prenom === prenom
        && candidat.portable === portable
        && candidat.adresse === adresse
      ) {
        return res.status(422).send({
          success: false,
          message: messagesConstant.ALREADY_REGISTERED_NO_AURIGE,
          codemessage: 'ALREADY_REGISTERED_NO_AURIGE',
        });
      }
      req.candidat = candidat;
    }

    return next();
  });
}

export function checkMailIsUsed(req, res, next) {
  const { candidat, body } = req;
  const { email } = body;

  Candidat.findOne({ email }).exec((err, previousUsers) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: 'Error: Server error',
      });
    }
    if (previousUsers) {
      if (candidat) {
        // Update candidat
        if (candidat.id !== previousUsers.id) {
          return res.status(422).send({
            success: false,
            message:
              'Vous avez déjà un compte sur Candilib, veuillez cliquer sur le lien "Déjà inscrit',
          });
        }
      } else {
        // SigneUp candidat
        return res.status(422).send({
          success: false,
          message:
            'Vous avez déjà un compte sur Candilib, veuillez cliquer sur le lien "Déjà inscrit',
        });
      }
    }
    return next();
  });
}

export function preUpdateInfoCandidat(req, res, next) {
  const {
    candidat,
    body,
  } = req;

  const {
    email,
    prenom,
    portable,
    adresse,
  } = body;

  if (!candidat) {
    return next();
  }

  req.mailChanged = candidat.email !== email;

  candidat.email = email;
  candidat.prenom = prenom;
  candidat.portable = portable;
  candidat.adresse = adresse;

  req.body.id = candidat.id;
  req.body.candidat = candidat;

  return next();
}

export function updateInfoCandidat(req, res, next) {
  const { id, candidat } = req.body;

  if (!id || !candidat) {
    return next();
  }
  Candidat.findByIdAndUpdate(id, candidat, { new: true }, (err, user) => {
    if (err) {
      next(err);
    } else {
      if (req.mailChanged) {
        sendMailToAccount(user, INSCRIPTION_UPDATE);
      }

      const token = jwt.sign(
        {
          id: candidat._id,
        },
        serverConfig.secret,
        {
          expiresIn: USER_STATUS_EXPIRES_IN.candidat(),
        },
      );

      return res.status(200).send({
        success: true,
        message: req.mailChanged
          ? messagesConstant.UPDATE_REGISTERED_WITH_MAIL
          : messagesConstant.UPDATE_REGISTERED,
        codemessage: req.mailChanged
          ? 'UPDATE_REGISTERED_WITH_MAIL'
          : 'UPDATE_REGISTERED',
        candidat,
        auth: true,
        token,
      });
    }
  });
}

/**
 * signUp
 * @param req
 * @param res
 * @returns void
 */
export function signUp(req, res) {
  const { body } = req;

  const {
    nom,
    neph,
    email,
    prenom,
    portable,
    adresse,
  } = body;

  if (!email) {
    return res.status(403).send({
      success: false,
      message: 'Error: Email ne doit pas être vide.',
    });
  }
  // Steps:
  // 1. Verify neph and mail doesn't exist
  // 2. Save

  Candidat.find(
    {
      email,
      portable,
    },
    (err, previousUsers) => {
      if (err) {
        return res.status(500).send({
          success: false,
          message: 'Error: Server error',
        });
      }

      if (previousUsers.length > 0) {
        return res.status(422).send({
          success: false,
          message:
            'Vous avez déjà un compte sur Candilib, veuillez cliquer sur le lien "Déjà inscrit',
        });
      }

      // Save the new user
      const newCandidat = new Candidat();

      // Let's sanitize inputs
      newCandidat.nomNaissance = sanitizeHtml(nom);
      // see https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
      newCandidat.prenom = sanitizeHtml(
        prenom.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
      );
      newCandidat.codeNeph = neph;
      newCandidat.dateReussiteETG = null;
      newCandidat.dateDernierEchecPratique = null;
      newCandidat.reussitePratique = null;
      newCandidat.portable = sanitizeHtml(portable);
      newCandidat.adresse = sanitizeHtml(adresse);
      newCandidat.email = sanitizeHtml(email);
      newCandidat.isValid = false;
      newCandidat.creneau = {}

      newCandidat.save((error, candidat) => {
        if (error) {
          return res.status(500).send({
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
            expiresIn: USER_STATUS_EXPIRES_IN.candidat(),
          },
        );

        return res.status(200).send({
          success: true,
          message:
            'Votre demande a été prise en compte, veuillez consulter votre messagerie (pensez à vérifier dans vos courriers indésirables).',
          candidat,
          auth: true,
          token,
        });
      });
    },
  );
}

export function verifyMe(req, res) {
  Candidat.findById(req.userId, (err, user) => {
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
    const token = req.headers[TOKEN_HEADER_NAME] || req.query.token;
    res.redirect('/sites?token=' + token);
  });
}

export function login(req, res) {
  const { email } = req.body;

  Candidat.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Erreur serveur.' });
    }

    if (!user) {
      return res
        .status(404)
        .send({ auth: false, message: 'Utilisateur non reconnu.' });
    }

    const emailIsValid = email === user.email;

    if (!emailIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }

    if (!user.isValid) {
      return res.status(401).send({
        auth: false,
        token: null,
        message: 'Utiliseur en attente de validation.',
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      serverConfig.secret,
      {
        expiresIn: USER_STATUS_EXPIRES_IN.candidat(),
      },
    );

    sendMagicLink(user, token)
      .then((response) => {
        res.status(200).send({
          success: true,
          token,
          response,
          message:
            'Veuillez consulter votre boîte mail pour vous connecter (pensez à vérifier dans vos courriers indésirables).',
        });
      })
      .catch((error) => {
        res.status(500).send({
          success: false,
          token,
          error,
          message:
            "Un problème est survenu lors de l'envoi du lien de connexion. Nous vous prions de réessayer plus tard.",
        });
      });
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
        res.status(500).send(err);
      }
      res.status(200).json(Candidats);
    });
}

/**
 * Get all Candidats
 * @param req
 * @param res
 * @returns void
 */
export async function getCandidat(req, res) {
  try {
    const id = req.params.id === 'me' ? req.userId : req.params.id
    const candidat = await Candidat.findById(req.userId)
    res.status(200).json(candidat);
  } catch (err) {
    res.status(500).send(err);
  }
}

/**
 * Save a Candidat
 * @param req
 * @param res
 * @returns void
 */
export function addCandidat(req, res) {
  if (
    !req.body.candidat.nomNaissance
    || !req.body.candidat.codeNeph
    || !req.body.candidat.email
  ) {
    res.status(403).end();
  }

  const newCandidat = new Candidat(req.body.candidat);

  // Let's sanitize inputs
  newCandidat.nomNaissance = sanitizeHtml(newCandidat.nomNaissance);
  newCandidat.nomUsage = sanitizeHtml(newCandidat.nomUsage);
  newCandidat.prenom = sanitizeHtml(newCandidat.prenom);
  newCandidat.codeNeph = sanitizeHtml(newCandidat.codeNeph);
  newCandidat.dateNaissance = sanitizeHtml(newCandidat.dateNaissance);
  newCandidat.dateReussiteETG = sanitizeHtml(newCandidat.dateReussiteETG);
  newCandidat.dateDernierEchecPratique = sanitizeHtml(
    newCandidat.dateDernierEchecPratique,
  );
  newCandidat.reussitePratique = sanitizeHtml(newCandidat.reussitePratique);
  newCandidat.portable = sanitizeHtml(newCandidat.portable);
  newCandidat.adresse = sanitizeHtml(newCandidat.adresse);
  newCandidat.email = sanitizeHtml(newCandidat.email);

  newCandidat.save((err, saved) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json({ candidat: saved });
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
  Candidat.find({ codeNeph: neph }).exec((err, candidat) => {
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
  Candidat.findByIdAndUpdate(
    req.params.id,
    req.body.candidat,
    { new: true },
    (err, user) => {
      if (err) {
        next(err);
      } else {
        if (user.creneau && user.creneau.title) {
          sendMailToAccount(user, MAIL_CONVOCATION);
        } else {
          sendMailToAccount(user, ANNULATION_CONVOCATION);
        }
        res.json(user);
      }
    },
  );
}

/**
 * Delete a Candidat
 * @param req
 * @param res
 * @returns void
 */
export function deleteCandidat(req, res) {
  Candidat.findOne({ _id: req.params.id }).exec((err, candidat) => {
    if (err) {
      res.status(500).send(err);
    }

    candidat.remove(() => {
      res.status(200).end('candidat deleted');
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
  Candidat.findOne({ codeNeph: req.params.neph }).exec((err, candidat) => {
    if (err) {
      res.status(500).send(err);
    }

    candidat.remove(() => {
      res.status(200).end('candidat deleted');
    });
  });
}

export function exportToCSV(req, res) {
  const filename = 'candidatsLibresPrintel.csv';

  Candidat.find(
    {},
    {
      _id: 0,
      email: 1,
      prenom: 1,
      nomUsage: 1,
      nomNaissance: 1,
      codeNeph: 1,
    },
  )
    .lean()
    .exec({}, (err, candidats) => {
      if (err) res.send(err);
      const newData = [];
      candidats.map((n) => {
        newData.push({
          'Code NEPH': n.codeNeph,
          'Nom de naissance': n.nomNaissance,
          "Nom d'usage": n.nomUsage,
          Prénom: n.prenom,
          email: n.email,
        });
        return true;
      });

      res.status(200);
      res.setHeader('Content-Type', ['text/csv ; charset=utf-8']);
      res.setHeader('Content-Disposition', `attachment; filename= ${filename}`);
      return res.csv(newData, 'utf-8', true);
    });
}

export function destroyAll(req, res) {
  Candidat.remove({}, (err) => {
    if (err) {
      console.warn(err); // eslint-disable-line no-console
    } else {
      res.send(' destroy success');
      res.end();
    }
  });
}

export const epreuveEtgInvalid = (candidatAurige) => {
  return (
    candidatAurige.dateReussiteETG === undefined
    || !moment(candidatAurige.dateReussiteETG).isValid()
    || candidatAurige.dateReussiteETG === ''
  );
};

const removeCandidat = async candidat => {
  const { email } = candidat;
  try {
    await candidat.remove();
    return candidat;
  } catch (error) {
    console.error(`Erreur de suppression pour ce candidat ${email}`);// eslint-disable-line no-console
    throw error;
  }
}

const getCandidatStatus = (nom, neph, status) => ({ nom, neph, status });

const synchroAurige = (pathname) => {
  const FileContents = fs.readFileSync(pathname, 'utf8');
  let retourAurige = [];
  try {
    retourAurige = JSON.parse(FileContents);
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    throw err;
  }

  const result = retourAurige.map(async (candidatAurige) => {
    const { nomNaissance, codeNeph, candidatExistant, dateReussiteETG, reussitePratique, dateDernierEchecPratique } = candidatAurige;

    try {
      const candidatsBase = await Candidat.findOne({ nomNaissance, codeNeph })

      if (candidatsBase === undefined || candidatsBase === null) {
        console.error(`Candidat ${codeNeph}/${nomNaissance} non trouvé`);// eslint-disable-line no-console
        return getCandidatStatus(nomNaissance, codeNeph, 'error');
      }

      const { email } = candidatsBase;

      if (candidatExistant === CANDIDAT_NOK) {
        return removeCandidat(candidatsBase).then(resp => {
          console.warn(`Ce candidat ${email} a été detruit: NEPH inconnu`); // eslint-disable-line no-console
          sendMailToAccount(candidatsBase, CANDIDAT_NOK);
          return getCandidatStatus(nomNaissance, codeNeph, 'success');
        });
      } else if (candidatExistant === CANDIDAT_NOK_NOM) {
        return removeCandidat(candidatsBase).then(resp => {
          console.warn(`Ce candidat ${email} a été detruit: Nom inconnu`); // eslint-disable-line no-console
          sendMailToAccount(candidatsBase, CANDIDAT_NOK_NOM);
          return getCandidatStatus(nomNaissance, codeNeph, 'success');
        });
      } else if (epreuveEtgInvalid(candidatAurige)) {
        return removeCandidat(candidatsBase).then(resp => {
          console.warn(`Ce candidat ${email} a été detruit: NEPH inconnu`); // eslint-disable-line no-console
          sendMailToAccount(candidatsBase, CANDIDAT_NOK_NOM);
          return getCandidatStatus(nomNaissance, codeNeph, 'success');
        });
      } else if (moment().diff(dateReussiteETG, 'years', true) > DATE_CODE_VALID) {
        return removeCandidat(candidatsBase).then(resp => {
          console.warn(`Ce candidat ${email} a été detruit: Date ETG KO`); // eslint-disable-line no-console
          sendMailToAccount(candidatAurige, EPREUVE_ETG_KO);
          return getCandidatStatus(nomNaissance, codeNeph, 'success');
        });
      } else if (reussitePratique === EPREUVE_PRATIQUE_OK) {
        return removeCandidat(candidatsBase).then(resp => {
          console.warn(`Ce candidat ${email} a été detruit: PRATIQUE OK`); // eslint-disable-line no-console
          sendMailToAccount(candidatAurige, EPREUVE_PRATIQUE_OK);
          return getCandidatStatus(nomNaissance, codeNeph, 'success');
        });
      } else if (candidatExistant === CANDIDAT_EXISTANT) {
        const { isValid } = candidatsBase;

        candidatsBase.set({ dateReussiteETG, dateDernierEchecPratique, reussitePratique, isValid: true });
        return candidatsBase.save()
          .then(candidat => {
            if (isValid) {
              console.warn(`Ce candidat ${candidat.email} a été mis à jour`); // eslint-disable-line no-console
              return getCandidatStatus(nomNaissance, codeNeph, 'success');
            } else {
              console.warn(`Ce candidat ${candidat.email} a été validé`); // eslint-disable-line no-console
              const token = jwt.sign(
                {
                  id: candidat.id,
                },
                serverConfig.secret,
                {
                  expiresIn: USER_STATUS_EXPIRES_IN.candidat(),
                },
              );

              sendMagicLink(candidat, token);
              return getCandidatStatus(nomNaissance, codeNeph, 'success');
            }
          }).catch(err => {
            console.error(`Erreur de mise à jours pour ce candidat ${email}`);// eslint-disable-line no-console
            return getCandidatStatus(nomNaissance, codeNeph, 'error');
          })
      } else {
        console.warn(`Ce candidat ${email} n'a pas été traité. Cas inconnu`); // eslint-disable-line no-console
        return getCandidatStatus(nomNaissance, codeNeph, 'error');
      }
    } catch (error) {
      console.error(error);// eslint-disable-line no-console
      console.error(`Erreur dans la recherche du candidat pour ce candidat ${codeNeph}/${nomNaissance}`);// eslint-disable-line no-console
      return getCandidatStatus(nomNaissance, codeNeph, 'error');
    }

  });

  return Promise.all(result);

};

export function purgePermisOk(req, res) {
  Candidat.find(
    {
      reussitePratique: 'OK',
    },
    (err, candidats) => {
      if (err) {
        console.warn(err); // eslint-disable-line no-console
      } else {
        candidats.map((c) => {
          Candidat.findOne({ _id: c._id }).exec((error, cand) => {
            if (error) {
              res.send(error);
            }
            cand.remove(() => {
              res.status(200).end();
            });
          });
        });
      }
    },
  );
}

export const uploadAurigeCSV = (req, res, next) => {
  const csvFile = req.files.file;
  const csvFilePath = path.resolve(__dirname, '../../temp/csv/', csvFile.name);

  csvFile.mv(csvFilePath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    const stream = fs.createReadStream(csvFilePath);

    csvParser
      .fromStream(stream, { headers: false, ignoreEmpty: true })
      .on('data', (data) => {
        const creneau = new Creneau();
        if (data[0] === 'Date') return;

        const [day, time, inspecteur, centre] = data;

        const myDate = `${day} ${time}`;
        const formattedDate = moment(
          moment(myDate, 'DD-MM-YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
        ).add(60, 'minutes');
        creneau.date = formattedDate;
        creneau.inspecteur = inspecteur;
        creneau.centre = centre;

        const { date } = creneau;

        Creneau.find(
          {
            date,
            centre,
            inspecteur,
          },
          (errFind, previousCreneau) => {
            if (errFind) {
              console.warn(errFind);
            } else if (previousCreneau.length > 0) {
              console.warn(previousCreneau, 'deja en base');
            } else {
              creneau.save((errSave) => {
                if (errSave) {
                  console.warn(errSave); // eslint-disable-line no-console
                }
                res.end('Done');
              });
            }
          },
        );
      })
      .on('end', () => {
        console.log('done'); // eslint-disable-line no-console
        next();
      });
  });

  res.status(200).send({ name: csvFile.name });
};

export const uploadAurigeJSON = (req, res) => {
  const jsonFile = req.files.file;
  const jsonFilePath = path.resolve(
    __dirname,
    '../../temp/json/',
    jsonFile.name,
  );

  jsonFile.mv(jsonFilePath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    try {
      synchroAurige(jsonFilePath).then(result => {

        res.status(200).send({
          fileName: jsonFile.name,
          success: true,
          message: `Le fichier ${jsonFile.name} a été synchronisé.`,
          candidats: result,
        });
      });
    } catch (err) {
      console.error(err);// eslint-disable-line no-console
      return res.status(500).send(err);
    }

  });
};


export function mailToContactUs(req, res) {
  return res.status(200).send({ emailto: serverConfig.supportMail});
}