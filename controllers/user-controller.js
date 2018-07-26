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

    let query = "select * from proyecto.usuarios where email = ? and referencia = ?;"
    let queryActivo = "select * from proyecto.usuarios where email = ? and referencia = ? and activo = 1;"

    conn.query(query, [req.body.email, requerido], function(err,rows) {
      if (err) {
        console.log('Error en la consulta*****************')
        console.log(err)
        console.log('*************************************')
        res.json({
          'code': 100,
          'status': 'Error en la consulta'
        })

      } else {
        console.log(rows)

        if(rows[0] == undefined) {
          res.json('Datos incorrectos')

        } else {
          res.json(rows[0])
        }
      }
    })
  }

  registrarse(req, res, next) {

    let queryVerificarUsuario = "select * from proyecto.usuarios where email = ?;"

    conn.query(queryVerificarUsuario,[req.body.email] , function(err,rows) {
      if(err) {
        console.log('Error en la consulta')
            res.json({
              'code': 100,
              'status': 'Error en la consulta'
            })

      } else {
        if (rows.length > 0) {
          res.json({
            mensaje: 'El email seleccionado ya esta registrado'
          })

        } else {
          conn.query("insert into proyecto.usuarios (email,usuario,referencia,nombres,apellidos,genero,fecha_nacimiento,foto,token,activo,licencia)"
          + "values (?,null,?,?,?,?,?,null,null,false,'licencia de prueba'); ",
          [req.body.email, req.body.referencia, req.body.nombres, req.body.apellidos, req.body.genero, req.body.fecha_nacimiento], function(err,rows) {

            if (err) {
              console.log('Error en la consulta')
              res.json({
                'code': 100,
                'status': 'Error en la consulta'
              })

            } else {
              conn.query("select * from proyecto.usuarios where email = ?;",
              [req.body.email] , function(err,rows) {

                if (err) {
                  console.log('Error en la consulta')
                  res.json({
                    'code': 100,
                    'status': 'Error en la consulta'
                  })

                } else {
                  var idUsuario = rows[0].id
                  enviarCorreoActivacion(idUsuario, req, res)
                }
              })
            }
          })
        }
      }
    })
  }

  reenviarPassword(req, res, next) {

    conn.query("select referencia from proyecto.usuarios where email = ? and activo = 1;",
    [req.body.email], function(err,rows) {

      if (err) {
        console.log('Error en la consulta')
        res.json({'code' : 100, 'status' : 'Error en la consulta'})

      } else {
        if (rows[0].length = 0) {
          res.json('Datos incorrectos')

        } else {
          var mailOptions = {
            to: req.body.email,
            subject: 'Recuperación de contraseña',
            html: '<p>Hola, su contraseña es: '+rows[0].referencia+'</p>'
          }

          transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.log(error)
              res.json({mensaje:'Error'})
            } else {
              res.json('Ok')
            }
          })
        }
      }
    })
  }
}

module.exports = UserController

function enviarCorreoActivacion (idUsuario, req, res) {
  console.log('****************************************')
  console.log(idUsuario)
  console.log(req.body.email)
  console.log('****************************************')

  var mailOptions = {
    to: req.body.email,
    subject: 'Bienvenido al proyecto',
    html: '<p>Hola, de click en la siguiente liga para activar su cuenta: </p>'
      + '<a href="'+ e.email.client + '/activar-cuenta/' + idUsuario + '">Activar cuenta ✔</a>'
  }

  transporter.sendMail(mailOptions, function(error, info) {
    if(error){
      console.log(error)
      res.json({mensaje:'No se pudo enviar el email de activación'})
    }else{
      res.json({mensaje:'Registro realizado'})
    }
  })
}
