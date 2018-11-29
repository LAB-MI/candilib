import whitelist from '../inbox/whitelist.json';
import messages from '../util/messages.constant.json';
import WhitelistCandidat from '../models/whitelistCandidat.js';
import sanitizeHtml from 'sanitize-html';

export function canToRegister(req, res, next) {
  const { body } = req;
  const { email } = body;

  //  const { emails } = whitelist.map(candidat => candidat.email);
  console.log(whitelist);
  console.log(body);

  if (whitelist !== undefined && whitelist.length > 0) {
    const emails = whitelist;
    console.log(emails);
    const isEmailOk = emails === undefined ? false : emails.indexOf(email) > 0;

    if (isEmailOk) {
      return next();
    }
    return res.status(401).send({
      auth: false,
      message: messages.NO_AUTH_WHITELIST,
      codemessage: 'NO_AUTH_WHITELIST',
    });
  }

  WhitelistCandidat.findOne({ email }).exec((err, candidat) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
    console.log(candidat);
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
        res.status(500).send(err);
      }
      res.status(200).json(Candidats);
    });
}

export function deleteCandidat(req, res) {
  WhitelistCandidat.findOne({ _id: req.params.id }).exec((err, candidat) => {
    if (err) {
      res.status(500).send(err);
    }

    candidat.remove(() => {
      res.status(200).json(candidat);
    });
  });
}
