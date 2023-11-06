require("dotenv/config")
const express = require("express")
const cors = require("cors")
const clienteRoutes = require("./routes/cliente")
const lanceRoutes = require("./routes/lance")
const produtoRoutes = require("./routes/produto")
const getConnection = require("./database/connection")
const logRequestMiddleware = require("./middleware/log-request")

const app = express()

app.use(express.json())
app.use(cors())

//-------------[ Middlewares de log ]-------------//
app.use(logRequestMiddleware)

//-------------[ Aplicando as Rotas ]-------------//
app.use("/user", clienteRoutes)
app.use("/bid", lanceRoutes)
app.use("/product", produtoRoutes)

app.use("*", (req, res) => {
    res.status(404).send(`
        <h1>404</h1>
        <h2>${req.originalUrl} em ${req.method} não existe</h2>
    `)
})

//------------[ Iniciando Conexão BD ]------------//
getConnection()
//-------------[ Iniciando API REST ]-------------//
app.listen(3028, () => {
    console.log("Servidor iniciado na porta 3028")
})
