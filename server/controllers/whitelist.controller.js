import sanitizeHtml from 'sanitize-html';

import messages from '../util/messages.constant.json';
import WhitelistCandidat from '../models/whitelistCandidat';


export function canToRegister(req, res, next) {
  const { body } = req;
  const { email } = body;

  WhitelistCandidat.findOne({ email }).exec((err, candidat) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: err.message,
      });
    }

    if (candidat === null) {
      return res.status(401).send({
        auth: false,
        message: messages.NO_AUTH_WHITELIST,
        codemessage: 'NO_AUTH_WHITELIST',
      });
    }
    return next();
  });
}

export function addWhitelist(req, res) {
  const { email } = req.body;

  const newCandidat = new WhitelistCandidat();

  // Let's sanitize inputs
  newCandidat.email = sanitizeHtml(email);

  newCandidat.save((error, candidat) => {
    if (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
    res.status(200).json(candidat);
  });
}

export function getWhitelistCandidats(req, res) {
  WhitelistCandidat.find()
    .sort('-dateAdded')
    .exec((err, Candidats) => {
      if (err) {
        return res.status(500).send({
          success: false,
          message: err.message,
        });
      }
      res.status(200).json(Candidats);
    });
}

export function deleteCandidat(req, res) {
  WhitelistCandidat.findOne({ _id: req.params.id }).exec((err, candidat) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: err.message,
      });
    }

    candidat.remove(() => {
      res.status(200).json(candidat);
    });
  });
}
