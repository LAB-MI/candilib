import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const whitelistCanditatSchema = new Schema({
  email: {
    type: String,
    required: false,
    trim: true,
    unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  },
});

export default mongoose.model('WhitelistCandidat', whitelistCanditatSchema);
