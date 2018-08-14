import Candidat from '../models/candidat';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';
import candidatsAurige from '../data_aurige/candidatsLibres_output_201808081420/candidatsLibresEnrichis_20180808_110006.json'
import config from '../config'; `$`

/**
 * Get all Candidats
 * @param req
 * @param res
 * @returns void
 */
export function getCandidats(req, res) {
  Candidat.find().sort('-dateAdded').exec((err, Candidats) => {
    if (err) {
      res.status(500).send(err);
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
  console.log(req.body.candidat)
  if (!req.body.candidat.nomNaissance || !req.body.candidat.codeNeph || !req.body.candidat.email) {
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
  newCandidat.dateDernierEchecPratique = sanitizeHtml(newCandidat.dateDernierEchecPratique);
  newCandidat.reussitePratique = sanitizeHtml(newCandidat.reussitePratique);
  newCandidat.mobile = sanitizeHtml(newCandidat.mobile);
  newCandidat.adresse = sanitizeHtml(newCandidat.adresse);
  newCandidat.email = sanitizeHtml(newCandidat.email);

  newCandidat.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ candidat: saved });
  });
}

/**
 * Get a single Candidat
 * @param req
 * @param res
 * @returns void
 */
export function getCandidat(req, res) {
  Candidat.findOne({ _id: req.params.id }).exec((err, candidat) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ candidat });
  });
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
      res.status(200).end();
    });
  });
}

export function importCandidatAurige(req, res){
  console.log('importCandidatAurige')
  const createCandidat = candidatsAurige.map((c) => {
    const candidat = new Candidat({
      nomNaissance: c.nomNaissance,
      nomUsage: c.nomUsage,
      prenom: c.prenom,
      codeNeph: c.codeNeph,
      dateNaissance: c.dateNaissance,
      dateReussiteETG: c.dateReussiteETG,
      dateDernierEchecPratique: c.dateDernierEchecPratique,
      reussitePratique: c.reussitePratique,
      email: c.email,
      mobile: c.mobile,
      adresse: c.adresse
    })

    Candidat.create(candidat, (error) => {
      if (!error)
        ''
      else
        console.log(error)
    })
  })
  res.status(200).send(`${candidatsAurige.length} Candidats ajouté a la base`)
}
