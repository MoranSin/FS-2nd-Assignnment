const { Schema, model } = require('mongoose')
const reportSchema = new Schema({
  id: { type: Number },
  name: { type: String },
  location: { type: String },
  deathCount: { type: Number },
  damage: { type: String }
}, { collection: 'reports' })

module.exports = model('Report', reportSchema)
