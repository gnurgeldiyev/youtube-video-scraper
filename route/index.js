const router = require('express').Router()
const getVideoData = require('../controller')

router.get('/:videoId', getVideoData)

module.exports = router
