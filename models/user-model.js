'use strict'

const conn = require('./model.js')

class UserModel {

  getUserById(values, callBack) {

    let query = `
      select * from proyecto.usuarios where id = UUID_TO_BIN(?);
    `

    conn.query(query, values, callBack)
  }

  getUserIdByEmail(values, callBack) {

    let query = `
      select BIN_TO_UUID(id) as id
        from proyecto.usuarios
       where email = ?
    `

    conn.query(query, values, callBack)
  }

  getUserPassByEmail(values, callBack) {

    let query = `
      select referencia
        from proyecto.usuarios
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
        from proyecto.usuarios
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
        from proyecto.usuarios
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
        from proyecto.usuarios
       where email = ?
         and referencia = ?;
         and activo = 1;
    `

    conn.query(query, values, callBack)
  }

  insertUser(values, callBack) {

    let query = `
      insert into proyecto.usuarios
      (id, fecha_registro, email, usuario, referencia, nombres, apellidos, genero, fecha_nacimiento, foto, token, activo)
      values
      (UUID_TO_BIN(UUID()), now(), ?, null, ?, ?, ?, ?, ?, null, null, false);
    `

    //var requerido = new Buffer(req.body.referencia).toString('utf-8')

    conn.query(query, values, callBack)
  }

  updateUserActiveById(values, callBack) {

    let query = `
      update proyecto.usuarios set activo = true where id = UUID_TO_BIN(?);
    `
    conn.query(query, values, callBack)
  }
}

module.exports = UserModel;
