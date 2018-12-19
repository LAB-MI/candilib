import mongoose from 'mongoose'

const { Schema } = mongoose

const creneauDateSchema = new Schema({
  inspecteur: {
    type: String,
    required: false,
  },
  centre: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: false,
  },
  isSelected: {
    type: Boolean,
    required: false,
  },
  candidat: {
    type: String,
    required: false,
  },
})

export default mongoose.model('Creneau', creneauDateSchema, 'creneaux')
