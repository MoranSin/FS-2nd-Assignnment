const { reports } = require('../data/reports.json');
// const reportsRepository = require('../repositories/reportsRepository');
// const reports = new reportsRepository();

exports.reportsController = {
    // async getReports(req, res) {
    //     const result = {
    //         status: 200,
    //         message: '',
    //         data: await reports.find()
    //     };
    //     res.status(result.status);
    //     res.json(result.message || result.data);
    // },
    // async getReportById(req, res) {
    //     const { id } = req.params;
    //     const result = {
    //         status: 200,
    //         message: '',
    //         data: await reports.retrieve(id)
    //     };
    //     res.status(result.status);
    //     res.json(result.message || result.data);
    // },
    //
    // async addReport(req, res) {
    //     const { body:order } = req;
    //     const result = {
    //         status: 200,
    //         message: '',
    //         data: await reports.create(order)
    //     };
    //     res.status(result.status);
    //     res.json(result.message || result.data);
    // },
    //
    // async updateReport(req, res) {
    //     const {body:order, params:{id}} = req;
    //     const result = {
    //         status: 200,
    //         message: '',
    //         data: await reports.update(id, order)
    //     };
    //     res.status(result.status);
    //     res.json(result.message || result.data);
    // },
    //
    // async deleteReport(req, res) {
    //     const { id } = req.params;
    //     const result = {
    //         status: 200,
    //         message: '',
    //         data: await reports.delete(id)
    //     };
    //     res.status(result.status);
    //     res.json(result.message || result.data);
    // }
    getReports(req, res) {
        console.log("Get all orders");
        res.json(reports);
    },
    getReportById(req, res) {
        console.log("Get an order by id");
        const { id } = req.params;
        const report = reports.find(order => order.id === +id);
        res.json(report);
    },
    addReport(req, res) {
        console.log("Add an order");
        const { body } = req;
        reports.push(body);
        res.json(reports);
    },
    updateReport(req, res) {
        console.log("Update an order");
        const { id } = req.params;
        const { body } = req;
        const order = reports.find(order => order.id === +id);
        order.status = body.status;
        res.json(order);
    },
    deleteReport(req, res) {
        console.log("Delete an order");
        const { id } = req.params;
        const order = reports.find(order => order.id === +id);
        const index = reports.indexOf(order);
        reports.splice(index, 1);
        res.json(reports);
    }
}