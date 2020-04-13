var rp = require('./pokemon-repository')
var rs = require('readline-sync')

// eu não consegui usar a função para voltar para o menu dentro de todas as funções, algumas acabavam atropelando

console.log('==================================================================== ')
console.log('Atencao programa em fase beta, pode haver alguns bugs ')
console.log('==================================================================== \n Digite qualquer tecla para continuar...')
rs.question()
console.clear()
rp.menu()