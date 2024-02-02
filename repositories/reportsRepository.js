const localStorage = require('../data/localStorage');
const mongoStorage = require('../data/mongoStorage');

module.exports = class reportsRepository{
    constructor() {
        if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_PASS) {
            this.storage = new mongoStorage('report');
        } else { this.storage = new localStorage('report'); }
    }

    find() {
        return this.storage.find();
    }

    retrieve(id) {
        return this.storage.retrieve(id);
    }

    create(data) {
        return this.storage.create(data);
    }

    update(id, data) {
        return this.storage.update(id, data);
    }

    delete(id) {
        return this.storage.delete(id);
    }
};