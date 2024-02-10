const express = require('express')
const { errorHandler } = require('./middlewares/errorHandler')
const logger = require('morgan') // NOTE: for debugging
const app = express()
const port = process.env.PORT || 3000

const { reportsRouter } = require('./routers/reportRouter')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/reports', reportsRouter)
app.use(errorHandler)
app.use(logger('dev'))

app.listen(port, () => console.log(`Express server is running on port ${port}`))

module.exports = app // for testing
