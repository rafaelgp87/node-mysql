'use strict'

const mysql = require('mysql')
const conf = require ('./db-conf.json')

const dbListas = {
  host : conf.listas.host,
  user : conf.listas.user,
  password : conf.listas.pass,
  port : conf.listas.port,
  database : conf.listas.db
}

const conn = mysql.createConnection(dbListas)

conn.connect((err) => {
  return(err)
    ? console.log(`Error al conectarse a MySQL base usuarios: ${err.stack}`)
    : console.log(`Conexión establecida con MySQL base usuarios N°: ${conn.threadId}`)
})


class UserModel {

  getUserById(values, callBack) {

    let query = `
      select * from usuarios.usuarios where id = UUID_TO_BIN(?);
    `

    conn.query(query, values, callBack)
  }

  getUserIdByEmail(values, callBack) {

    let query = `
      select BIN_TO_UUID(id) as id
        from usuarios.usuarios
       where email = ?
    `

    conn.query(query, values, callBack)
  }

  getUserPassByEmail(values, callBack) {

    let query = `
      select referencia
        from usuarios.usuarios
       where email = ?
    `

    conn.query(query, values, callBack)
  }

  getUserByEmail(values, callBack) {

    let query = `
      select BIN_TO_UUID(id) as id,
             fecha_registro,
             email,
             usuario,
             referencia,
             nombres,
             apellidos,
             genero,
             fecha_nacimiento,
             foto,
             token
        from usuarios.usuarios
       where email = ?
    `

    conn.query(query, values, callBack)
  }

  getUserByEmailPass(values, callBack) {

    let query = `
      select BIN_TO_UUID(id) as id,
             fecha_registro,
             email,
             usuario,
             referencia,
             nombres,
             apellidos,
             genero,
             fecha_nacimiento,
             foto,
             token
        from usuarios.usuarios
       where email = ?
         and referencia = ?;
    `

    conn.query(query, values, callBack)
  }

  getUserByEmailPassActive(values, callBack) {

    let query = `
      select BIN_TO_UUID(id) as id,
             fecha_registro,
             email,
             usuario,
             referencia,
             nombres,
             apellidos,
             genero,
             fecha_nacimiento,
             foto,
             token
        from usuarios.usuarios
       where email = ?
         and referencia = ?;
         and activo = 1;
    `

    conn.query(query, values, callBack)
  }

  insertUser(values, callBack) {

    let query = `
      insert into usuarios.usuarios
      (id, fecha_registro, email, usuario, referencia, nombres, apellidos, genero, fecha_nacimiento, foto, token, activo)
      values
      (UUID_TO_BIN(UUID()), now(), ?, null, ?, ?, ?, ?, ?, null, null, false);
    `

    //var requerido = new Buffer(req.body.referencia).toString('utf-8')

    conn.query(query, values, callBack)
  }

  updateUserActiveById(values, callBack) {

    let query = `
      update usuarios.usuarios set activo = true where id = UUID_TO_BIN(?);
    `
    conn.query(query, values, callBack)
  }
}

module.exports = UserModel;
