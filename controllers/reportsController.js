const ReportsRepository = require('../repositories/reportsRepository')
const reports = new ReportsRepository()
const { EntityNotFoundError, PropertyNotFoundError } = require('../errors/NotFoundError')
let counter = 5
exports.reportsController = {
  async getReports (req, res) {
    try {
      const result = {
        status: 200,
        message: '',
        data: await reports.find()
      }
      if (result.data.length === 0 || !result.data) throw new EntityNotFoundError('Reports')
      res.status(result.status)
      res.json(result.message || result.data)
    } catch (error) {
      res.status(error?.status || 500)
      res.json({ message: error.message })
    }
  },
  async getReportById (req, res) {
    const { id } = req.params
    try {
      if (id === ':id') throw new PropertyNotFoundError('id')
      const result = {
        status: 200,
        message: '',
        data: await reports.retrieve(id)
      }
      if (result.data.length === 0 || !result.data) throw new EntityNotFoundError('Report')
      res.status(result.status)
      res.json(result.message || result.data)
    } catch (error) {
      res.status(error?.status || 500)
      res.json({ message: error.message })
    }
  },

  async addReport (req, res) {
    const report = req.body
    report.id = ++counter
    try {
      if (report.length === 0) throw new PropertyNotFoundError('report')
      const result = {
        status: 201,
        message: '',
        data: await reports.create(report)
      }
      // if (!result.data) throw new Error('Error creating report')
      res.status(result.status)
      res.json(result.message || result.data)
    } catch (error) {
      res.status(error?.status || 500)
      res.json({ message: error.message })
    }
  },

  async updateReport (req, res) {
    const { body: report, params: { id } } = req
    try {
      if (report.length === 0) throw new PropertyNotFoundError('report')
      if (id === ':id') throw new PropertyNotFoundError('id')
      const result = {
        status: 200,
        message: '',
        data: await reports.update(id, report)
      }
      if (!result.data) throw new Error('Error updating report')
      res.status(result.status)
      res.json(result.message || result.data)
    } catch (error) {
      res.status(error?.status || 500)
      res.json({ message: error.message })
    }
  },

  async deleteReport (req, res) {
    const { id } = req.params
    try {
      if (id === ':id') throw new PropertyNotFoundError('id')
      const result = {
        status: 200,
        message: '',
        data: await reports.delete(id)
      }
      if (!result.data) throw new Error('Error deleting report')
      res.status(result.status)
      res.json(result.message || result.data)
    } catch (error) {
      res.status(error?.status || 500)
      res.json({ message: error.message })
    }
  }
}
