import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from 'bcrypt';

const candidatSchema = new Schema({
  nomNaissance: {
    type: String,
    required: false
  },
  nomUsage: {
    type: String,
    required: false
  },
  prenom: {
    type: String,
    required: false
  },
  codeNeph: {
    type: String,
    required: false
  },
  dateNaissance: {
    type: Date,
    required: false
  },
  dateReussiteETG: {
    type: Date,
    required: false
  },
  dateDernierEchecPratique: {
    type: Date,
    required: false
  },
  reussitePratique: {
    type: String,
    required: false
  },
  email: {
    type: String,
    default: '',
  },
  mobile: {
    type: String,
    default: '',
  },
  adresse: {
    type: String,
    default: '',
  }
});

candidatSchema.methods.generateHash = (password) => {
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

candidatSchema.methods.validPassword = (password) => {
  bcrypt.compareSync(password, this.password);
};

export default mongoose.model('Candidat', candidatSchema);
