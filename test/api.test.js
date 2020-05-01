/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-undef */
const request = require('supertest')
const server = require('../server')

describe('GET /{videoId} - Youtube Video Scraper', () => {
  let api
  beforeAll(async () => {
    api = await request(server)
  })

  afterAll(() => {
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

    expect(res.statusCode).toEqual(expectedResult.statusCode)
    expect(res.body).toEqual({
      status: true,
      title: expect.stringMatching(/.+/),
      description: expect.stringMatching(/.+/),
      channel: expect.stringMatching(/.+/),
      gameName: expect.stringMatching(/.+/)
    })
  })

  test('Video #2 - should succeed', async () => {
    const videoId = '--_lvrwXtt8'
    const expectedResult = {
      statusCode: 200
    }
    const res = await api.get(`/${videoId}`).set('Accept', 'application/json')

    expect(res.statusCode).toEqual(expectedResult.statusCode)
    expect(res.body).toEqual({
      status: true,
      title: expect.stringMatching(/.+/),
      description: expect.stringMatching(/.+/),
      channel: expect.stringMatching(/.+/),
      gameName: expect.stringMatching(/.+/)
    })
  })

  test('Video #3 - should succeed without game name', async () => {
    const videoId = 'ZRCdORJiUgU'
    const expectedResult = {
      statusCode: 200
    }
    const res = await api.get(`/${videoId}`).set('Accept', 'application/json')

    expect(res.statusCode).toEqual(expectedResult.statusCode)
    expect(res.body).toEqual({
      status: true,
      title: expect.stringMatching(/.+/),
      description: expect.stringMatching(/.+/),
      channel: expect.stringMatching(/.+/)
    })
  })
})
