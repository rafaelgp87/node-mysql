'use strict'

const conn = require('./model.js')

class ListModel {

  getListByUser(values, callBack) {

    let query = `
      select BIN_TO_UUID(id) as id,
             nombre
        from proyecto.listas
       where id_user = UUID_TO_BIN(?);
    `
    conn.query(query, values, callBack)
  }
}

module.exports = ListModel
