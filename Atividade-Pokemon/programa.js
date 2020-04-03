var db = require('./bancodedados.js').database
var rs = require('readline-sync')
var axios = require('axios')
var rp = require('./pokemon-repository')

// var pokedex = ref => db.ref(ref)
// var treinadorRef = nome => db.ref(`Pokédex/${nome}`)
// var pokemonRef = poke => db.ref(`Pokédex/${nome}/${poke}`)

//estou terminando ainda... 
rp.menu()
