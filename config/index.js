const dotenv = require('dotenv')

const result = dotenv.config()
if (result.error) {
  throw result.error
}

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  BROWSER_ARGS: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-infobars',
    '--window-position=0,0',
    '--ignore-certifcate-errors',
    '--ignore-certifcate-errors-spki-list',
    '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'
  ],
  SELECTORS: {
    title: 'div#info-contents div#container > h1.title',
    description: 'div#meta div#content div#description',
    channel: 'div#meta div#upload-info div#text-container',
    views: 'div#info-contents div#container div#count span',
    gameName: 'div#meta div#contents div#title'
  }
}
