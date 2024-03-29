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
    reportRepository.findReports.mockResolvedValue(mockReports)
    const response = await request(app).get('/api/reports')
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(mockReports)
  })

  // 404 Not Found
  test('It should respond with 404 Not Found', async () => {
    reportRepository.findReports.mockResolvedValue([])
    const response = await request(app).get('/api/reports/')
    expect(response.statusCode).toEqual(404)
  })

  // 500 Internal Server Error
  test('It should respond with 500 Internal Server Error', async () => {
    reportRepository.findReports.mockRejectedValue(new Error('Error'))
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
    reportRepository.retrieveReport.mockResolvedValue(mockReport)
    const response = await request(app).get('/api/reports/2')
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(mockReport)
  })

  // 404 Not Found
  test('It should respond with 404 Not Found', async () => {
    reportRepository.retrieveReport.mockRejectedValue([])
    const response = await request(app).get('/api/reports/677')
    expect(response.statusCode).toEqual(404)
  })

  // 500 Internal Server Error
  test('It should respond with 500 Internal Server Error', async () => {
    reportRepository.retrieveReport.mockResolvedValue(new Error('Error'))
    const response = await request(app).get('/api/reports')
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
    reportRepository.createReport.mockResolvedValue(mockReport)
    const response = await request(app).post('/api/reports').send(mockReport)
    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(mockReport)
  })
  // 404 Not Found
  test('It should respond with 400 Bad Request if no body is provided', async () => {
    // reportRepository.prototype.create.mockResolvedValue()
    const response = await request(app).post('/api/reports').send()
    expect(response.statusCode).toEqual(400)
    expect(response.body).toHaveProperty('message', 'report body is required')
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
    reportRepository.createReport.mockRejectedValue(new Error('Error'))
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
    reportRepository.updateReport.mockResolvedValue(mockUpdate)
    const response = await request(app).put('/api/reports/1').send(mockUpdate)
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(mockUpdate)
  })
  test('It should respond with 404 Not Found', async () => {
    reportRepository.updateReport.mockResolvedValue([])
    const response = await request(app).put('/api/reports').send({})
    expect(response.statusCode).toEqual(404)
  })
  test('It should respond with 500 Internal Server Error', async () => {
    const mockUpdate = {
      name: 'Hurricane'
    }
    reportRepository.updateReport.mockRejectedValue(new Error('Error'))
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
    reportRepository.deleteReport.mockResolvedValue(mockDelete)
    const response = await request(app).delete('/api/reports/3')
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(mockDelete)
  })
  test('It should respond with 404 Not Found', async () => {
    reportRepository.deleteReport.mockResolvedValue([])
    const response = await request(app).delete('/api/reports/')
    expect(response.statusCode).toEqual(404)
  })
  test('It should respond with 500 Internal Server Error', async () => {
    reportRepository.deleteReport.mockRejectedValue(new Error('Error'))
    const response = await request(app).delete('/api/reports/3')
    expect(response.statusCode).toEqual(500)
  })
})
