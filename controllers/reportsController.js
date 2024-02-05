const ReportsRepository = require('../repositories/reportsRepository')
const reports = new ReportsRepository()

exports.reportsController = {
  async getReports (req, res) {
    const result = {
      status: 200,
      message: '',
      data: await reports.find()
    }
    res.status(result.status)
    res.json(result.message || result.data)
  },
  async getReportById (req, res) {
    const { id } = req.params
    const result = {
      status: 200,
      message: '',
      data: await reports.retrieve(id)
    }
    res.status(result.status)
    res.json(result.message || result.data)
  },

  async addReport (req, res) {
    // const { body:report } = req;
    const report = req.body
    const result = {
      status: 200,
      message: '',
      data: await reports.create(report)
    }
    res.status(result.status)
    res.json(result.message || result.data)
  },

  async updateReport (req, res) {
    const { body: report, params: { id } } = req
    const result = {
      status: 200,
      message: '',
      data: await reports.update(id, report)
    }
    res.status(result.status)
    res.json(result.message || result.data)
  },

  async deleteReport (req, res) {
    const { id } = req.params
    const result = {
      status: 200,
      message: '',
      data: await reports.delete(id)
    }
    res.status(result.status)
    res.json(result.message || result.data)
  }
}
