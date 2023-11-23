const Lance = require("../dba/lance")
const getConnection = require("../connection")

module.exports = {
    criar: async (lance) => {
        try {
            await getConnection().query(`
            insert INTO pratica.Lance values 
            (
                ${lance.idLeilao},
                ${lance.idCliente},
                ${lance.valor},
                ${lance.atualizadoEm}
            )
            `)
            return true
        } catch(err) {
            console.log("Error na criação de Lance: "+err)
            return false
        }
    },
    buscarUltimoLance: async (idLeilao) => {
        try {
            const result = await getConnection().query(`
                select top 1 * from pratica.Lance
                where idLeilao = ${idLeilao}
                order by valor desc
            `)

            return result.recordset[0]
        } catch(err) {
            console.log("Error ao buscar último Lance: "+err.code)
            return false
        }
    },
    buscarPrimeiroLance: async (idLeilao) => {
        try {
            const result = await getConnection().query(`
                select top 1 * from pratica.Lance
                where idLeilao = ${idLeilao}
                order by valor asc
            `)

            return result.recordset[0]
        } catch(err) {
            console.log("Error ao buscar primeiro Lance: "+err.code)
            return false
        }
    },
    buscarTodosDe: async (idLeilao) => {
        try {
            const results = await getConnection().query(`
                select * from pratica.Lance
                where idLeilao = ${idLeilao}
            `)

            return results.recordset
        } catch(err) {
            console.log("Error ao buscar Lance de um Leilão: "+err.code)
            return false
        }
    },
    buscarTodos: async (id) => {
        try {
            const results = await getConnection().query(`
                select * from pratica.Lance
            `)

            return results.recordset
        } catch(err) {
            console.log("Error ao buscar todos os Lances: "+err.code)
            return false
        }
    }
}