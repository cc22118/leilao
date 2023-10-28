module.exports = class Leilao {
    id
    idProduto
    dataInicio
    dataFim
    constructor(id, idProduto, dataInicio, dataFim) {
        this.id = id
        this.idProduto = idProduto
        this.dataInicio = dataInicio
        this.dataFim = dataFim
    }
}