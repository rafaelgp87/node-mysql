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
  router
});