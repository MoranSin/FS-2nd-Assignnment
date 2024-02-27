const { Router } = require('express')
const { reportsController } = require('../controllers/reportsController')
const reportsRouter = new Router()
const { errorHandler } = require('../middlewares/errorHandler')

reportsRouter.get('/', reportsController.getReports) //
reportsRouter.get('/:reportId', reportsController.getReportById) // localhost:3000/api/reports/6
reportsRouter.post('/', reportsController.addReport) //
reportsRouter.put('/:reportId', reportsController.updateReport) //
reportsRouter.delete('/:reportId', reportsController.deleteReport) //
reportsRouter.use(errorHandler)

module.exports = { reportsRouter }
