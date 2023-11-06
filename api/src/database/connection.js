require("dotenv/config")
const sql = require("mssql")

let connection = null

async function handleConnection() {
    console.log("Conectando ao Banco de Dados...")
    connection = await sql.connect({
        server: process.env.BD_HOST,
        user: process.env.BD_USER,
        password: process.env.BD_PASS,
        database: process.env.BD_DATABASE
    })
    .then(e => {
        console.log(`Banco de Dados ${process.env.BD_HOST}, conectado com sucesso!`)
        return e
    })
    .catch(err => {
        console.log(`[Error] Conexão com Banco de Dados ${process.env.BD_HOST}:\n    >`+err)
        return null
    })
    return connection
}

function getConnection() {
    if(connection != null)
        return connection
    return handleConnection()
}

module.exports = getConnection