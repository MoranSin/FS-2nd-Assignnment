const { Router } = require('express')
const { reportsController } = require('../controllers/reportsController')
const reportsRouter = new Router()
const { errorHandler } = require('../middlewares/errorHandler')


reportsRouter.get('/', reportsController.getReports) //
reportsRouter.get('/:id', reportsController.getReportById) // localhost:3000/api/reports/6
reportsRouter.post('/', reportsController.addReport) //
reportsRouter.put('/:id', reportsController.updateReport) //
reportsRouter.delete('/:id', reportsController.deleteReport) //
reportsRouter.use(errorHandler)

module.exports = { reportsRouter }
