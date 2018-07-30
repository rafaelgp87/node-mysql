'use strict'

const conn = require('../models/model.js')
const nodemailer = require('nodemailer')
const e = require ('./email-conf.json')

const transporter = nodemailer.createTransport({
  host: e.email.servidorEmail,
  port: e.email.puertoEmail,
  auth: {
    user: e.email.emailAdmin,
    pass: e.email.emailPass
  }
})

class UserController {

  login(req, res, next) {
    var requerido = new Buffer(req.body.referencia).toString('utf-8')

    let query = `
    select
      BIN_TO_UUID(id) as id, 
      fecha_registro, 
      email, 
      usuario, 
      referencia, 
      nombres, apellidos, genero, 
      fecha_nacimiento, foto, token
      from proyecto.usuarios 
     from proyecto.usuarios 
    where email = ? 
      and referencia = ?;`
    
    let queryActivo = "select * from proyecto.usuarios where email = ? and referencia = ? and activo = 1;"

    conn.query(query, [req.body.email, requerido], function (err, rows) {
      if (err) {
        console.log('***** Error en la consulta *****')
        console.log(err)
        console.log('********************************')
        res.json({
          code : 100,
          mensaje : "Error en la consulta"
        })

      } else {
        console.log(rows)

        if(rows[0] == undefined) {
          res.json("Datos incorrectos")

        } else {
          res.json(rows[0])
        }
      }
    })
  }

  registrarse(req, res, next) {

    let query = "select * from proyecto.usuarios where email = ?;"

    conn.query(query, [req.body.email], function (err, rows) {
      if(err) {
        console.log('Error en la consulta')
            res.json({
              code : 100,
              mensaje : "Error en la consulta"
            })

      } else {
        if (rows.length > 0) {
          res.json({
            mensaje: "El email seleccionado ya esta registrado"
          })

        } else {

          let queryRegistro = `
            insert into proyecto.usuarios 
            (id, fecha_registro, email, usuario, referencia, nombres, apellidos, genero, fecha_nacimiento, foto, token, activo)
            values 
            (UUID_TO_BIN(UUID()), now(), ?, null, ?, ?, ?, ?, ?, null, null, false); 
          `

          conn.query(queryRegistro,
          [req.body.email, req.body.referencia, req.body.nombres, req.body.apellidos, req.body.genero, req.body.fecha_nacimiento], function(err, rows) {

            if (err) {
              console.log('***** Error en la consulta *****')
              console.log(err)
              console.log('********************************')

              res.json({
                code : 100,
                mensaje : "Error en la consulta"
              })

            } else {

              let queryID = `
                select BIN_TO_UUID(id) as id from proyecto.usuarios where email = ?;
              `

              conn.query(queryID, [req.body.email] , function (err, rows) {

                if (err) {
                  console.log('***** Error en la consulta *****')
                  console.log(err)
                  console.log('********************************')
                  res.json({
                    code : 100,
                    mensaje : "Error en la consulta"
                  })

                } else {
                  enviarCorreoActivacion(rows[0].id, req, res)
                }
              })
            }
          })
        }
      }
    })
  }

  reenviarPassword(req, res, next) {

    let query = 'select referencia from proyecto.usuarios where email = ? and activo = 1;'

    conn.query(query, [req.body.email], function(err, rows) {

      if (err) {
        console.log('***** Error en la consulta *****')
        console.log(err)
        console.log('********************************')
        res.json({
          code : 100, 
          mensaje : "Error en la consulta"
        })

      } else {

        if (rows.length == 0) {
          res.json('Datos incorrectos')

        } else {
          var mailOptions = {
            to: req.body.email,
            subject: 'Recuperación de contraseña',
            html: `<p>Hola, su contraseña es: ${rows[0].referencia} </p>`
          }

          transporter.sendMail(mailOptions, function(err, info) {
            if (err) {
              console.log('***** Error en la consulta *****')
              console.log(err)
              console.log('********************************')

              res.json({
                mensaje : "Error"
              })
            } else {
              res.json("Ok")
            }
          })
        }
      }
    })
  }

  activarCuenta(req, res, next) {

      conn.query("select * from proyecto.usuarios where id = UUID_TO_BIN(?);", [req.body.id], function(err, rows) {

        if (err) {
          console.log('***** Error en la consulta *****')
          console.log(err)
          console.log('********************************')

          res.json({
            code : 100, 
            status : "Error en la consulta",
            mensaje : "Esta cuenta no pudo ser activada"
          })

        } else {

          if (rows.length > 0) {
            
            let query = "update proyecto.usuarios set activo = true where id = UUID_TO_BIN(?);"

            conn.query(query, [req.body.id], function(err, rows){
              if(err) {
                console.log('***** Error en la consulta *****')
                console.log(err)
                console.log('********************************')

                res.json({
                  code : 100, 
                  mensaje : "Error en la consulta"
                })

              } else {
                res.json({
                  mensaje : `Su cuenta ha sido activada :)`
                })
              }
            })

          } else {
            res.json({
              mensaje : `Esta cuenta no puede ser activada, contacte al administrador`
            })
          }
        }
      })
  }
}

module.exports = UserController

function enviarCorreoActivacion (idUsuario, req, res) {

  let mailOptions = {
    to: req.body.email,
    subject: 'Bienvenido al proyecto',
    html: `<p>Hola, de click en la siguiente liga para activar su cuenta: </p>
          <a href="${e.email.client}/#/activar-cuenta/${idUsuario}">Activar cuenta ✔</a>`
  }

  transporter.sendMail(mailOptions, function(error, info) {
    if(error){
      console.log(error)
      res.json({mensaje:'No se pudo enviar el email de activación'})
    }else{
      res.json({mensaje:'Registro realizado'})
      console.log('***** Se envío el email *****')
      console.log(mailOptions)
      console.log('*****************************')
    }
  })
}

//var cookies = parseCookies(req)
//var srtUrl = req.url

function parseCookies (req) {
  var list = {}
  var rc = req.headers.cookie

  rc && rc.split(';').forEach(function( cookie ) {
      var parts = cookie.split('=')
      list[parts.shift().trim()] = decodeURI(parts.join('='))
  })

  return list
}
