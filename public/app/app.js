// Navegación
const routes = [
  { path: '/', component: home },
  { path: '/home', redirect: '/' },
  //{ path: '/listas', component: list },
  { path: '/login', component: login },
  { path: '/activar-cuenta/:id', component: activarCuenta },
  { path: '/listas', component: listas },
];

const router = new VueRouter({
  //mode: 'history',
  routes: routes
});

const app = new Vue({
  el: '#app',
  methods: {
    menu: function (opcion) {

      if (opcion != 'icon' && opcion != 'vacio') {
        window.location.hash = '#' + opcion
      }

      var x = document.getElementById('navegacion')
      if (x.className === 'nav') {
          x.className += ' responsive'
      } else {
          x.className = 'nav'
      }
    }
  },
  router
});
