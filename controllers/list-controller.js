'use strict'

const ListModel = require('../models/list-model.js')
const lm = new ListModel()

class ListController {

  getList(req, res, next) {

    let values = [req.body.userId]

    lm.getListByUser(values, (err, rows) => {
      if (err) {
        console.log('***** Error getUserByEmailPass *****')
        console.log(err)
        console.log('********************************')
        res.json({
          code : 100,
          mensaje : "Error en la consulta"
        })

      } else {
        console.log('***** Resultado getUserByEmailPass *****')
        console.log(rows)
        console.log('************************************')

        res.json(rows)
      }
    })
  }

  insertList(req, res, next) {

  }

  updateList(req, res, next) {

  }

  deleteList(req, res, next) {

  }
}

module.exports = ListController
