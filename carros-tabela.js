var db = require('./db')

module.exports = function(database){
    return {
        criaTabela: async function(){
            return new Promise(async (resolve, reject) => {
                await database.run(`REATE TABLE IF NOT EXISTS carros(nome text, cor text, ano integer, valor integer`);
                resolve()
            })
        },
        insereCarro : async function(carro){
            return new Promise(async(resolve, reject) => {
                await database.run(`INSERT INTO carros(nome, cor, ano, valor) VALUES(?,?,?,?)`, [carro.nome,carro.cor,carro.ano,carro.valor], function(err){
                    if(err){
                        reject(err)
                    }
                    console.log(`Carro inserido com sucesso linha ${this.lastID}`);
                    resolve(this.lastID)
                });
            })
        },
        mostraCarros: async function(){
            return new Promise(async (resolve, reject) => {
                var carros = []
                let sql = 'SELECT * FROM carros';
                var carros = []
                await database.all(sql,[], (err,rows) => {
                    if(err){
                        reject(err)
                    }
                    rows.forEach((row) => {
                        carros.push({
                            nome: row.nome,
                            cor: row.cor,
                            ano: row.ano,
                            valor: row.valor
                        })
                    });
                    resolve(carros)
                });
            })
        },
        deletaCarros: async function(nome){
            return new Promise(async(resolve, reject) => {
                await database.run('DELETE FROM carros WHERE nome=?', [nome] , function(err){
                    if(err){
                        reject(err)
                    }
                    console.log(`Carro deletado com sucesso linha ${this.lastID}`);
                    resolve(this.lastID)
                });
            })
        },
        carroMaiorValor: async function(){
            return new Promise(async (resolve, reject) => {
                await database.all('SELECT MAX (valor) FROM carros', (err,valor) => {
                    if(err){
                        reject(err)
                    }
                    resolve(valor)
                });
            })
        },
        carroMenorValor: async function(){
            return new Promise(async (resolve, reject) => {
                await database.all('SELECT MIN (valor) FROM carros', (err,valor) => {
                    if(err){
                        reject(err)
                    }
                    resolve(valor)
                });
            })
        },
        carroMaiorValorParMenorValor: async function(){
            return new Promise(async (resolve, reject) => {
                await database.all('SELECT nome,valor FROM carros ORDER BY valor DESC', (err,valor) => {
                    if(err){
                        reject(err)
                    }
                    resolve(valor)
                });
            })
        },
        numCarros: async function(){
            return new Promise(async (resolve, reject) => {
                await database.all('SELECT count (nome) FROM carros ', (err,valor) => {
                    if(err){
                        reject(err)
                    }
                    resolve(valor)
                });
            })
        },
        pesCor: async function(nome){
            return new Promise(async (resolve, reject) => {
                await database.all('SELECT nome,cor FROM carros WHERE cor = ?', nome,  (err,valor) => {
                    if(err){
                        reject(err)
                    }
                    resolve(valor)
                });
            })
        },
        pesAno: async function(nome){
            return new Promise(async (resolve, reject) => {
                await database.all('SELECT nome,ano FROM carros WHERE ano = ?', nome,  (err,valor) => {
                    if(err){
                        reject(err)
                    }
                    resolve(valor)
                });
            })
        },
        pesAnoMaior: async function(nome){
            return new Promise(async (resolve, reject) => {
                await database.all('SELECT nome,ano FROM carros WHERE ano > ?', nome,  (err,valor) => {
                    if(err){
                        reject(err)
                    }
                    resolve(valor)
                });
            })
        },
        pesAnoMenor: async function(nome){
            return new Promise(async (resolve, reject) => {
                await database.all('SELECT nome,ano FROM carros WHERE ano < ?', nome,  (err,valor) => {
                    if(err){
                        reject(err)
                    }
                    resolve(valor)
                });
            })
        }
        

    }
}