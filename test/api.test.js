/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-undef */
const request = require('supertest')
const server = require('../server')

describe('GET /{videoId} - Youtube Video Scraper', () => {
  let api
  beforeAll(async () => {
    api = await request(server)
  })

  afterAll((done) => {
    done()
  })

  test('Validate videoId - should fail', async () => {
    const videoId = '0123456789'
    const expectedResult = {
      statusCode: 400,
      body: {
        status: false,
        message: 'Invalid video id'
      }
    }
    const res = await api.get(`/${videoId}`).set('Accept', 'application/json')

    expect(res.statusCode).toEqual(expectedResult.statusCode)
    expect(res.body).toEqual(expectedResult.body)
  })

  test('Video #1 - should succeed', async () => {
    const videoId = 'EXuqhgghPuA'
    const expectedResult = {
      statusCode: 200
    }
    const res = await api.get(`/${videoId}`).set('Accept', 'application/json')
    const expectedViews = res.body.views
    delete res.body.views

    expect(res.statusCode).toEqual(expectedResult.statusCode)
    expect(expectedViews).toBeGreaterThanOrEqual(3404844)
    expect(res.body).toEqual({
      status: true,
      title: 'Fortnite World Cup Solo Finals - Full Match (Bugha)',
      description: expect.stringMatching(/.+/),
      channel: 'IGN',
      gameName: 'Fortnite'
    })
  })

  test('Video #2 - should succeed', async () => {
    const videoId = '--_lvrwXtt8'
    const expectedResult = {
      statusCode: 200
    }
    const res = await api.get(`/${videoId}`).set('Accept', 'application/json')
    const expectedViews = res.body.views
    delete res.body.views

    expect(res.statusCode).toEqual(expectedResult.statusCode)
    expect(expectedViews).toBeGreaterThanOrEqual(9428833)
    expect(res.body).toEqual({
      status: true,
      title: 'Bugha - Stories from the Battle Bus',
      description: expect.stringMatching(/.+/),
      channel: 'Fortnite',
      gameName: 'Fortnite'
    })
  })

  test('Video #3 - should succeed without game name', async () => {
    const videoId = 'ZRCdORJiUgU'
    const expectedResult = {
      statusCode: 200
    }
    const res = await api.get(`/${videoId}`).set('Accept', 'application/json')
    const expectedViews = res.body.views
    delete res.body.views

    expect(res.statusCode).toEqual(expectedResult.statusCode)
    expect(expectedViews).toBeGreaterThanOrEqual(153017500)
    expect(res.body).toEqual({
      status: true,
      title: 'Google — Year in Search 2019',
      description: expect.stringMatching(/.+/),
      channel: 'Google'
    })
  })

  test('Video #4 - should return 404', async () => {
    const videoId = '12345678901'
    const expectedResult = {
      statusCode: 404,
      body: {
        status: false,
        message: 'Video not found with this id'
      }
    }
    const res = await api.get(`/${videoId}`).set('Accept', 'application/json')

    expect(res.statusCode).toEqual(expectedResult.statusCode)
    expect(res.body).toEqual(expectedResult.body)
  })
})
