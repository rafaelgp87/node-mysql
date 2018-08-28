'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const history = require('connect-history-api-fallback');
const routerUser = require('./routes/user-router.js')
const routerList = require('./routes/list-router.js')
const publicDir = express.static(`${__dirname}/public`)
const port = (process.env.PORT || 3000)

let app = express()

app
  .set( 'port', port )

  .use( bodyParser.json() )
  .use( bodyParser.urlencoded({ extended: false }) )
  .use( history() )
  .use( publicDir )
  .use( routerUser )
  .use( routerList )

  .listen(app.get('port'), () =>
    console.log(`Iniciando Node Express con MySQL en el puerto ${app.get('port')}`)
  )
