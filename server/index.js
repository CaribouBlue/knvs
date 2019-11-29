const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

nextApp.prepare()
  .then(() => {
    app = express()
    PORT = process.env.PORT || process.env.port || 1337
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`)
    })

    app.get('*', (req, res) => {
      nextApp.render(req, res, req.path, req.query)
    })
  })
  .catch(err => {
    console.log('Error starting server')
    console.log(err)
  })
