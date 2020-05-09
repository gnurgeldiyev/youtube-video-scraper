const puppeteer = require('puppeteer')
const WebPage = require('../helper/webPage')
const getTexts = require('../helper/getTexts')
const {
  BROWSER_ARGS: args,
  SELECTORS: selectors
} = require('../config')

module.exports = async function getVideoData(req, res) {
  const { videoId } = req.params
  const url = `https://www.youtube.com/watch?v=${videoId}`
  let body
  let browser
  try {
    browser = await puppeteer.launch({ args })
    let page = new WebPage(browser, url)
    page = await page.load()
    /**
     * select elements
     */
    const elements = await Promise.all([
      page.$(selectors.title),
      page.$(selectors.description),
      page.$(selectors.channel),
      page.$(selectors.views),
      page.$(selectors.gameName)
    ])
    /**
     * every video should have
     * title, desc, channel and views
     */
    if (elements.slice(0, 4).filter((el) => el == null).length) {
      return res.status(404).json({
        status: false,
        message: 'Video not found with this id'
      })
    }
    /**
     * grab the text value of each element
     */
    const [
      title,
      description,
      channel,
      views
    ] = await getTexts(elements.slice(0, 4))

    body = {
      status: true,
      title,
      description,
      channel,
      views: views.match(/\d+/g).join('')
    }
    // attach game name if it is available
    if (elements[4]) {
      const [gameName] = await getTexts(elements.slice(-1))
      body.gameName = gameName
    }
  } catch (err) {
    return res.status(500).json(err)
  } finally {
    await browser.close()
  }

  return res.status(200).json(body)
}
