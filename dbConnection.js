const mongoose = require('mongoose')
const consts = require('./constans')
const { DB_HOST } = consts
const url = DB_HOST

mongoose
  .connect(url, {})
  .then(() => console.log('connected'))
  .catch(err => console.log(`connection error: ${err}`))
