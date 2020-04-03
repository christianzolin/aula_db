var db = require('./bancodedados.js').database
var axios = require('axios')
var rs = require('readline-sync')


var pokedex = ref => db.ref(ref)

var pokemonRef = poke => db.ref(`Pokédex/${nome}/${poke}`)
var treinadorRef = nome => db.ref(`Pokédex/${nome}`)


const repositorio = {
    pesquisaPokemon: function(){
        console.clear(),console.log('================================ PESQUISAR POKEMON ============================')
        var treinadorRef = nome => db.ref(`Pokédex/${nome}`)
        var pokemonRef = poke => db.ref(`Pokédex/${nome}/${poke}`)
        var nome = rs.question('Qual e o seu nome treinador ? >> ') 
        var pokemon = rs.question('Qual pokemon deseja pesquisar ? (Nome ou ID) >> ')
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then(resultado => {
                var tipo = resultado.data.types
                var habilidades = resultado.data.abilities
                var id = resultado.data.id
                var pokemon = resultado.data.species.name
                console.log(`O nome do seu pokemon é : ${pokemon}`)
                tipo.map(tipo =>{
                    console.log(`O tipo do seu pokemne é : ${tipo.type.name}`)
                })
                habilidades.forEach( habi =>{
                    var habii = habi.ability.name
                    console.log(`As habilidades do seu pokemon é: ${habii}`)
                })
                var pergunta = rs.question('Voce deseja adicionar a sua pokedex:\nDigite 1 para adicionar \nDigite 2 para continuar ')
                if(pergunta === "1"){
                    var poke = pokemonRef(pokemon)
                        poke.set({
                            treinador: nome,
                            id: id,
                            pokemon: resultado.data.species.name,
                            tipo: tipo,
                            habilidades: habilidades
                        })
                        console.log(`Boa treinador ${nome} Pokemon adicionado a sua pokedex`)
                }else{
                    console.log('Pokemon nao adicionado')
                }
            })
        .catch(erro => console.log(erro , 'este pokemon não existe'))
            // não volta para o menu .... this.menu
    },
    mostraPokedex: function(){
    console.clear(),console.log('================================ MOSTRA POKEDEX ============================')
    var nome = rs.question('Qual o nome do treinador que deseja ver a pokedex: ')
        pokedex(treinadorRef(nome)).on('value', snapshot => {
            if(snapshot.val() === null){
                console.log('Treinador não encontrado, tente novamente do inicio.');
                this.menu()
            }else{
                pokedex(treinadorRef(nome)).on('child_added', snapshot => {
                    var pokedex = snapshot.val()
                    var habi = snapshot.val().habilidades
                    var tipo = snapshot.val().tipo
                    console.log('O nome do treinador é : ' + pokedex.treinador);
                    console.log(`O ID do seu pokemon é : ${pokedex.id}`);
                    console.log('O nome do pokemon é : ' + pokedex.pokemon);
                    habi.map(habi => {
                        console.log('A habilidade do seu pokemon é: ' + habi.ability.name)
                        console.log('e a sua descrição: ')
                        var url = habi.ability.url
                            axios.get(url)
                            .then(resultado =>{
                            console.log(resultado.data.effect_entries[0].effect)
                            })
                    })
                    tipo.map(tipo => {
                        console.log('O tipo do seu pokemon é: '+ tipo.type.name);
                    })
                    console.log('-------------------------------------------------------------\n\n\n\n') 
                })        
            this.menu()
            }
        })
    },
    menu: function(){
        console.clear
        console.log('\n ======================= POKEMON BETA v.01 ======================= \n')
        
        var choice  = rs.question(` 
         digite 1 parar pequisar um Pokemon: \n
         digite 2 para ver a sua pokedex: \n 
         digite S para sair: \n `)
        
        if(choice === '1'){
            this.pesquisaPokemon()
        }if(choice === '2'){
            this.mostraPokedex()    
        }if (choice.toUpperCase() === "S"){
            process.exit()
        }else{
            console.log('Ops, escolha uma das alternativas')
            this.menu()
        }
    }
}

module.exports = repositorio