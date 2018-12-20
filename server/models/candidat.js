import mongoose from 'mongoose';

import { getHash, compareToHash } from '../util/crypto';
import {
  email as emailRegex,
  phone as phoneRegex,
  neph as nephRegex,
} from '../lib/regex';

const { Schema } = mongoose;

const candidatSchema = new Schema({
  nomNaissance: {
    type: String,
    required: true,
    uppercase:true,
  },
  prenom: {
    type: String,
    required: false,
  },
  codeNeph: {
    type: String,
    required: true,
    match: nephRegex,
  },
  dateReussiteETG: {
    type: Date,
    required: false,
  },
  dateDernierEchecPratique: {
    type: Date,
    required: false,
  },
  reussitePratique: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    default: '',
    required: true,
    trim: true,
    unique: true,
    match: emailRegex,
  },
  portable: {
    type: String,
    default: '',
    required: true,
    trim: true,
    match: phoneRegex,
  },
  adresse: {
    type: String,
    default: '',
  },
  isValid: {
    type: Boolean,
    required: true,
    default: false,
  },
  creneau: {
    type: Object,
    default: {},
  },
});

candidatSchema.methods.generateHash = (password) => (
  getHash(password)
);

candidatSchema.methods.checkPassword = (password) => (
  compareToHash(password, this.password)
);

export default mongoose.model('Candidat', candidatSchema);
