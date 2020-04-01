const cTable = require('console.table');
var admin = require("firebase-admin");
var rd = require('readline-sync')
var serviceAccount = require('./credenciais.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://aula-arbyte.firebaseio.com"  
});

var nomeTabelaMensagens = 'mensagens'

var bancoDeDados = admin.database().ref(nomeTabelaMensagens);

var nome = rd.question('Seu nome: ')
var para = rd.question('Para quem: ')
var mensagem = rd.question('Qual a sua mensagem: ')

bancoDeDados.push({
  de: nome,
  para: para,
  mensagem: mensagem
})

bancoDeDados.on('value', snapshot => {
  console.log(snapshot.val())
})


