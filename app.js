'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const routerUser = require('./routes/user-router.js')
const routerList = require('./routes/list-router.js')
const publicDir = express.static(`${__dirname}/public`)
const port = (process.env.PORT || 3000)

let app = express()

app
  .set( 'port', port )

  .use( bodyParser.json() )
  .use( bodyParser.urlencoded({ extended: false }) )
  .use( publicDir )
  .use( routerUser )
  .use( routerList )

module.exports = app;
