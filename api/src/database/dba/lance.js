module.exports = class Lance {
    idLeilao
    idCliente
    valor
    atualizadoEm
    constructor(idLeilao, idCliente, valor, atualizadoEm) {
        this.idLeilao = idLeilao
        this.idCliente = idCliente
        this.valor = valor
        this.atualizadoEm = atualizadoEm
    }

    async popular() {
        this.leilao = await LeilaoDBQ.buscarPorId(this.idLeilao)
        this.cliente = await ClienteDBQ.buscarPorId(this.idCliente)
    }
}