'use strict'

const mysql = require('mysql')
const conf = require ('./db-conf.json')

const dbUsuarios = {
  host : conf.usuarios.host,
  user : conf.usuarios.user,
  password : conf.usuarios.pass,
  port : conf.usuarios.port,
  database : conf.usuarios.db
}

const conn = mysql.createConnection(dbUsuarios)

conn.connect((err) => {
  return(err)
    ? console.log(`Error al conectarse a MySQL base listas: ${err.stack}`)
    : console.log(`Conexión establecida con MySQL base listas N°: ${conn.threadId}`)
})

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
      from listas.listas a
      left join listas.item b on a.id = b.id_lista
     where a.id_user = UUID_TO_BIN(?)
     order by a.nombre;
    `
    conn.query(query, values, callBack)
  }
}

module.exports = ListModel
