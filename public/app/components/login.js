'use strict'

const login = Vue.component('login', {
  template:`
    <div class="formularios">
      <div class="formulario">
        <div>
          <p>Iniciar Sesión</p>
          <span class="error"> {{loginError}} </span>
          <span class="mensaje"> {{loginMensaje}} </span>
        </div>
        <div>
          <input v-model="emailLogin" placeholder="Usuario" type="text" />
        </div>
        <div>
          <input v-model="passLogin" placeholder="Contraseña" type="password" />
        </div>
        <div class="button" v-on:click="loginEmail">Entrar</div>
        <div class="button" v-on:click="reenviarPassword">¿Reenviar Contraseña?</div>
      </div>

      <div class="formulario">
        <div>
          <p>Registrarse</p>
          <p class="error"> {{registroError}} </p>
          <p class="mensaje"> {{registroMensaje}} </p>
        </div>
        <div>
          <input v-model="emailRegistro" placeholder="email" type="text" required="required" />
        </div>
        <div>
          <input v-model="pass1" placeholder="Contraseña" type="password" required="required" />
        </div>
        <div>
          <input v-model="pass2" placeholder="Verificar contraseña" type="password" required="required" />
        </div>
        <div>
          <p>Datos no necesarios:</p>
        </div>
        <div>
          <input v-model="nombres" placeholder="Nombres" type="text" />
        </div>
        <div>
          <input v-model="apellidos" placeholder="Apellidos" type="text" />
        </div>
        <div>
          <p>Genero:</p>
        </div>
        <div>
          <select v-model="genero">
            <option v-for="g in generos" v-bind:value="g.value">
              {{ g.text }}
            </option>
          </select>
        </div>
        <div>
          <p>Fecha de nacimiento:</p>
        </div>
        <div><input v-model="fechaNacimiento" placeholder="Fecha de nacimiento" type="date" /></div>
        <div class="button" v-on:click="registrarse">Registrarse</div>
      </div>
    </div>
  `,
  data: function() {
    return {
      loginError: '',
      loginMensaje: '',
      emailLogin: '',
      passLogin: '',
      registroError: '',
      registroMensaje: '',
      emailRegistro: '',
      pass1: '',
      pass2: '',
      nombres: '',
      apellidos: '',
      genero: '',
      generos: [
        { text: '', value: '' },
        { text: 'Femenino', value: 'Femenino' },
        { text: 'Masculino', value: 'Masculino' },
        { text: 'Otro', value: 'Otro' },
        { text: 'Indefinido', value: 'Indefinido' }
      ],
      fechaNacimiento: ''
    }
  },
  methods: {
    loginEmail: function () {

      if (/\S+@\S+\.\S+/.test(this.emailLogin) != true) {
        this.loginError = 'El formato de email no es correcto'
      } else if (this.emailLogin == '' || this.passLogin == '') {
        this.loginError  = 'Todos los campos son necesarios'
      } else {
        this.loginError = ''

        fetch('/login-user', {
          method: 'POST',
          body: JSON.stringify({
            email: this.emailLogin,
            referencia: this.passLogin
          }),
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(
          res => res.json()
        ).then(response => {

          if (response) {
            //console.log('Success:', response)

            if (response.mensaje == 'Datos incorrectos') {
              this.loginError = response.mensaje

            } else {

              localStorage.setItem('userId', response.id)
              localStorage.setItem('userEmail', response.email)
            }
          }

        }).catch(error => {
          if (error) {
            this.loginError = 'No hay acceso al sistema, contacte al administrador'
          }
        });
      }
    },
    registrarse: function () {

      if (/\S+@\S+\.\S+/.test(this.emailRegistro) != true) {
        this.registroError = 'El formato de email no es correcto'

      } else if(this.pass1 != this.pass2) {
        this.registroError = 'Verifique la contraseña'

      } else {
        this.registroError = ''

        if (this.fechaNacimiento == '') {
          this.fechaNacimiento = '1900-01-01'
        }

        fetch('/registrarse', {
          method: 'POST',
          body: JSON.stringify({
            email: this.emailRegistro,
            referencia: this.pass1,
            nombres: this.nombres,
            apellidos: this.apellidos,
            genero: this.genero,
            fecha_nacimiento: this.fechaNacimiento
          }),
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(
          res => res.json()
        ).then(response => {

          if (response.mensaje == 'El email seleccionado ya esta registrado') {
            this.registroError= `${response.mensaje} : ${this.emailRegistro}`

          } else {
            this.registroMensaje = `Se envió un email al email ${this.emailRegistro} para activar su cuenta`

          }

        }).catch(error => {
          if (error) {
            console.log(error)
            this.registroError = 'No hay acceso al sistema, contacte al administrador'
          }
        });
      }
    },
    reenviarPassword: function () {

      if (/\S+@\S+\.\S+/.test(this.emailLogin) != true) {
        this.loginError = 'El formato de email no es correcto'
      } else {
        this.loginError = ''

        fetch('/reenviar-password', {
          method: 'POST',
          body: JSON.stringify({
            email: this.emailLogin
          }),
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(
          res => res.json()
        ).then(response => {

          if(response.mensaje == 'Ok') {
            this.loginMensaje = `Se envió su contraseña al correo  ${this.emailLogin}
            Te hemos enviado un correo electrónico con las instrucciones para cambiar tu contraseña, si existe una cuenta asociada recibirás un correo electrónico en los siguientes minutos.
            Si no recibes ningún correo electrónico, por favor verifica que el correo electrónico sea el que corresponde a tu cuenta, también checa tu carpeta de spam.
            `
          } else {
            this.loginError = 'Ocurrio un error al envíarle su contraseña, intentelo de nuevo más tarde'
          }

        }).catch(error => {
          if (error) {
            console.log(error)
            this.loginError = 'No hay acceso al sistema, contacte al administrador'
          }
        });
      }
    }
  },
  // Antes de renderear el template
  created: function () {

  }
});
