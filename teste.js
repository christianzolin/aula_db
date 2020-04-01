var r = require('axios')

r.get('http://www.smartsos.com.br')
    .then(resultado => console.log(resultado))
    