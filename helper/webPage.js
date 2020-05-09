class WebPage {
  constructor(browser, url) {
    this.browser = browser
    this.url = url
  }

  async load() {
    this.page = await this.browser.newPage()
    await this.page.goto(this.url, {
      timeout: 0,
      waitUntil: ['load', 'domcontentloaded', 'networkidle0']
    })
    return this.page
  }
}

module.exports = WebPage
