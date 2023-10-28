const Connection = require('tedious').Connection

const config = {
    server: 'regulus.cotuca.unicamp.br',
    authentication: {
        type: 'default',
        options: {
            userName: 'BD22118',
            password: '@ngel11539' 
        }
    },
    options: {
        encrypt: false,
        database: 'BD22118'
    }
}

const connection = new Connection(config)

connection.on('connect', function(err) {  
    if(err)
        console.log("Erro ao conectar com o BD -> "+err)
    else
    console.log("Conectado no BD");  
});

module.exports = connection