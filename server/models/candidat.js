import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from 'bcrypt';

const candidatSchema = new Schema({
  nomNaissance: {
    type: String,
    required: false,
  },
  nomUsage: {
    type: String,
    required: false,
  },
  prenom: {
    type: String,
    required: false,
  },
  codeNeph: {
    type: Number,
    required: false,
  },
  dateNaissance: {
    type: Date,
    required: false,
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
    trim: true, unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  },
  portable: {
    type: Number,
    default: '',
  },
  adresse: {
    type: String,
    default: '',
  },
  isValid: {
    type: Boolean,
    default: false,
  },
});

candidatSchema.methods.generateHash = (password) => {
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

candidatSchema.methods.validPassword = (password) => {
  bcrypt.compareSync(password, this.password);
};

export default mongoose.model('Candidat', candidatSchema);
