module.exports = function validateVideoId(req, res, next) {
  const { videoId } = req.params
  const videoIdRgx = new RegExp('[a-zA-Z0-9_-]{11}')
  if (videoId.length != 11 || !videoIdRgx.test(videoId)) {
    return res.status(400).json({
      status: false,
      message: 'Invalid video id'
    })
  }
  return next()
}
