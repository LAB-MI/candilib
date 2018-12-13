import mongoose from 'mongoose';

import { email as emailRegex } from '../lib/regex'

const { Schema } = mongoose;

const whitelistCanditatSchema = new Schema({
  email: {
    type: String,
    required: false,
    trim: true,
    unique: true,
    match: emailRegex,
  },
});

export default mongoose.model('WhitelistCandidat', whitelistCanditatSchema);
