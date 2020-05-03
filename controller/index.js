const puppeteer = require('puppeteer')

const selectors = {
  title: 'div#info-contents div#container > h1.title',
  views: 'div#info-contents div#container div#count span',
  description: 'div#meta div#content div#description',
  channel: 'div#meta div#upload-info div#text-container',
  gameName: 'div#meta div#contents div#title'
}

function coerceIntoNumber(views) {
  let pureViews = views.split(' ')[0]
  const countDots = pureViews.match(/\./gi)
  for (let i = 0; i < countDots.length; i++) {
    pureViews = pureViews.replace('.', '');
  }
  return Number(pureViews)
}

module.exports = async function getVideoData(req, res) {
  const { videoId } = req.params
  const url = `https://www.youtube.com/watch?v=${videoId}`
  const videoIdRgx = new RegExp('[a-zA-Z0-9_-]{11}')
  let body = {}
  // validate the video id
  if (videoId.length != 11 || !videoIdRgx.test(videoId)) {
    return res.status(400).json({
      status: false,
      message: 'Invalid video id'
    })
  }
  try {
    const args = [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-infobars',
      '--window-position=0,0',
      '--ignore-certifcate-errors',
      '--ignore-certifcate-errors-spki-list',
      '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'
    ]
    const options = {
      args,
      headless: true,
      ignoreHTTPSErrors: true
    }
    const browser = await puppeteer.launch(options)
    const page = await browser.newPage()
    await page.goto(url)

    const elements = await Promise.all([
      page.$(selectors.title),
      page.$(selectors.views),
      page.$(selectors.description),
      page.$(selectors.channel),
      page.$(selectors.gameName)
    ])
    /**
     * if page has not any title
     * then it means, this video is not avaliable
     */
    if (!elements[0]) {
      return res.status(404).json({
        status: false,
        message: 'Video not found with this id'
      })
    }
    const title = await (await elements[0].getProperty('textContent')).jsonValue()
    const views = await (await elements[1].getProperty('textContent')).jsonValue()
    const description = await (await elements[2].getProperty('textContent')).jsonValue()
    const channel = await (await elements[3].getProperty('textContent')).jsonValue()

    // parse views data and return exact number
    const viewsNumber = coerceIntoNumber(views)
    body = {
      status: true,
      title: title.trim(),
      description: description.trim(),
      channel: channel.trim(),
      views: viewsNumber
    }
    // if video has game card in description
    if (elements[4]) {
      const gameName = await (await elements[4].getProperty('textContent')).jsonValue()
      body.gameName = gameName
    }

    await browser.close()
  } catch (err) {
    return res.status(500).json(err)
  }

  return res.status(200).json(body)
}
