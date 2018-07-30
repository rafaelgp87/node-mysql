const listas = Vue.component('listas', {
  template:`
    <div class="component-listas">
      <p>listas</p>
      <div>
        <select v-model="lista">
          <option v-for="l in listas" v-bind:value="l.value">
            {{ l.text }}
          </option>
        </select>
      </div>
    </div>
  `,
  data: function() {
    return {
      lista: '',
      listas: []
    }
  },
  // Antes de renderear el template
  mounted: function () {

    fetch('/get-list', {
      method: 'POST',
      body: JSON.stringify({
        userId: localStorage.getItem('userId')
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(
      res => res.json()
    ).then(response => {
      that = this;
      if (response) {

        response.forEach(function(e) {
          //console.log(e);
          that.listas.push({ text: e.nombre, value: e.id },);
        });
      }

    }).catch(error => {
      if (error) {
        console.log(error)
      }
    });
  }
});
