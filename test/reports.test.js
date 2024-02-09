const { describe, expect, test, beforeEach } = require('@jest/globals')
const request = require('supertest')
const app = require('../server')

const reportRepository = require('../repositories/reportsRepository')
jest.mock('../repositories/reportsRepository')

describe('GET /reports', () => {
  beforeEach(() => jest.clearAllMocks())
  // 200 OK
  test('It should respond with an array of reports', async () => {
    const mockReports = [
      {
        id: 1,
        name: 'Lava',
        location: 'Florida',
        deathCount: 10,
        damage: 'Big'
      },
      {
        id: 2,
        name: 'Earthquake',
        location: 'Los Angeles',
        deathCount: 129,
        damage: 'Big'
      },
      {
        id: 3,
        name: 'Tsunami',
        location: 'Japan',
        deathCount: 7,
        damage: 'big'
      }
    ]
    reportRepository.prototype.find.mockResolvedValue(mockReports)
    const response = await request(app).get('/api/reports')
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(mockReports)
  })

  // 404 Not Found
  test('It should respond with 404 Not Found', async () => {
    reportRepository.prototype.find.mockResolvedValue([])
    const response = await request(app).get('/api/reports/')
    expect(response.statusCode).toEqual(404)
  })

  // 500 Internal Server Error
  test('It should respond with 500 Internal Server Error', async () => {
    reportRepository.prototype.find.mockRejectedValue(new Error('Error'))
    const response = await request(app).get('/api/reports')
    expect(response.statusCode).toEqual(500)
  })
})

describe('GET /reports/:id', () => {
  beforeEach(() => jest.clearAllMocks())

  // 200 OK
  test('It should respond with a report', async () => {
    const mockReport = {
      id: 2,
      name: 'Earthquake',
      location: 'Los Angeles',
      deathCount: 129,
      damage: 'Big'
    }
    reportRepository.prototype.retrieve.mockResolvedValue(mockReport)
    const response = await request(app).get('/api/reports/2')
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(mockReport)
  })

  // 404 Not Found
  test('It should respond with 404 Not Found', async () => {
    reportRepository.prototype.retrieve.mockRejectedValue([])
    const response = await request(app).get('/api/reports/')
    expect(response.statusCode).toEqual(404)
  })

  // 500 Internal Server Error
  test('It should respond with 500 Internal Server Error', async () => {
    reportRepository.prototype.retrieve.mockResolvedValue(new Error('Error'))
    const response = await request(app).get('/api/reports/2')
    expect(response.statusCode).toEqual(500)
  })
})

describe('POST /reports', () => {
  beforeEach(() => jest.clearAllMocks())
  // 201 Created
  test('It should respond with a report', async () => {
    const mockReport = {
      id: 3,
      name: 'Tsunami',
      location: 'Japan',
      deathCount: 7,
      damage: 'Big'
    }
    reportRepository.prototype.create.mockResolvedValue(mockReport)
    const response = await request(app).post('/api/reports').send(mockReport)
    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(mockReport)
  })
  // 404 Not Found
  test('It should respond with 404 Not Found', async () => {
    reportRepository.prototype.create.mockResolvedValue([])
    const response = await request(app).post('/api/reports').send({})
    expect(response.statusCode).toEqual(404)
  })

  // 500 Internal Server Error
  test('It should respond with 500 Internal Server Error', async () => {
    const mockReport = {
      id: 3,
      name: 'Tsunami',
      location: 'Japan',
      deathCount: 7,
      damage: 'Big'
    }
    reportRepository.prototype.create.mockRejectedValue(new Error('Error'))
    const response = await request(app).post('/api/reports').send(mockReport)
    expect(response.statusCode).toEqual(500)
  })
})

describe('PUT /reports/:id', () => {
  beforeEach(() => jest.clearAllMocks())
  test('It should respond with a update', async () => {
    const mockUpdate = {
      name: 'Hurricane'
    }
    reportRepository.prototype.update.mockResolvedValue(mockUpdate)
    const response = await request(app).put('/api/reports/1').send(mockUpdate)
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(mockUpdate)
  })
  test('It should respond with 404 Not Found', async () => {
    reportRepository.prototype.update.mockResolvedValue([])
    const response = await request(app).put('/api/reports').send({})
    expect(response.statusCode).toEqual(404)
  })
  test('It should respond with 500 Internal Server Error', async () => {
    const mockUpdate = {
      name: 'Hurricane'
    }
    reportRepository.prototype.update.mockRejectedValue(new Error('Error'))
    const response = await request(app).put('/api/reports/4').send(mockUpdate)
    expect(response.statusCode).toEqual(500)
  })
})

describe('DELETE /reports/:id', () => {
  beforeEach(() => jest.clearAllMocks())
  test('It should respond with a delete', async () => {
    const mockDelete = {
      id: 3,
      name: 'Tsunami',
      location: 'Japan',
      deathCount: 7,
      damage: 'Big'
    }
    reportRepository.prototype.delete.mockResolvedValue(mockDelete)
    const response = await request(app).delete('/api/reports/3')
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(mockDelete)
  })
  test('It should respond with 404 Not Found', async () => {
    reportRepository.prototype.delete.mockResolvedValue([])
    const response = await request(app).delete('/api/reports/')
    expect(response.statusCode).toEqual(404)
  })
  test('It should respond with 500 Internal Server Error', async () => {
    reportRepository.prototype.delete.mockRejectedValue(new Error('Error'))
    const response = await request(app).delete('/api/reports/3')
    expect(response.statusCode).toEqual(500)
  })
})
