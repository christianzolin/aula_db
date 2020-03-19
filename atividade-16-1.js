var readline = require('readline-sync')
var carros_tabela = require('./carros-tabela')
const cTable = require('console.table');
var db = require('./db')


db.getDb().then(async database => {
    var choice = "";
    var repositorio = carros_tabela(database);
    do{
        console.log('--------------------------ESCOLHA--------------------------')
        console.log("Insira A para cadastrar um novo carro")
        console.log("Insira B para deletar um carro ")
        console.log("Insira C para mostrar todos os carro ")
        console.log("Insira D para sair")
        console.log("Insira F para ver o carro com maior valor")
        console.log("Insira G para ver o carro com maior valor")
        console.log("Insira H para ver os carros do maior valor para o menor")
        console.log("Insira I para ver quantos carros cadastrados")
        console.log("Insira J para pesquisar carros por cores")
        console.log("Insira K para pesquisar carros do mesmo ano")
        console.log("Insira L para pesquisar carros maior que um ano")
        console.log("Insira M para pesquisar carros menor que um ano")
        choice = await readline.question("Escolha : ").toUpperCase()
        if(choice === "A") {
            console.clear()
            console.log('--------------------------CADASTRO CARROS--------------------------')
            var carro = {
                nome : readline.question("Insira nome do carro : "),
                cor : readline.question("Insira a cor do carro  : "),
                ano : readline.questionInt("Insira o ano do carro  : "),
                valor : readline.questionInt("Insira o valor do carro  : "),
            }
            await repositorio.insereCarro(carro).then(p => {
                console.clear()
                console.log("Carro inserido com sucesso")
            }).catch(p => {
                console.log("Não foi possível inserir o carro")
            })
        }else if(choice === "B"){
            console.clear()
            var nome = readline.question("Insira qual carro deseja deletar: ")
            await repositorio.deletaCarros(nome).then(p =>{
            console.table(p)
            })


        }else if(choice === "C"){
            console.clear()
            await repositorio.mostraCarros().then(p => {
                console.table(p)
            })
        }else if(choice === "F"){
            console.clear()
            await repositorio.carroMaiorValor().then(p => {
                console.table(p)
            })
        }else if(choice === "G"){
            console.clear()
            await repositorio.carroMenorValor().then(p => {
                console.table(p)
            })
        }else if (choice === "H"){
            console.clear()
            await repositorio.carroMaiorValorParMenorValor().then(p => {
                console.table(p)
            })   
        }else if(choice === "I"){
            console.clear()
            await repositorio.numCarros().then(p => {
                console.table(p)
            })
        }else if(choice === "J"){
            console.clear()
            var cor = readline.question('Qual a cor que deseja pesquisar: ')
            await repositorio.pesCor(cor).then(p => {
                console.table(p)
            })

        }else if(choice === "K"){
            console.clear()
            var ano = readline.question('Qual o ano que deseja pesquisar: ')
            await repositorio.pesAno(ano).then(p => {
                console.table(p)
            })
        }else if(choice === "L"){
            console.clear()
            var ano = readline.question('Deseja pesquisar o ano maior que : ')
            await repositorio.pesAnoMaior(ano).then(p => {
                console.table(p)
            })
        }else if(choice === "M"){
            console.clear()
            var ano = readline.question('Deseja pesquisar: o ano menor que: ')
            await repositorio.pesAnoMenor(ano).then(p => {
                console.table(p)
            })
        }else if(choice !== "D") {
            console.clear()
            console.log("Opção invalida tente novamente ")
            console.log()
        }

    } while(choice.toUpperCase() !== "D")
});