import whitelist from '../inbox/whitelist.json';
import messages from '../util/messages.constant.json';
import WhitelistCandidat from '../models/whitelistCandidat.js';
import sanitizeHtml from 'sanitize-html';

export function canToRegister(req, res, next) {
  const { body } = req;
  const { email } = body;

  //  const { emails } = whitelist.map(candidat => candidat.email);
  const emails = whitelist;
  console.log(whitelist);
  console.log(emails);
  console.log(body);
  const isEmailOk = emails === undefined ? false : emails.indexOf(email) > 0;

  let isEmailOkDB = false;
  WhitelistCandidat.findOne({ email: email }).exec((err, candidat) => {
    if (err) {
      isEmailOkDB = false;
    } else {
      isEmailOkDB = true;
    }
  });

  if (isEmailOk || isEmailOkDB) {
    return next();
  }
  return res.status(401).send({
    auth: false,
    message: messages['NO_AUTH_WHITELIST'],
    codemessage: 'NO_AUTH_WHITELIST',
  });
}

export function addWhitelist(req, res) {
  const { nom, prenom, neph, adresse, email } = req.body;

  const newCandidat = new WhitelistCandidat();

  // Let's sanitize inputs
  newCandidat.nomNaissance = sanitizeHtml(nom);
  newCandidat.prenom = sanitizeHtml(
    prenom.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
  );
  newCandidat.codeNeph = neph;
  newCandidat.adresse = sanitizeHtml(adresse);
  newCandidat.email = sanitizeHtml(email);

  newCandidat.save((error, candidat) => {
    if (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
    res.status(200).end('whitelist candidat saved');
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
      res.status(200).end('candidat deleted');
    });
  });
}
