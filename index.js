const app = require('./server')
const { HOST, PORT } = require('./config')

// Listen the server
app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`)
})
