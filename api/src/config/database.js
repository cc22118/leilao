const databaseConfig = {
  server: process.env.BD_HOST,
  user: process.env.BD_USER,
  password: process.env.BD_PASS,
  database: process.env.BD_DATABASE,
  synchronize: true,
  trustServerCertificate: true
}

if(databaseConfig.server == null || databaseConfig.server == undefined)
  throw new Error("Variável de ambiente BD_HOST não definida, crie o arquivo `.env`")

module.exports = databaseConfig