const reportsRepository = require('../repositories/reportsRepository');
const reports = new reportsRepository();

exports.reportsController = {
    async getReports(req, res) {
        const result = {
            status: 200,
            message: '',
            data: await reports.find()
        };
        res.status(result.status);
        res.json(result.message || result.data);
    },
    async getReportById(req, res) {
        const { id } = req.params;
        const result = {
            status: 200,
            message: '',
            data: await reports.retrieve(id)
        };
        res.status(result.status);
        res.json(result.message || result.data);
    },

    async addReport(req, res) {
        // const { body:report } = req;
        const report = req.body;
        const result = {
            status: 200,
            message: '',
            data: await reports.create(report)
        };
        res.status(result.status);
        res.json(result.message || result.data);
    },

    async updateReport(req, res) {
        const {body:report, params:{id}} = req;
        const result = {
            status: 200,
            message: '',
            data: await reports.update(id, report)
        };
        res.status(result.status);
        res.json(result.message || result.data);
    },

    async deleteReport(req, res) {
        const { id } = req.params;
        const result = {
            status: 200,
            message: '',
            data: await reports.delete(id)
        };
        res.status(result.status);
        res.json(result.message || result.data);
    }
    // getReports(req, res) {
    //     console.log("Get all reports");
    //     res.json(reports);
    // },
    // getReportById(req, res) {
    //     console.log("Get an reports by id");
    //     const { id } = req.params;
    //     const report = reports.find(order => order.id === +id);
    //     res.json(report);
    // },
    // addReport(req, res) {
    //     console.log("Add an repost");
    //     const { body } = req;
    //     reports.push(body);
    //     res.json(reports);
    // },
    // updateReport(req, res) {
    //     console.log("Update an report");
    //     const { id } = req.params;
    //     const { body } = req;
    //     const order = reports.find(order => order.id === +id);
    //     order.status = body.status;
    //     res.json(order);
    // },
    // deleteReport(req, res) {
    //     console.log("Delete an report");
    //     const { id } = req.params;
    //     const order = reports.find(order => order.id === +id);
    //     const index = reports.indexOf(order);
    //     reports.splice(index, 1);
    //     res.json(reports);
    // }
}