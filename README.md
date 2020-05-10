# Building a YouTube Scraper REST API with Puppeteer by following the TDD approach

Scrapes YouTube video data with ID, and returns `title`, `description`, `channel`, `views` and `gameName` (if it's a game video)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Installed local [Node.js](https://nodejs.org/) environment
- Package manager to install packages. [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)

Clone the repo in your environment

```bash
git clone https://github.com/gnurgeldiyev/youtube-video-scraper.git
```

### Installing

```bash
# move into project folder
cd youtube-video-scraper

# install the dependencies
yarn install

# rename the .env.sample
mv .env.sample .env

# add your variables
nano .env
```

#### Running the server

```bash
yarn start
```

## Example

```bash
# GET - /{videoId}
curl localhost:3000/h8OX0FNWANM
```

##### Response

```json
{
  "status": true,
  "title": "Recognizing Ignaz Semmelweis and Handwashing",
  "description": "Today’s Doodle follows the official guidelines ...",
  "channel": "GoogleDoodles",
  "views": "56188961"
}
```

## Running the tests

```bash
yarn test
```

## Built With

* [Express](https://github.com/expressjs/express/) - The web framework used
* [Puppeteer](https://github.com/puppeteer/puppeteer) - For web scraping
* [Jest](https://github.com/facebook/jest) - For testing
* [SuperTest](https://github.com/visionmedia/supertest) - For testing HTTP API

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
