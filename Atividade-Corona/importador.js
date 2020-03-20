var readline = require('readline-sync')
var axios = require('axios')
var db = require('./db')
const cTable = require('console.table');
var corona_repository = require('./corona-repository')
 
db.getDb().then(async database => {
    
    var choice = "b";
    var repositorio = corona_repository(database);
    repositorio.deletaCorona()
    var data = [];
    axios.get("https://api.covid19api.com/summary")
    .then(async response => {
        data = response.data
        for(var i in data.Countries){
            await repositorio.insereCorona(data.Countries[i])
        }
        console.log('oi')
    }).catch(err => {
        console.log('erro', err)
    })
    /// começa
    
    
    await repositorio.maisInfectados().then(p =>{
        console.table(p)
        })
    
    

})
