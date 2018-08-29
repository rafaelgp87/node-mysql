'use strict'

const registerUser = Vue.component('register-user', {
  template:`
    <div class="row component-register-user">
      <div class="col l2"></div>
      <div class="col l8">
        <div class="row">
          <p class="flow-text">Registrarse</p>
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
            <input v-model="pass1" id="pass1" type="password" class="validate">
            <label for="pass1" class="white-text">contraseña</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input v-model="pass2" id="pass2" type="password" class="validate">
            <label for="pass2" class="white-text">verificar contraseña</label>
          </div>
        </div>
        <div class="row">
          <p class="flow-text">Datos opcionales</p>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input v-model="nombre" id="nombre" type="text">
            <label for="nombre" class="white-text">nombre</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input v-model="apellidos" id="apellidos" type="text">
            <label for="apellidos" class="white-text">apellidos</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <select v-model="genero" id="genero">
              <option v-for="g in generos" v-bind:value="g.value">
                {{ g.text }}
              </option>
            </select>
            <label for="genero" class="white-text">genero</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input v-model="fechaNacimiento" id="fechaNacimiento" type="text" class="datepicker">
            <label for="apellidos" class="white-text">fecha de nacimiento</label>
          </div>
        </div>
        <div class="row">
          <button v-on:click="registrarse" class="btn waves-effect waves-light">
            Registrarse
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
      pass1: '',
      pass2: '',
      nombre: '',
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
    registrarse: function () {

      if (/\S+@\S+\.\S+/.test(this.email) != true) {
        this.mensaje = 'El formato de email no es correcto'
        this.mensajeIcon = 'error_outline';
      } else if(this.pass1 != this.pass2) {
        this.mensaje = 'Verifique la contraseña'
        this.mensajeIcon = 'error_outline';
      } else {
        this.mensaje = '';
        this.mensajeIcon = '';

        if (this.fechaNacimiento == '') {
          this.fechaNacimiento = '1900-01-01'
        }

        fetch('/registrarse', {
          method: 'POST',
          body: JSON.stringify({
            email: this.email,
            referencia: this.pass1,
            nombre: this.nombre,
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
            this.mensaje= `${response.mensaje} : ${this.email}`
            this.mensajeIcon = 'error_outline';
          } else {
            this.mensaje = `Se envió un email al email ${this.email} para activar su cuenta`
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
    document.addEventListener('DOMContentLoaded', function() {

      var select = document.querySelectorAll('select');
      M.FormSelect.init(select, null);

      var datepicker = document.querySelectorAll('.datepicker');
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
      M.Datepicker.init(datepicker, options);
    });
  },
  // Antes de renderear el template
  created: function () {

  }
});
