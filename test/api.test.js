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
      statusCode: 200,
      body: {
        status: true,
        title: 'Fortnite World Cup Solo Finals - Full Match (Bugha)',
        description: 'Watch the exciting full Fortnite World Cup Solo Finals match! The final match that won 16-year-old Bugha, Kyle Giersdorf, 1st at the World Cup.\n\n------------------------------­----\nWatch more on IGN here!\n------------------------------­----\n\nDAILY FIX: https://www.youtube.com/watch?v=-_e1a...\nGAME REVIEWS: https://www.youtube.com/watch?v=pCJme...\nMOVIE REVIEWS: https://www.youtube.com/watch?v=pCJme...\nTRAILERS: https://www.youtube.com/watch?v=hr1df...\nNEWS: https://www.youtube.com/watch?v=Ctgzg...\n\n#ign',
        channel: 'IGN',
        gameName: 'Fortnite'
      }
    }
    const res = await api.get(`/${videoId}`).set('Accept', 'application/json')

    expect(res.statusCode).toEqual(expectedResult.statusCode)
    expect(res.body).toEqual(expectedResult.body)
  })

  test('Video #2 - should succeed', async () => {
    const videoId = '--_lvrwXtt8'
    const expectedResult = {
      statusCode: 200,
      body: {
        status: true,
        title: 'Bugha - Stories from the Battle Bus',
        description: 'Follow the journey of the first ever Solo Fortnite World Cup Winner, Bugha, as he relives the moments leading up to his most important Victory Royale.\n\nPlay Fortnite Battle Royale, the completely free 100-player PvP mode. One giant map, A Battle Bus, Last one standing wins. ESRB Rating: Teen with Violence.\n\nInstagram: https://www.instagram.com/fortnite/\nTwitter: https://twitter.com/FortniteGame\nFacebook: https://www.facebook.com/FortniteGame/\n\nLearn More: https://www.epicgames.com/fortnite/en...',
        channel: 'Fortnite',
        gameName: 'Fortnite'
      }
    }
    const res = await api.get(`/${videoId}`).set('Accept', 'application/json')

    expect(res.statusCode).toEqual(expectedResult.statusCode)
    expect(res.body).toEqual(expectedResult.body)
  })

  test('Video #3 - should succeed without game name', async () => {
    const videoId = 'ZRCdORJiUgU'
    const expectedResult = {
      statusCode: 200,
      body: {
        status: true,
        title: 'Google — Year in Search 2019',
        description: 'Throughout history, when times are challenging, the world goes looking for heroes. And this year, searches for heroes — both superheroes and everyday heroes — soared around the world. Explore more trends from the year at https://google.com/2019 \n\n#YearinSearch #YearinSearch2019\n\nAudio-described version here: https://youtu.be/28H7ykj4VMg\n\nC R E D I T S:\n\nGoogle Brand Studio\nSound: Lime Studios\nVFX/Color/Finish: Chapeau Studios\nMusic Supervision: Butter Music and Sound \nProduction support: Where the Buffalo Roam\n\nMusic:\nMaggie Rogers -  “Back In My Body (SiloxBettinaBergström Remix) https://maggierogers.lnk.to/BackInMyB...\nCourtesy of Debay Sounds LLC/Capitol Records\n\nSelect footage courtesy of: \n“From Smithsonian Channel’s program “Black Hole Hunters” © 2019 Windfall Films Ltd. and SNI/SI Networks L.L.C.” (for the footage)\n"The Event Horizon Telescope Collaboration" (for the simulation)\nAudio - "National Science Foundation"\n\nSesame Street excerpts provided courtesy of Sesame Workshop New York, NY -  ©2019 Sesame Workshop.  Sesame Street® and associated characters, trademarks and design elements are owned and licensed by Sesame Workshop. \n\n“When They See Us” Courtesy of Netflix\n\n“Tidying Up with Marie Kondo”  Courtesy of Netflix\n\n“Stranger Things” Courtesy of Netflix\n\nCentral Michigan University\n\nSimone Biles gymnastics content provided courtesy of USA Gymnastics / NBC Sports\n\nGame of Thrones/HBO\n\nChildren’s Hospital Los Angeles\n\nU.S. Coast Guard video by Seaman Erik Villa-Rodriguez\n\nTopper\'s Pizza Place\n\n2019 ISU Grand Prix of Figure Skating – Skate Canada footage\n\n2019 Rugby World Cup footage featuring South Africa \n\n2019 Wimbledon footage featuring highlights of Venus Williams vs Coco Gauff\n \n©INEOS 1:59 Challenge\n\n2019 NBA Entertainment\n\nCourtesy of Charlie Rose, Inc.\n\nAcademy of Arts and Sciences',
        channel: 'Google',
        gameName: ''
      }
    }
    const res = await api.get(`/${videoId}`).set('Accept', 'application/json')

    expect(res.statusCode).toEqual(expectedResult.statusCode)
    expect(res.body).toEqual(expectedResult.body)
  })
})
