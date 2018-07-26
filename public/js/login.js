'use strict'

document.getElementById('login-usuario').addEventListener('click', loginUsuario)
document.getElementById('registrarse').addEventListener('click', registrarse)
document.getElementById('reenviar-password').addEventListener('click', reenviarPassword)

function loginUsuario() {
  var emailUsuarioError = document.getElementById('email-usuario-error')
  let emailUsuario = document.getElementById('email-usuario').value
  let referencia = document.getElementById('referencia').value

  if (/\S+@\S+\.\S+/.test(emailUsuario) != true) {
    emailUsuarioError.innerHTML = 'El formato de email no es correcto'
  } else if (emailUsuario == '' || referencia == '') {
    emailUsuarioError.innerHTML = 'Todos los campos son necesarios'
  } else {
    emailUsuarioError.innerHTML = ''

    var ajax = new XMLHttpRequest()
    ajax.open('POST', '/login', true)
    ajax.responseType = 'json';
    ajax.setRequestHeader('Content-type', 'application/json; charset=utf-8')
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 3){
        console.log('cargando')
      } else if (ajax.readyState == 4 && ajax.status == 200) {
        var data = ajax.response
        console.log(data)

        if (data == 'Datos incorrectos') {
          emailUsuarioError.innerHTML = data
        } else {
          localStorage.setItem('id',data.id)
          localStorage.setItem('email',data.email)
        }
      } else if (ajax.status >= 400) {
        emailUsuarioError.innerHTML = 'No hay acceso al sistema, contacte al administrador'
      }
    }
    ajax.send(JSON.stringify({
      email: emailUsuario,
      referencia: referencia
    }))
  }
}

function registrarse() {
  let emailNuevoError = document.getElementById('email-nuevo-error')
  let emailNuevo = document.getElementById('email-nuevo').value
  let referencia2 = document.getElementById('referencia2').value
  let referencia3 = document.getElementById('referencia3').value

  if (/\S+@\S+\.\S+/.test(emailNuevo) != true) {
    emailNuevoError.innerHTML = 'El formato de email no es correcto'

  } else if(referencia2 != referencia3) {
    emailNuevoError.innerHTML = 'Verifique la contraseña'

  } else {
    emailNuevoError.innerHTML = ''

    var fechaNacimiento = document.getElementById('fecha-nacimiento').value

    if (fechaNacimiento == '') {
      fechaNacimiento = '1900-01-01'
    }

    var genero = document.getElementById('genero')
    var generoValue = genero.options[genero.selectedIndex].value

    var ajax = new XMLHttpRequest()
    ajax.open('POST', '/registrarse', true)
    ajax.responseType = 'json';
    ajax.setRequestHeader('Content-type', 'application/json; charset=utf-8')
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 3){
        console.log('cargando')
      } else if (ajax.readyState == 4 && ajax.status == 200) {
        var data = ajax.response
        console.log(data)

        var mensaje = ''

        if (data.mensaje == 'El email seleccionado ya esta registrado') {
          var mensaje = data.mensaje + ': ' + emailNuevo
          emailNuevoError.innerHTML = mensaje

        } else {
          mensaje = 'Se envió un email al email ' + emailNuevo + ' para activar su cuenta'
          emailNuevoError.innerHTML = mensaje
        }
      } else {
        emailNuevoError.innerHTML = 'No hay acceso al sistema, contacte al administrador'
      }
    }
    ajax.send(JSON.stringify({
      email: emailNuevo,
      referencia: document.getElementById('referencia2').value,
      nombres: document.getElementById('nombres').value,
      apellidos: document.getElementById('apellidos').value,
      genero: generoValue,
      fecha_nacimiento: fechaNacimiento
    }))
  }
}

function reenviarPassword() {
  let emailUsuarioError = document.getElementById('email-usuario-error')
  let emailUsuarioMensaje = document.getElementById('email-usuario-mensaje')
  let emailUsuario = document.getElementById('email-usuario').value

  if (/\S+@\S+\.\S+/.test(emailUsuario) != true) {
      emailUsuarioError.innerHTML = 'El formato de email no es correcto'
  } else {
    emailUsuarioError.innerHTML = ''

    var ajax = new XMLHttpRequest()
    ajax.open('POST', '/reenviar-password', true)
    ajax.responseType = 'json';
    ajax.setRequestHeader('Content-type', 'application/json; charset=utf-8')
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 3){
        console.log('cargando')
      } else if (ajax.readyState == 4 && ajax.status == 200) {
        var data = ajax.response
        console.log(data)

        var mensaje = ''

        if(data == 'Ok') {
          mensaje = 'Se envió su contraseña al correo ' + emailUsuario
          +'Te hemos enviado un correo electrónico con las instrucciones para cambiar tu contraseña, si existe una cuenta asociada recibirás un correo electrónico en los siguientes minutos.'
          +''
          +'Si no recibes ningún correo electrónico, por favor verifica que el correo electrónico sea el que corresponde a tu cuenta, también checa tu carpeta de spam.'

          emailUsuarioMensaje.innerHTML = mensaje
        } else {
          mensaje = 'Ocurrio un error al envíarle su contraseña, intentelo de nuevo más tarde'
          emailUsuarioError.innerHTML = mensaje
        }

      } else if (ajax.status >= 400) {
        emailUsuarioError.innerHTML = 'No hay acceso al sistema, contacte al administrador'
      }
    }
    ajax.send(JSON.stringify({
      email: emailUsuario
    }))
  }
}
