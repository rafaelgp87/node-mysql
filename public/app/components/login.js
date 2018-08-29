'use strict'

const login = Vue.component('login', {
  template:`
    <div class="row component-login">
      <div class="col l2"></div>
      <div class="col l8">
        <div class="row">
          <p class="flow-text">Iniciar Sesión</p>
          <i class="material-icons left">{{mensajeIcon}}</i>
          <span style="float:left;">{{mensaje}}</span>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input v-model="email" id="email" type="email" class="validate">
            <label for="email" class="white-text">email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input v-model="pass" id="pass" type="password" class="validate">
            <label for="pass" class="white-text">Contraseña</label>
          </div>
        </div>
        <div class="row">
          <button v-on:click="loginEmail" class="btn waves-effect waves-light">
            login
            <i class="material-icons right">done</i>
          </button>
          <a href="/registrarse" class="btn waves-effect waves-light white-text">Registrarse</a>
        </div>
        <div class="row">
          <button v-on:click="reenviarPassword" class="btn waves-effect waves-light">
            ¿Reenviar Contraseña?
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
      <div class="col l2"></div>
    </div>
  `,
  data: function() {
    return {
      mensaje: '',
      mensajeIcon: '',
      email: '',
      pass: ''
    }
  },
  methods: {
    loginEmail: function () {

      if (/\S+@\S+\.\S+/.test(this.email) != true) {
        this.mensaje  = 'El formato de email no es correcto';
        this.mensajeIcon = 'error_outline';
      } else if (this.email == '' || this.pass == '') {
        this.mensaje = 'Todos los campos son necesarios';
        this.mensajeIcon = 'error_outline';
      } else {
        this.mensaje = ''
        this.mensajeIcon = ''

        fetch('/login-user', {
          method: 'POST',
          body: JSON.stringify({
            email: this.email,
            referencia: this.pass
          }),
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(
          res => res.json()
        ).then(data => {

          if (data) {
            console.log('Success:', data)

            if (data.mensaje == 'Datos incorrectos') {
              this.mensaje = data.mensaje;
              this.mensajeIcon = 'error_outline';
            } else {

              localStorage.setItem('userId', data.id)
              localStorage.setItem('userEmail', data.email)
            }
          }

        }).catch(error => {
          if (error) {
            this.mensaje = 'No hay acceso al sistema, contacte al administrador';
            this.mensajeIcon = 'error_outline';
          }
        });
      }
    },
    reenviarPassword: function () {

      if (/\S+@\S+\.\S+/.test(this.email) != true) {
        this.mensaje  = 'El formato de email no es correcto';
        this.mensajeIcon = 'error_outline';
      } else {
        this.mensaje  = '';
        this.mensajeIcon = '';

        fetch('/reenviar-password', {
          method: 'POST',
          body: JSON.stringify({
            email: this.email
          }),
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(
          res => res.json()
        ).then(response => {

          if(response.mensaje == 'Ok') {
            this.mensaje = `Se envió su contraseña al correo  ${this.email}
            Te hemos enviado un correo electrónico con las instrucciones para cambiar tu contraseña, si existe una cuenta asociada recibirás un correo electrónico en los siguientes minutos.
            Si no recibes ningún correo electrónico, por favor verifica que el correo electrónico sea el que corresponde a tu cuenta, también checa tu carpeta de spam.
            `
          } else {
            this.mensaje = 'Ocurrio un error al envíarle su contraseña, intentelo de nuevo más tarde';
            this.mensajeIcon = 'error_outline';
          }

        }).catch(error => {
          if (error) {
            console.log(error)
            this.mensaje = 'No hay acceso al sistema, contacte al administrador'
            this.mensajeIcon = 'error_outline';
          }
        });
      }
    }
  },
  // Después de renderear el template
  mounted: function () {
    
  },
  // Antes de renderear el template
  created: function () {

  }
});
