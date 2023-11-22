const Lance = require("../dba/lance")
const getConnection = require("../connection")

module.exports = {
    criar: async (lance) => {
        try {
            await getConnection().query(`
            insert INTO pratica.Lances values 
            (
                ${lance.idLeilao},
                ${lance.idCliente},
                ${lance.valor}
            )
            `)
            return true
        } catch(e) {
            console.log("Error na criação de Lance: "+err.code)
            return false
        }
    },
    buscarUltimoLance: async (idLeilao) => {
        try {
            const result = await getConnection().query(`
                select top 1 * from pratica.Lances
                where idLeilao = ${idLeilao}
                order by valor desc
            `)

            return result.recordset[0]
        } catch(e) {
            console.log("Error ao buscar último Lance: "+err.code)
            return false
        }
    },
    buscarPrimeiroLance: async (idLeilao) => {
        try {
            const result = await getConnection().query(`
                select top 1 * from pratica.Lances
                where idLeilao = ${idLeilao}
                order by valor asc
            `)

            return result.recordset[0]
        } catch(e) {
            console.log("Error ao buscar primeiro Lance: "+err.code)
            return false
        }
    },
    buscarTodosDe: async (idLeilao) => {
        try {
            const results = await getConnection().query(`
                select * from pratica.Lances
                where idLeilao = ${idLeilao}
            `)

            return results.recordset
        } catch(e) {
            console.log("Error ao buscar Lances de um Leilão: "+err.code)
            return false
        }
    },
    buscarTodos: async (id) => {
        try {
            const results = await getConnection().query(`
                select * from pratica.Lances
            `)

            return results.recordset
        } catch(e) {
            console.log("Error ao buscar todos os Lances: "+err.code)
            return false
        }
    }
}