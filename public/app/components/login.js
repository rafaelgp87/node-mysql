'use strict'

const login = Vue.component('login', {
  template:`
    <div class="component-login">
      <div class="row">
        <div>
          <p class="flow-text">Iniciar Sesión</p>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input v-model="emailLogin" id="emailLogin" type="email" class="validate">
            <label for="emailLogin" class="white-text">email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input v-model="passLogin" id="passLogin" type="password" class="validate">
            <label for="passLogin" class="white-text">Contraseña</label>
          </div>
        </div>
        <div class="row">
          <p class="flow-text"><i class="material-icons left">{{loginMensajeIcon}}</i>{{loginMensaje}}</p>
        </div>
        <div class="row">
          <button v-on:click="loginEmail" class="btn waves-effect waves-light">
            login
            <i class="material-icons right">done</i>
          </button>
          <button v-on:click="reenviarPassword" class="btn waves-effect waves-light">
            ¿Reenviar Contraseña?
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="row">
          <p class="flow-text">Registrarse</p>
          <p class="error"> {{registroError}} </p>
          <p class="mensaje"> {{registroMensaje}} </p>
        </div>
        <div class="row">
          <input v-model="emailRegistro" placeholder="email" type="text" required="required" />
        </div>
        <div class="row">
          <input v-model="pass1" placeholder="Contraseña" type="password" required="required" />
        </div>
        <div class="row">
          <input v-model="pass2" placeholder="Verificar contraseña" type="password" required="required" />
        </div>
        <div class="row">
          <p>Datos no necesarios:</p>
        </div>
        <div class="row">
          <input v-model="nombres" placeholder="Nombres" type="text" />
        </div>
        <div class="row">
          <input v-model="apellidos" placeholder="Apellidos" type="text" />
        </div>
        <div class="row">
          <p>Genero:</p>
        </div>
        <div class="row">
          <select v-model="genero">
            <option v-for="g in generos" v-bind:value="g.value">
              {{ g.text }}
            </option>
          </select>
        </div>
        <div class="row">
          <p>Fecha de nacimiento:</p>
        </div>
        <div>
          <input v-model="fechaNacimiento" type="text" class="datepicker">
        </div>
        <div class="button" v-on:click="registrarse">Registrarse</div>
      </div>
    </div>
  `,
  data: function() {
    return {
      loginMensaje: '',
      loginMensajeIcon: '',
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
        var mensaje = 'El formato de email no es correcto';
        this.loginMensajeIcon = 'error_outline';
        this.loginMensaje = mensaje;
        var toast = `<span>${mensaje}</span>`;
        M.toast({html: toast, classes: 'rounded'});
      } else if (this.emailLogin == '' || this.passLogin == '') {
        var mensaje = 'Todos los campos son necesarios';
        this.loginMensaje = mensaje;
        var toast = `<span>${mensaje}</span>`;
        M.toast({html: toast, classes: 'rounded'});
      } else {
        this.loginMensaje = ''
        this.loginMensajeIcon = ''

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
        ).then(data => {

          if (data) {
            console.log('Success:', data)

            if (data.mensaje == 'Datos incorrectos') {
              this.loginMensaje = data.mensaje
              var toast = `<span>${data.mensaje}</span>`;
              M.toast({html: toast, classes: 'rounded'});
            } else {

              localStorage.setItem('userId', data.id)
              localStorage.setItem('userEmail', data.email)
            }
          }

        }).catch(error => {
          if (error) {
            var mensaje = 'No hay acceso al sistema, contacte al administrador';
            this.loginMensaje = mensaje;
            var toast = `<span>${mensaje}</span>`;
            M.toast({html: toast, classes: 'rounded'});
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
        this.loginMensaje = 'El formato de email no es correcto'
      } else {
        this.loginMensaje = ''

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
            this.loginMensaje = 'Ocurrio un error al envíarle su contraseña, intentelo de nuevo más tarde'
          }

        }).catch(error => {
          if (error) {
            console.log(error)
            this.loginMensaje = 'No hay acceso al sistema, contacte al administrador'
          }
        });
      }
    }
  },
  // Después de renderear el template
  mounted: function () {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.datepicker');
      var options = {
        class: 'blue-text text-darken-2',
        format: 'dd mmmm, yyyy',
        i18n:{
          cancel:	'Cancelar',
          months: [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre'
          ],
          monthsShort: [
            'Ene',
            'Feb',
            'Mar',
            'Abr',
            'Mar',
            'Jun',
            'Jul',
            'Ago',
            'Sep',
            'Oct',
            'Nov',
            'Dic'
          ],
          weekdays: [
            'Domingo',
            'Lunes',
            'Martes',
            'Miércoles',
            'Jueves',
            'Viernes',
            'Sábado'
          ],
          weekdaysShort: [
            'Dom',
            'Lun',
            'Mar',
            'Mié',
            'Jue',
            'Vie',
            'Sáb'
          ],
          weekdaysAbbrev: ['S','L','M','M','J','V','S']
        }
      }
      var instances = M.Datepicker.init(elems, options);
    });
  },
  // Antes de renderear el template
  created: function () {

  }
});
