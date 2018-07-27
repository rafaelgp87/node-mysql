'use strict'

const NavController = require('../controllers/nav-controller.js')
const express = require('express')
const router = express.Router()
const nc = new NavController;

router
  .get('/', nc.getHome)
  .get('/login', nc.getLogin)
  .get('/activar-cuenta/:cuenta', nc.getActivarCuenta, nc.getUrlActivarCuenta)
  .use( nc.error404 )

module.exports = router;
