import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from 'bcrypt';

const candidatSchema = new Schema({
  nomNaissance: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: false,
  },
  codeNeph: {
    type: String,
    required: true,
    match: /^[0-9]*$/,
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
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  },
  portable: {
    type: String,
    default: '',
    required: true,
    trim: true,
    match: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
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
    default: {}
  }
});

candidatSchema.methods.generateHash = (password) => {
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

candidatSchema.methods.validPassword = (password) => {
  bcrypt.compareSync(password, this.password);
};

export default mongoose.model('Candidat', candidatSchema);
