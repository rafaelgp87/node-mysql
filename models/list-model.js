'use strict'

const conn = require('./model.js')

class ListModel {

  getListByUser(values, callBack) {

    let query = `
    select BIN_TO_UUID(a.id) as id_lista,
           a.fecha_registro as fecha_registro_lista,
           a.nombre as nombre_lista,
           BIN_TO_UUID(b.id) as id_item,
           b.fecha_registro as fecha_registro_item,
           b.nombre as nombre_item,
           b.descripcion,
           b.url
      from proyecto.listas a
      left join proyecto.lista_item b on a.id = b.id_lista
     where a.id_user = UUID_TO_BIN(?)
     order by a.nombre;
    `
    conn.query(query, values, callBack)
  }
}

module.exports = ListModel
