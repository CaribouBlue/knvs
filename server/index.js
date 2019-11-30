const express = require('express')
const bodyParser = require('body-parser');
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const handleMiddleware = (req, res) => {handle(req, res)}

nextApp.prepare()
  .then(() => {
    const app = express()
    const api = express.Router()

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', api)

    app.get('*', handleMiddleware)

    PORT = process.env.PORT || process.env.port || 1337
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`)
    })
  })
  .catch(err => {
    console.log('Error starting server')
    console.log(err)
  })
