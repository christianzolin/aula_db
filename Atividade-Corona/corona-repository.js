
var db = require('./db')

module.exports = function(database){
    return {
        insereCorona: async function(corona){
            return new Promise(async (resolve, reject) => {
                await database.run(`INSERT INTO corona (Country, TotalConfirmed, NewConfirmed, NewDeaths, TotalDeaths, NewRecovered, TotalRecovered) VALUES(?, ?, ?, ?, ?, ?, ?)`, [corona.Country, corona.TotalConfirmed, corona.NewConfirmed, corona.NewDeaths, corona.TotalDeaths, corona.NewRecovered, corona.TotalRecovered], function(err) {
                    if (err) {
                        reject(err)
                    }
                    resolve(corona)
                });
            })
        },
        deletaCorona: async function(){
            return new Promise(async(resolve, reject) => {
                await database.run('DELETE FROM corona', function(err){
                    if(err){
                        reject(err)
                    }
                });
            })
        },
        maisInfectados: async function(){
            return new Promise(async(resolve, reject) => {
                await database.all('SELECT (Country),(TotalConfirmed) FROM corona ORDER BY TotalConfirmed DESC LIMIT 20', function(err,valor){
                    if(err){
                        reject(err)
                    }
                    resolve(valor)
                });
            })
        },
        maisNovosInfectados: async function(){
            return new Promise(async(resolve, reject) => {
                await database.run('SELECT (Country),(NewConfirmed) FROM corona ORDER BY NewConfirmed DESC LIMIT 10', function(err){
                    if(err){
                        reject(err)
                    }
                });
            })
        },
        maiorMortalidade: async function(){
            return new Promise(async(resolve, reject) => {
                await database.run('SELECT (Country),(TotalDeaths) FROM corona ORDER BY TotalDeaths DESC LIMIT 10', function(resultado, err){
                    if(err){
                        reject(err)
                    }
                    resolve(resultado)
                });
            })
        },
        menorMortalidade: async function(){
            return new Promise(async(resolve, reject) => {
                await database.run('SELECT (Country),(TotalDeaths) FROM corona WHERE TotalDeaths > 0 ORDER BY TotalDeaths LIMIT 10', function(err){
                    if(err){
                        reject(err)
                    }
                });
            })
        },
        maiorRecuperecao: async function(){
            return new Promise(async(resolve, reject) => {
                await database.run('SELECT (Country),(TotalRecovered) FROM corona ORDER BY TotalRecovered DESC LIMIT 10', function(err){
                    if(err){
                        reject(err)
                    }
                });
            })
        },
        pesPais: async function(nome){
            return new Promise(async(resolve, reject) => {
                await database.all('SELECT * FROM corona WHERE Country = ?', nome, function(err,resultado){
                    if(err){
                        reject(err)
                    }
                    resolve(resultado)
                });
            })
        },
        porcentagemMortalidade: async function(){
            return new Promise(async(resolve, reject) => {
                await database.run('SELECT (Country),(TotalDeaths*100)/TotalConfirmed as Mortalidade FROM corona ORDER BY (TotalDeaths*100)/TotalConfirmed DESC LIMIT 10', function(err){
                    if(err){
                        reject(err)
                    }
                });
            })
        },
        porcentagemRecuperacao: async function(){
            return new Promise(async(resolve, reject) => {
                await database.run('SELECT (Country),(TotalRecovered*100)/TotalConfirmed as Recuperados FROM corona ORDER BY (TotalRecovered*100)/TotalConfirmed DESC LIMIT 10', function(err){
                    if(err){
                        reject(err)
                    }
                });
            })
        }
    }
}
