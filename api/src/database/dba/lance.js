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
}