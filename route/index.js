const router = require('express').Router()
const getVideoData = require('../controller')
const validateVideoId = require('../middleware/validateVideoId')

router.get('/:videoId', validateVideoId, getVideoData)

module.exports = router
