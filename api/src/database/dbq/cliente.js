const TokenAdmin = require("../../utils/token")
const getConnection = require("../connection")
const Cliente = require("../dba/cliente")

module.exports  = ClienteDBQ = {
    criar: async (cliente) => {
        try {
            await getConnection().query(`
                insert INTO pratica.Cliente values 
                (
                    '${cliente.nome}',
                    '${cliente.email}',
                    '${cliente.endereco}',
                    '${cliente.senha}',
                    ${cliente.urlAvatar? "'"+cliente.urlAvatar+"'" : "null"},
                    '${cliente.cargo}'
                )
            `)
            return true
        } catch (err) {
            console.log("Error na criação de Cliente: "+err.code)
            return false
        }
    },
    logar: async (email, senha) => {
        try {
            const result = await getConnection().query(`
                select * from pratica.Cliente
                where email = '${email}'
            `)

            if(result.recordset[0].senha !== senha)
                return false
            return TokenAdmin.gerar({ id: result.recordset[0].id, cargo: result.recordset[0].cargo, nome: result.recordset[0].nome })
        } catch (err) {
            console.log("Error ao logar Cliente: "+err.code)
            return false
        
        }
    },
    deletar: async (id) => {
        try {
            await getConnection().query(`
                delete from pratica.Cliente
                where id = ${id}
            `)
            return true
        } catch(err) {
            console.log("Error ao deletar Cliente: "+err.code)
            return false
        }
    },
    atualizar: async (id, cliente) => {
        try {
            await getConnection().query(`
                update pratica.Cliente set
                cargo = '${cliente.cargo}',
                nome = '${cliente.nome}',
                email = '${cliente.email}',
                endereco = '${cliente.endereco}',
                senha = '${cliente.senha}',
                urlAvatar = ${cliente.urlAvatar? "'"+cliente.urlAvatar+"'" : "null"}
                where id = ${id}
            `)

            return true
        } catch(err) {
            console.log("Error ao atualizar Cliente: "+err.code)
            return false
        }
    },
    buscarId: async (id) => {
        try {
            const result = await getConnection().query(`
                select * from pratica.Cliente
                where id = ${id}
            `)

            return result.recordset[0]
        } catch(err) {
            console.log("Error ao buscar Cliente por id: "+err.code)
            return false
        }
    },
    buscarTodos: async () => {
        try {
            const result = await getConnection().query(`
                select * from pratica.Cliente
            `)

            return result.recordset
        } catch(err) {
            console.log("Error ao buscar todos os Clientes: "+err.code)
            return false
        }
    }
}