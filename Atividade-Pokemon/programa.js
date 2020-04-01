var db = require('./bancodedados.js').database
var rs = require('readline-sync')
var axios = require('axios')


function cadastraPokemon(){
    var pokemon = rs.question('Qual pokemon deseja pesquisar: ')
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then(resultado => {
                var tipo = resultado.data.types
                var habilidades = resultado.data.abilities
                var id = resultado.data.id
                console.log(`O nome do seu pokemon é : ${resultado.data.species.name}`)
                tipo.map(tipo =>{
                    console.log(`O tipo do seu pokemne é : ${tipo.type.name}`)
                })
                habilidades.map( habi =>{
                    console.log(`As habilidades do seu pokemon é: ${habi.ability.name}`)
                })

                var pergunta = rs.question('Voce deseja adicionar a sua pokedex:\nDigite 1 para adicionar \nDigite 2 para continuar ')
                if(pergunta === "1"){
                    db.push({
                        treinador: 'teste',
                        id: id,
                        pokemon: resultado.data.species.name,
                        tipo: tipo,
                        habilidades: habilidades

                    })
                }   
                else{
                    console.log('Ñ não add')
                }
            })
            .catch(erro => {
                console.log(erro , 'este pokemon não existe');
            })
}
cadastraPokemon()









// var pontuacoesUsuariosRef = bancoDeDados.ref('jogo')
// var pontuacaoUsuarioRef = nome => bancoDeDados.ref(`jogo/${nome}`)


// function buscaPontuacoes() {
//     console.log('buscaPontuacoes: ', buscaPontuacoes);
//     pontuacoesUsuariosRef.on('value', snapshot => {
//         var pontuacoes = snapshot.val()
//         Object.entries(pontuacoes).forEach(([chave, pontuacao]) => console.log(pontuacao.nome, '=>', pontuacao.pontuacao))
//     })
// }

// function criaPontuacaoDeJogador(jogador, callback) {
//     var pontuacaoUsuario = pontuacaoUsuarioRef(jogador.nome)

//     pontuacaoUsuario.set({
//         nome: jogador.nome,
//         pontuacao: jogador.pontuacao
//     }, callback())
// }
// var jogador = (nome, pontuacao) => ({ nome, pontuacao })

// console.clear()
// console.log('========================= JOGO DE DIGITAR =========================')

// var nome = rs.question('Digite seu nome: ')
// var entrada = rs.question('Digite o máximo de letras possíveis e pressione enter:\n')
// var pontuacao = entrada.length

// console.log('\n\n\n\n')
// console.log('Sua pontuação final foi:', pontuacao)

// console.log('========================= OBRIGADO POR JOGAR! =========================')

// criaPontuacaoDeJogador(jogador(nome, pontuacao), buscaPontuacoes)