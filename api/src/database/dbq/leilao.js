const Leilao = require("../dba/leilao")
const getConnection = require("../connection")

module.exports = {
    criar: async (leilao) => {
        try {
            await getConnection().query(`
                insert INTO pratica.Leilao values 
                (
                    ${leilao.idProduto},
                    '${leilao.dataInicio}',
                    '${leilao.dataFim}'
                )
            `)
            return true
        } catch (err) {
            console.log("Error na criação de Leilão: "+err.code)
            return false
        }
    },
    atualizar: async (id, leilao) => {
        try {
            await getConnection().query(`
                update pratica.Leilao set
                dataInicio = '${leilao.dataInicio}',
                dataFim = '${leilao.dataFim}'
                where idProduto = ${id}
            `)
            return true
        } catch(err) {
            console.log("Error ao atualizar Leilão: "+err.code)
            return false
        }
    },
    buscarTodos: async () => {
        try {
            const results = await getConnection().query(`
                select * from pratica.Leilao
            `)

            return results.recordset
        } catch (err) {
            console.log("Error ao buscar todos os Leilões: "+err.code)
            return false
        }
    }
}