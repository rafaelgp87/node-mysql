'use strict'

const UserModel = require('../models/user-model.js')
const um = new UserModel()

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

    let values = [req.body.email, req.body.referencia]

    um.getUserByEmailPass(values, (err, rows) => {
      if (err) {
        console.log('***** Error getUserByEmailPass *****')
        console.log(err)
        res.json({
          code : 100,
          mensaje : "Error en la consulta"
        })

      } else {
        console.log('***** Resultado getUserByEmailPass *****')
        console.log(rows)

        if(rows[0] == undefined) {
          res.json({
            mensaje : "Datos incorrectos"
          })

        } else {
          res.json(rows[0])
        }
      }
    })
  }

  registrarse(req, res, next) {

    let values = [req.body.email]

    um.getUserByEmail(values, (err, rows) => {
      if (err) {
        console.log('***** Error getUserByEmail*****')
        console.log(err)
        res.json({
          code : 100,
          mensaje : "Error en la consulta"
        })

      } else {
        console.log('***** Resultado getUserByEmail *****')
        console.log(rows)
        console.log(rows.length)

        if(rows.length == 0) {

          let values2 = [req.body.email, req.body.referencia, req.body.nombres, req.body.apellidos, req.body.genero, req.body.fecha_nacimiento]

          um.insertUser(values2, (err, rows) => {
            if (err) {
              console.log('***** Error insertUser *****')
              console.log(err)

              res.json({
                code : 100,
                mensaje : "Error en la consulta"
              })

            } else {
              console.log('***** Resultado insertUser *****')
              console.log(rows)

              um.getUserIdByEmail(values, (err, rows) => {
                if (err) {
                  console.log('***** Error en la consulta *****')
                  console.log(err)

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
        } else {
          res.json({
            mensaje : "Ya existe un usuario con el email seleccionado"
          })
        }
      }
    })
  }

  reenviarPassword(req, res, next) {

    let values = [req.body.email]

    um.getUserPassByEmail(values, (err, rows) => {
      if (err) {
        console.log('***** Error getUserPassByEmail *****')
        console.log(err)

        res.json({
          code : 100,
          mensaje : "Error en la consulta"
        })

      } else {
        if (rows.length == 0) {
          res.json({
            mensaje : "Datos incorrectos"
          })

        } else {
          var mailOptions = {
            to: req.body.email,
            subject: 'Recuperación de contraseña',
            html: `<p>Hola, su contraseña es: ${rows[0].referencia} </p>`
          }

          transporter.sendMail(mailOptions, function(err, info) {
            if (err) {
              console.log('***** Error sendMail *****')
              console.log(err)

              res.json({
                mensaje : "Error"
              })
            } else {
              res.json({
                mensaje : "Ok"
              })
            }
          })
        }
      }
    })
  }

  activarCuenta(req, res, next) {

    let values = [req.body.id]

    um.getUserById(values, (err, rows) => {
      if (err) {
        console.log('***** Error getUserById *****')
        console.log(err)

        res.json({
          code : 100,
          status : "Error en la consulta",
          mensaje : "Esta cuenta no pudo ser activada"
        })

      } else {

        if (rows.length == 0) {
          res.json({
            mensaje : `Esta cuenta no puede ser activada, contacte al administrador`
          })
        } else {

          um.updateUserActiveById(values, (err, rows) => {
            if(err) {
              console.log('***** Error updateUserActiveById *****')
              console.log(err)

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

      res.json({
        mensaje:'No se pudo enviar el email de activación'
      })
    }else{
      console.log('***** Se envío el email *****')
      console.log(mailOptions)

      res.json({
        mensaje : 'Registro realizado'
      })
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