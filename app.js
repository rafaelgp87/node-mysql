'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const routerNav = require('./routes/nav-router.js')
const routerUser = require('./routes/user-router.js')
const favicon = require('serve-favicon')(`${__dirname}/public/img/favicon.png`)
const publicDir = express.static(`${__dirname}/public`)
const viewDir = `${__dirname}/views`
const port = (process.env.PORT || 3000)

let app = express()

app
  .set( 'views', viewDir )
  .set( 'view engine', 'pug' )
  .set( 'port', port )

  .use( bodyParser.json() )
  .use( bodyParser.urlencoded({ extended: false }) )
  .use( publicDir )
  .use( '/activar-cuenta/:cuenta', publicDir )
  .use( favicon )
  .use( routerNav )
  .use( routerUser )

module.exports = app;
