const activarCuenta = Vue.component('activar-cuenta', {
  template:`
    <div class="component-activar-cuenta">
      <p> {{mensaje}} </p>
    </div>
  `,
  data: function() {
    return {
      mensaje: ''
    }
  },
  // Antes de renderear el template
  created: function () {

    var id = this.$route.params.id;

    if (id.length == 36) {
      
      fetch('/activar-cuenta', {
        method: 'POST',
        body: JSON.stringify({
          id: id
        }), 
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(
        res => res.json()
      ).then(response => {

        console.log(response)
        this.mensaje = response.mensaje;
        
      }).catch(error => {
        if (error) {
          console.log(error)
          this.mensaje = 'No hay acceso al sistema, contacte al administrador'
        }
      });

    } else {
      this.mensaje = 'No se pudo activar la cuenta, contacte al administrador'
    }
  }
});
