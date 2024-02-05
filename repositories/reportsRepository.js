const MongoStorage = require('../data/mongoStorage')

module.exports = class reportsRepository {
  constructor () { this.storage = new MongoStorage('report') }

  find () {
    return this.storage.find()
  }

  retrieve (id) {
    return this.storage.retrieve(id)
  }

  create (data) {
    return this.storage.create(data)
  }

  update (id, data) {
    return this.storage.update(id, data)
  }

  delete (id) {
    return this.storage.delete(id)
  }
}
