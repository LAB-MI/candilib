import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const whitelistCanditatSchema = new Schema({
  nomNaissance: {
    type: String,
    required: false,
  },
  prenom: {
    type: String,
    required: false,
  },
  codeNeph: {
    type: String,
    required: false,
    match: /^[0-9]*$/,
  },
  email: {
    type: String,
    default: '',
    required: false,
    trim: true,
    unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  },
  portable: {
    type: String,
    default: '',
    required: false,
    trim: true,
    match: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
  },
  adresse: {
    type: String,
    default: '',
  },
  codeDepartement: {
    type: String,
    default: '',
  },
});

export default mongoose.model('WhitelistCandidat', whitelistCanditatSchema);
