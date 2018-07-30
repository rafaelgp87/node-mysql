'use strict'
const app = require('./app.js')

app.listen(app.get('port'), () =>
  console.log(`Iniciando Node Express con MySQL en el puerto ${app.get('port')}`)
)
