var db = require('./bancodedados.js').database
var axios = require('axios')
var rs = require('readline-sync')

var pokedex = ref => db.ref(ref)
var treinadorRef = nome => db.ref(`Pokédex/${nome}`)

var repositorio =  {
    menu: function (){
        console.log('\n ======================= POKEMON BETA v.01 ======================= \n')
        var choice  = rs.question(` 
        digite 1 parar capturar um Pokemon: \n
        digite 2 para ver a sua pokedex: \n 
        digite 3 para ver a descricao de habilidades do pokemon\n
        digite 4 para ver a descricao de tipos do pokemon\n
        digite 5 para ver a descricao completa do pokemon\n
        digite S para sair: \n `)
        if(choice === '1'){
            this.cadastrarPokemon()
        }else if(choice === '2'){
            this.mostraPokedex()    
        }else if(choice === '3'){
           this.pokeDescricaoHabilidades()
        }else if(choice === '4'){
           this.pokeDescricaoTipos()
        }else if(choice === '5'){
            this.motraDescricaoCompleta()
        }else if (choice.toUpperCase() === "S"){
            process.exit()
        }else{
           this.menu()
         }
    },
    motraDescricaoCompleta: function(){
        console.clear(),console.log('============================ PESQUISA POKEMON ==============================')
        var pokemon = rs.question('Qual e o nome ou ID do pokemon que deseja ver a descricao? ')
        if(pokemon === '' || pokemon === ' '){
            console.log('Pokemon invalido --- comece novamente')
            this.menu()
        }
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(resultado => {
            var tipo = resultado.data.types
            var habilidades = resultado.data.abilities
            var id = resultado.data.id
            var pokemon = resultado.data.name
            console.log(`O nome do pokemon >>> : ${pokemon}`)
            console.log(`O ID do pokemon >>> : ${id}`)

            //looping para mostar habildades e suas descrições
                for(i = 0; i < habilidades.length;i++){
                axios.get(habilidades[i].ability.url)
                .then(resultado => {
                    console.log('A sua habilidade >>> : ',resultado.data.name)
                    console.log('E a descricao de sua habilidade >>> : ',resultado.data.effect_entries[0].short_effect + '\n')
                })
            }
            var x = []
        //   looping para mostrar tipos de pokemon e para quem da ou não dano
            tipo.forEach( tipo =>{
                var url = tipo.type.url
                x.push(tipo.type.url)
                axios.get(url)
                .then(resultado =>{
                    var nome = tipo.type.name
                    var dobroDeDano = []
                    for(i = 0; i < resultado.data.damage_relations.double_damage_to.length;i++){
                        dobroDeDano.push(resultado.data.damage_relations.double_damage_to[i].name)
                    }
                    var metadeDeDano = ['']
                    for(i = 0; i < resultado.data.damage_relations.half_damage_to.length;i++){
                        metadeDeDano.push(resultado.data.damage_relations.half_damage_to[i].name)
                    }
                    
                    var semDano = []
                    for(i = 0; i < resultado.data.damage_relations.no_damage_to.length;i++){
                        semDano.push(resultado.data.damage_relations.no_damage_to[i].name)
                    }
                    var pokemonsMesmoTipo = []
                    for(i=0;i<resultado.data.pokemon[i].pokemon.name.length;i++){
                        pokemonsMesmoTipo.push(resultado.data.pokemon[i].pokemon.name)
                    }
                    console.log('O tipo do pokemon e: >>> ', nome);
                    console.log(`Ele da o dobro de dano em pokemons do tipo: >>> : ${dobroDeDano}`);
                    console.log(`Ele da a metade de dano em pokemons do tipo: >>> : ${metadeDeDano}`);
                    if(semDano[0] === semDano[''] ){
                        console.log('Ele da dano em todos os tipos de pokemon \n')
                    }else{
                        console.log(`Ele nao da nenhum dano em pokemons do tipo: >>> : ${semDano}`)
                    }
                    console.log(`Existem estes pokemons que são do mesmo tipo: >>> : ${pokemonsMesmoTipo}\n`);
                })
            })
        })
        .catch(erro => console.log(erro , 'este pokemon não existe \n',
        '**** OPS... Bug encontrado, reinicie o programa para continuar ****'))
        //não consegui colocar a função voltar para o menu sem atropelar nada
        console.log('**** OPS... Bug encontrado, reinicie o programa para continuar ****')
    },
    pokeDescricaoHabilidades: function(){
        console.clear(),console.log('========================== PESQUISAR DESCRICAO DE HABILIDADES POKEMON ============================')
        var pokemon = rs.question('Qual e o nome ou ID do pokemon que deseja ver a descricao? ')
        if(pokemon === '' || pokemon === ' '){
            console.log('Pokemon invalido --- comece novamente')
            this.menu()
        }
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(resultado => {
            var habilidades = resultado.data.abilities
            var id = resultado.data.id
            var pokemon = resultado.data.name
            console.log(`O nome do pokemon >> : ${pokemon}`)
            console.log(`O ID do pokemon >> : ${id}`)

            //looping para mostar habildades e suas descrições
              for(i = 0; i < habilidades.length;i++){
                axios.get(habilidades[i].ability.url)
                .then(resultado => {
                    console.log('A sua habilidade >> : ',resultado.data.name)
                    console.log('E a descricao de sua habilidade >> : ',resultado.data.effect_entries[0].short_effect + '\n')
                })
            }
        })
        .catch(erro => console.log(erro , 'este pokemon não existe \n',
        '**** OPS... Bug encontrado, reinicie o programa para continuar ****'))
        //não consegui colocar a função voltar para o menu sem atropelar nada
        console.log('**** OPS... Bug encontrado, reinicie o programa para continuar ****')
    },
    pokeDescricaoTipos: function(){
        console.clear(),console.log('========================== PESQUISAR DESCRICAO DE TIPOS POKEMON ============================')
        var pokemon = rs.question('Qual e o nome ou ID do pokemon que deseja ver a descricao? ')
        if(pokemon === '' || pokemon === ' '){
            console.log('Pokemon invalido --- comece novamente')
            this.menu()
        }
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(resultado => {
            var tipo = resultado.data.types
            var id = resultado.data.id
            var pokemon = resultado.data.name
            console.log(`O nome do pokemon >>> : ${pokemon}`)
            console.log(`O ID do pokemon >>> : ${id}`)
        //   looping para mostrar tipos de pokemon e para quem da ou não dano
            tipo.forEach( tipo =>{
                var url = tipo.type.url
                axios.get(url)
                .then(resultado =>{
                    var nome = tipo.type.name
                    var dobroDeDano = []
                    for(i = 0; i < resultado.data.damage_relations.double_damage_to.length;i++){
                     dobroDeDano.push(resultado.data.damage_relations.double_damage_to[i].name)
                    }
                    var metadeDeDano = []
                    for(i = 0; i < resultado.data.damage_relations.half_damage_to.length;i++){
                        metadeDeDano.push(resultado.data.damage_relations.half_damage_to[i].name)
                    }
                    var semDano = []
                    for(i = 0; i < resultado.data.damage_relations.no_damage_to.length;i++){
                        semDano.push(resultado.data.damage_relations.no_damage_to[i].name)
                    }
                    var pokemonsMesmoTipo = []
                    for(i=0;i<resultado.data.pokemon[i].pokemon.name.length;i++){
                        pokemonsMesmoTipo.push(resultado.data.pokemon[i].pokemon.name)
                    }
                    console.log('O tipo do pokemon e: >> ', nome);
                    console.log(`Ele da o dobro de dano em pokemons do tipo: >> ${dobroDeDano}`);
                    console.log(`Ele da a metade de dano em pokemons do tipo: >> ${metadeDeDano}`);
                    if(semDano[0] === semDano[''] ){
                        console.log('Ele da dano em todos os tipos de pokemon \n')
                    }else{
                        console.log(`Ele nao da nenhum dano em pokemons do tipo: >> ${semDano} \n`)
                    }
                    console.log(`Existem estes pokemons que são do mesmo tipo: >> ${pokemonsMesmoTipo}`);
                })
            })
        })
        .catch(erro => console.log(erro , 'este pokemon não existe \n',
        '**** OPS... Bug encontrado, reinicie o programa para continuar ****'))
        //não consegui colocar a função voltar para o menu sem atropelar nada
        console.log('**** OPS... Bug encontrado, reinicie o programa para continuar ****')
    },
    cadastrarPokemon: function(){
        console.clear(),console.log('================================ CAPTURAR POKEMON ============================')
        var pokemonRef = poke => db.ref(`Pokédex/${nome}/${poke}`)
        var nome = rs.question('Qual e o seu nome treinador ? >> ')
        if(nome === ''|| nome === ' '){
            console.log('Nome invalido --- Comece novamente')
            this.menu()
        }
        var pokemon = rs.question('Qual pokemon deseja pesquisar ? (Nome ou ID) >> ')
        if(pokemon === ''|| pokemon === ' '){
            console.log('Pokemon invalido --- Comece novamente')
            this.menu()
        }
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then(resultado => {
                var tipo = resultado.data.types
                var habilidades = resultado.data.abilities
                var id = resultado.data.id
                var pokemon = resultado.data.name
                console.log(`O nome do seu pokemon é >>> : ${pokemon}`)
                console.log(`O id do seu pokemon é >>> : ${id}`)
                var habi = []
                habilidades.map(p => {
                    habi.push(p.ability.name)
                })
                console.log(`A habilidade do seu pokemon é >>> : ${habi}`)
                var tipos = []
                tipo.map(tipo => {
                    tipos.push(tipo.type.name)
                })
                console.log(`O tipo do seu pokemon é >>> : ${tipos} \n` )
                var pergunta = rs.question('>>> Voce deseja adicionar este pokomen a sua pokedex:\n>>> Digite 1 para adicionar \n>>> Digite qualquer tecla para continuar \n>>> ')
                if(pergunta === "1"){
                    var poke = pokemonRef(pokemon)
                        poke.set({
                            treinador: nome,
                            id: id,
                            pokemon: resultado.data.name,
                            tipo: tipo,
                            habilidades: habilidades
                        })
                        console.log(`Boa treinador ${nome} Pokemon adicionado a sua pokedex \n`)
                        var x = rs.question('>>> Digite 1 para capturar outro pokemon\n>>> Digite qualquer tecla para continuar\n>>>  ') 
                        if(x === '1'){
                            this.cadastrarPokemon()

                        }else{
                            this.menu()
                        }
                }else{
                    console.clear()
                    console.log('Pokemon nao adicionado')
                    this.menu()
                }
            })
        .catch(erro => {
            console.log(erro , 'este pokemon não existe','\n**** OPS... Bug encontrado, reinicie o programa para continuar ****')
            this.menu()
        })
    },
    mostraPokedex: function(){
    console.clear(),console.log('================================ MOSTRA POKEDEX ============================')
    var nome = rs.question('Qual o nome do treinador que deseja ver a pokedex: ')
    pokedex(treinadorRef(nome)).on('value', snapshot => {
        if(snapshot.val() === null){
            console.log('Treinador não encontrado, tente novamente do inicio.');
            this.menu()
        }else if(nome === ''|| nome === ' '){
            console.log('Digite um nome válido --- comece novamente')
            this.menu()
        }else{
            var x = 1
            console.log(`================================ MINHA POKÉDEX  ============================\n`)
            pokedex(treinadorRef(nome)).on('child_added', snapshot => {
                var pokedex = snapshot.val()
                var habilidades = snapshot.val().habilidades
                var tipo = snapshot.val().tipo
                console.log(`O ID do seu pokemon é >>> : ${pokedex.id}`);
                console.log('O nome do pokemon é >>> : ' + pokedex.pokemon);
                var habi = []
                habilidades.map(p => {
                    habi.push(p.ability.name)
                })
                console.log(`As habilidades do seu pokemon é >>> : ${habi}`)
                var tipos = []
                tipo.map(tipo => {
                    tipos.push(tipo.type.name)
                })
                console.log(`O tipo do seu pokemon é: ${tipos} ` );
                console.log(`\n================================ POKEMON ============================\n`) 
            })        
        }
        var x = rs.question(`>>> Digite qualquer tecla para voltar para o Menu\n>>> Digite S para sair\n>>> `)
        if(x.toUpperCase() === 'S'){
            process.exit()
        }else{
            this.menu()
        }
    })
    }
}

module.exports = repositorio