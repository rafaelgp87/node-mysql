'use strict'

const UserController = require('../controllers/user-controller.js')
const express = require('express')
const router = express.Router()
const uc = new UserController;

router
  .post('/login', uc.login)
  .post('/registrarse', uc.registrarse)
  .post('/reenviar-password', uc.reenviarPassword)

module.exports = router;
