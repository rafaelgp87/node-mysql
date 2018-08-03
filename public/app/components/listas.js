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
      <ul>
        <li v-for="i in items">{{i.text}}</li>
      </ul>
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
  	filteredItems () {
    	let posts = this.items

      if(this.lista) {
        console.log('entro')
      	posts = posts.filter((p) => {
					let foundCategory = p.id_lista.findIndex((c) => {
          	return c.slug === this.filterCategory
          })
          return foundCategory !== -1
        })
      }

      return posts
    }
  },
  methods: {
    selectList: function () {
      console.log('entro')
    }
  },
  // Antes de renderear el template
  created: function () {

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
      var that = this;
      if (response) {

        response.forEach(function(e) {

          var index = that.listas.findIndex(x => x.value == e.id_lista)

          if (index === -1){
            that.listas.push({ text: e.nombre_lista, value: e.id_lista},);
          }

          if (e.id_item) {
            that.items.push({ lista: e.id_lista, text: e.nombre_item, value: e.id_item, descripcion: e.descripcion, url: e.url},);
          }

        });
      }

    }).catch(error => {
      if (error) {
        console.log(error)
      }
    });
  }
});
