# YouTube Video Scraper

Scrapes video data with ID, and returns `title`, `description`, `channel` and `gameName` (if it's a game video)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

```bash
git clone https://github.com/gnurgeldiyev/youtube-video-scraper.git
```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

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

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

```bash
yarn test
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
  "gameName": ""
}
```

## Built With

* [Express](https://github.com/expressjs/express/) - The web framework used
* [Puppeteer](https://github.com/puppeteer/puppeteer) - For web scraping
* [Jest](https://github.com/facebook/jest) - For testing
* [SuperTest](https://github.com/visionmedia/supertest) - For testing HTTP API

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
