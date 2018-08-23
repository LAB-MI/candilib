/* eslint no-console: ["error", { allow: ["warn"] }] */
import Candidat from '../models/candidat';
import sanitizeHtml from 'sanitize-html';
import csv from 'csv-express'; // eslint-disable-line no-unused-vars
import retourAurige from '../data_aurige/mock_2.json';
import sendMailToAccount from '../util/sendMail';

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
    nomUsage,
    email,
    prenom,
    naissance,
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
    newCandidat.nomUsage = sanitizeHtml(nomUsage);
    newCandidat.prenom = sanitizeHtml(prenom);
    newCandidat.codeNeph = sanitizeHtml(neph);
    newCandidat.dateNaissance = sanitizeHtml(naissance);
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

      sendMailToAccount(candidat.email, 'Votre demande a bien été prise en compte, vous recevrez une réponse  pour confirmation définitive sous 24 heures');

      return res.status(200)
        .send({
          success: true,
          message: 'Votre demande a bien été prise en compte, veuillez consulter votre email.',
          candidat,
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
        res.status(500)
          .send(err);
      }
      res.json({ Candidats });
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
export function getCandidatNeph(req, res) {
  Candidat.find({ codeNeph: req.params.neph })
    .exec((err, candidat) => {
      if (err) {
        res
          .send(err);
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

export function updateUser(req, res, next) {
  Candidat.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, user) => {
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
          .end('candidat delete', candidat);
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
          .end('candidat delete', candidat);
      });
    });
}


export function exportToCSV(req, res) {
  const filename = 'candidatLibresDB.csv';

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
          codeNeph: n.codeNeph,
          nomNaissance: n.nomNaissance,
          nomUsage: n.nomUsage,
          prenom: n.prenom,
          email: n.email,
        });
        return true;
      });

      res.status(200);

      res.setHeader('Content-Type', ['text/csv ; charset=iso-8859-1']);
      res.setHeader('Content-Disposition', `attachment; filename= ${filename}`);
      res.csv(newData, 'iso-8859-1', true);
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

const CANDIDAT_OK = 'OK';

export function synchroAurige(req, res) {
  retourAurige.map((candidatAurige) => {
    if (candidatAurige.candidatExistant === CANDIDAT_OK) {
      Candidat.update(
        { email: candidatAurige.email },
        {
          $set: {
            isValid: true,
            dateReussiteETG: candidatAurige.dateReussiteETG,
            dateDernierEchecPratique: candidatAurige.dateDernierEchecPratique,
          },
        },
        (err) => {
          if (err) {
            console.warn(err.message);  // eslint-disable-line no-console
          } else {
            sendMailToAccount(candidatAurige.email, 'votre demande a bien été validé');
          }
        }
      );
    } else {
      if (candidatAurige.email) {
        sendMailToAccount(candidatAurige.email, 'votre demande présente des problèmes veuillez vous réinscrire');
      }

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
      }, (err, object) => {
        if (err) {
          console.warn(err);
        } else {
          console.dir(`Ce candidat a été detruit : ${object.nomNaissance}`); // eslint-disable-line no-console
        }
      });
    }
  });
  res.end();
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
