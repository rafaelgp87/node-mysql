'use strict'

const ListController = require('../controllers/list-controller.js')
const express = require('express')
const router = express.Router()
const lc = new ListController;

router
  .post('/get-list', lc.getList)
  .post('/insert-list', lc.insertList)
  .post('/update-list', lc.updateList)
  .post('/delete-list', lc.deleteList)

module.exports = router;
