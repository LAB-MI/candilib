import Creneau from '../models/creneau';
import sanitizeHtml from 'sanitize-html';
import * as csvParser from 'fast-csv';
import path from 'path';
import fs from 'fs';

/**
 * Get all creneau
 * @param req
 * @param res
 * @returns void
 */
export function getCreneaux(req, res) {
  Creneau.find().sort('-dateAdded').exec((err, creneaux) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ creneaux });
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export function addCreneau(req, res) {
  if (!req.body.creneau.title) {
    res.status(403).end();
  }

  const newCreneau = new Creneau(req.body.creneau);

  // Let's sanitize inputs
  newCreneau.title = sanitizeHtml(newCreneau.title);

  newCreneau.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ creneau: saved });
  });
}

/**
 * Get a single creneau
 * @param req
 * @param res
 * @returns void
 */
export function getCreneau(req, res) {
  Creneau.findOne({ id: req.params.id }).exec((err, creneau) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ creneau });
  });
}

/**
 * update a single creneau by id
 * @param req
 * @param res
 * @returns void
 */

export function updateCreneau(req, res, next) {
  Creneau.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, creneau) => {
    if (err) {
      next(err);
    } else {
      res.json(creneau);
    }
  });
}

/**
 * Delete a creneau
 * @param req
 * @param res
 * @returns void
 */
export function deleteCreneau(req, res) {
  Creneau.findOne({ cuid: req.params.id }).exec((err, creneau) => {
    if (err) {
      res.status(500).send(err);
    }

    creneau.remove(() => {
      res.status(200).end();
    });
  });
}


export const uploadAurigeCSV = (req, res) => {
  const csvFile = req.files.file;
  const fileRows = [];

  const csvFilePath = path.resolve(__dirname, '../../temp/csv/', csvFile.name);

  csvFile.mv(csvFilePath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    const stream = fs.createReadStream(csvFilePath);

    csvParser.fromStream(stream, { headers: true, ignoreEmpty: true })
      .on('data', (data) => {
        fileRows.push(data);
      })
      .on('end', () => {
        console.log('done'); // eslint-disable-line no-console
        console.log(fileRows); // eslint-disable-line no-console
      });
  });

  res.status(200).send(csvFilePath);
};
