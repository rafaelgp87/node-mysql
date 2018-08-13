const listas = Vue.component('listas', {
  template:`
    <div class="component-listas">
      <p class="select-listas">
        Lista 
        <select v-model="lista">
          <option v-for="l in listas" v-bind:value="l.value">
            {{ l.text }}
          </option>
        </select>
        <div class="button" v-on:click="abrirModalLista">+ Agregar lista</div>
        <div class="button" v-on:click="abrirModalItem">+ Agregar item</div>
      </p>
      <table class="tabla-items">
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Url</th>
          <th></th>
        </tr>
        <tr v-for="i in itemsfilter" class="row">
          <td><input v-bind:value="i.text" placeholder="Nombre" type="text" /></td>
          <td><input v-bind:value="i.descripcion" placeholder="Descripción" type="text" /></td>
          <td><input v-bind:value="i.url" placeholder="url" type="text" /></td>
          <td><a target="_blank" v-bind:href="i.url">ir</a></td>
        </tr>
      </table>
      <div id="myModal" class="modal">
        <div class="modal-content">
          <span v-on:click="cerrarModalLista" class="close">&times;</span>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
        </div>
      </div>
    </div>
  `,
  data: function () {
    return {
      lista: '',
      listas: [],
      items: []
    }
  },
  computed: {
  	itemsfilter () {
      this.itemsFiltrados = this.items

      if(this.lista) {

        this.itemsFiltrados = this.items.filter(i => i.lista === this.lista)

        return this.itemsFiltrados
      }
    }
  },
  methods: {
    abrirModalLista: function() {
      let modal = document.getElementById('myModal');
      modal.style.display = 'block'
    },
    cerrarModalLista: function() {
      let modal = document.getElementById('myModal');
      modal.style.display = 'none'
    },
    abrirModalItem: function() {
      let modal = document.getElementById('myModal');
      modal.style.display = 'block'
    },
    cerrarModalItem: function() {
      let modal = document.getElementById('myModal');
      modal.style.display = 'none'
    }
  },
  mounted: function(){
    let modal = document.getElementById('myModal')

    modal.style.display = 'none'

    window.onclick = function(event) {

        if (event.target.id == modal.id) {
          modal.style.display = 'none'
        }
    }
  },
  // Antes de renderear el template
  created: function() {

    var usuario = 'dda4893e-9dd3-11e8-ae46-df1df2652486'
    if(localStorage.getItem('userId')) {
      usuario = localStorage.getItem('userId')
    }

    fetch('/get-list', {
      method: 'POST',
      body: JSON.stringify({
        userId: usuario
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(
      res => res.json()
    ).then(data => {
      var that = this;
      if (data) {
        var e, i;
        for (i = 0; i < data.length; i++) { 

          e = data[i];

          var index = that.listas.findIndex(x => x.value == e.id_lista)

          if (index === -1){
            that.listas.push({ text: e.nombre_lista, value: e.id_lista},)
          }

          if (i == 0) {
            that.lista = e.id_lista
          }

          if (e.id_item) {
            that.items.push({ lista: e.id_lista, text: e.nombre_item, value: e.id_item, descripcion: e.descripcion, url: e.url},)
          }
        }
      }

    }).catch(error => {
      if (error) {
        console.log(error)
      }
    })
  }
})
