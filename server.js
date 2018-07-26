'use strict'
const app = require('./app.js')

app.listen(app.get('port'), () =>
  console.log(`Iniciando API REST-MVC Express con MySQL en el puerto ${app.get('port')}`)
)
