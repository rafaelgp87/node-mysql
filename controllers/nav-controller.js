'use strict'

const conn = require('../models/model.js')

class NavController {

  getHome(req, res, next) {
    res.render('home', { title: 'rafaelgp87' })
  }

  getLogin(req, res, next) {
    res.render('login', { title: 'login' })
  }

  getUrlActivarCuenta(req, res, next) {
    res.render('activar-cuenta', { title: 'Activar cuenta' })
  }

  getActivarCuenta(req, res, next) {
    if(isNaN(req.params.cuenta)) {
      res.json({mensaje:'Esta cuenta no puede ser activada, ingrese su correo electronico para enviarle de nuevo el correo de activación'})

    } else {
      conn.query("select * from proyecto.usuarios where id = ?;", [req.params.cuenta], function(err,rows) {

        if (err) {
          res.json({"code" : 100, "status" : "Error en la consulta"})

        } else {
          if (rows.length > 0) {

            conn.query("update proyecto.usuarios set activo = true where id = ?;", [req.params.cuenta], function(err,rows){
              if(err) {
                res.json({"code" : 100, "status" : "Error en la consulta"})

              } else {
                next()
              }
            })

          } else {
            res.json({mensaje:"Esta cuenta no puede ser activada, ingrese su correo electronico para enviarle de nuevo el correo de activación"})

          }
        }
      })
    }
  }
}

module.exports = NavController

/*
function validarUsuario (req, res, next) {
  var cookies = parseCookies(req)
  var srtUrl = req.url
  var permisoParaConsultarPantalla = ''

  if (cookies.xu == 'xxxx-xxx' && cookies.xt == 'xxxxxxxx-xxxx-xxxx') {
    res.render('portal-error')
  } else {
    sql.connect(global.credencialesSQLServer).then(function() {

      if (srtUrl.indexOf('/inicio-admin') > 0 || srtUrl.indexOf('/inicio-alumno') > 0 || srtUrl.indexOf('/inicio-contacto') > 0 || srtUrl.indexOf('/inicio-docente')  > 0 || srtUrl.indexOf('/administrar-usuarios') > 0 || srtUrl.indexOf('/reportes') > 0) {
        permisoParaConsultarPantalla = 'inicio'
      } else if (srtUrl.indexOf('/administrar-perfiles') > 0) {
        permisoParaConsultarPantalla = 'Perfiles/Permisos'
      } else if (srtUrl.indexOf('/administrar-portales') > 0 || srtUrl.indexOf('/editar-portal') > 0) {
        permisoParaConsultarPantalla = 'Portales'
      } else if (srtUrl.indexOf('/configuracion-general') > 0) {
        permisoParaConsultarPantalla = 'Configuración General'
      } else if (srtUrl.indexOf('/condiciones-pagos') > 0) {
        permisoParaConsultarPantalla = 'Condiciones Pagos'
      } else if (srtUrl.indexOf('/administrar-avisos') > 0 || srtUrl.indexOf('/editar-aviso') > 0) {
        permisoParaConsultarPantalla = 'Avisos'
      } else if (srtUrl.indexOf('/accesos') > 0) {
        permisoParaConsultarPantalla = 'Logs'
      } else if (srtUrl.indexOf('/archivos-compartidos') > 0 || srtUrl.indexOf('/archivos-alumno') > 0 || srtUrl.indexOf('/archivos-docente') > 0) {
        permisoParaConsultarPantalla = 'Lista de archivos compartidos'
      } else if (srtUrl.indexOf('/administrar-idiomas') > 0) {
        permisoParaConsultarPantalla = 'Idiomas'
      } else if (srtUrl.indexOf('/perfil-alumno') > 0) {
        permisoParaConsultarPantalla = 'Cuenta Alumno'
      } else if (srtUrl.indexOf('/lista-datos-facturacion') > 0) {
        permisoParaConsultarPantalla = 'Facturación de datos'
      } else if (srtUrl.indexOf('/solicitudes-beca') > 0 || srtUrl.indexOf('/solicitud-beca') > 0) {
        permisoParaConsultarPantalla = 'Solicitud de Beca'
      } else if (srtUrl.indexOf('/registrar-materias') > 0) {
        permisoParaConsultarPantalla = 'Nuevo Registro de Materias'
      } else if (srtUrl.indexOf('/solicitud-servicio-social') > 0) {
        permisoParaConsultarPantalla = 'Solicitud Servicio Social'
      } else if (srtUrl.indexOf('/pagos-alumno') > 0 || srtUrl.indexOf('/pagos-contacto') > 0) {
        permisoParaConsultarPantalla = 'Pagos'
      } else if (srtUrl.indexOf('/perfil-contacto') > 0) {
        permisoParaConsultarPantalla = 'Cuenta Contacto'
      } else if (srtUrl.indexOf('/perfil-docente') > 0) {
        permisoParaConsultarPantalla = 'Cuenta Profesor'
      } else if (srtUrl.indexOf('/asistencias-registradas') > 0 || srtUrl.indexOf('/asistencia') > 0 || srtUrl.indexOf('/asistencia-multiple') > 0) {
        permisoParaConsultarPantalla = 'Captura Asistencias'
      } else if (srtUrl.indexOf('/calificacion-periodos') > 0 || srtUrl.indexOf('/calificacion/') > 0) {
        permisoParaConsultarPantalla = 'Captura de Calificaciones'
      }

      // Stored Procedure
      var request = new sql.Request()
        request.verbose = true;
        request.input('Usuario', cookies.xu)
        request.input('Token', cookies.xt)
        request.input('TipoConfiguracion', permisoParaConsultarPantalla)

      var sp ='spCEPortalValidarUsuario'

		  request.execute(sp).then(function(recordset) {

        if (recordset[0][0]['Ok'] == 0) {
          return next()
        }else{
          res.render('portal-error')
        }

      }).catch(function(err) {
        res.status(400);
        console.log('Error al ejecutar el SP ' + sp + ': ' + err)
      })

    }).catch(function(err) {
      res.status(400)
      console.log('Error al conectarse a SQLServer: ' + err)
    })
  }
}*/

function parseCookies (req) {
    var list = {}
    var rc = req.headers.cookie

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=')
        list[parts.shift().trim()] = decodeURI(parts.join('='))
    })

    return list
}
