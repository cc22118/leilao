const Produto = require("../dba/produto")
const getConnection = require("../connection")

module.exports = {
    criar: async (produto) => {
        try {
            await getConnection().query(`
                insert INTO pratica.Produto 
                (criador, nome, descricao, urlFoto, valorMinimo)
                values 
                (
                    ${produto.criador},
                    '${produto.nome}',
                    '${produto.descricao}',
                    '${produto.urlFoto}',
                    ${produto.valorMinimo}
                )
            `)
            return true
        } catch (err) {
            console.log("Error na criação de Produto: "+err.code)
            return false
        }
    },
    deletar: async (id) => {
        try {
            await getConnection().query(`
                delete from pratica.Produto
                where id = ${id}
            `)
            return true
        } catch(err) {
            console.log("Error ao deletar Produto: "+err.code)
            return false
        }
    },
    atualizar: async (id, produto) => {
        try {
            await getConnection().query(`
                update pratica.Produto set
                nome = '${produto.nome}',
                descricao = '${produto.descricao}',
                urlFoto = '${produto.urlFoto}',
                valorMinimo = ${produto.valorMinimo}
                where id = ${id}
            `)
            return true
        } catch(err) {
            console.log("Error ao atualizar Produto: "+err.code)
            return false
        }
    },
    buscarId: async (id) => {
        try {
            const result = await getConnection().query(`
                select * from pratica.ProdutoCriador
                where id = ${id}
            `)
            return result.recordset[0]
        } catch(err) {
            console.log("Error ao buscar Produto por id: "+err.code)
            return false
        }
    },
    buscarTodos: async (id) => {
        try {
            const results = await getConnection().query(`
                select * from pratica.Produto
            `)
            return results.recordset
        } catch(err) {
            console.log("Error ao buscar todos os Produtos: "+err.code)
            return false
        }
    }
}