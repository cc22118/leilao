module.exports = class Produto {
    id
    criador
    nome
    descricao
    urlFoto
    valorMinimo
    constructor(id, nome, criador, descricao, urlFoto, valorMinimo) {
        this.id = id
        this.nome = nome
        this.criador = criador
        this.descricao = descricao
        this.urlFoto = urlFoto
        this.valorMinimo = valorMinimo
    }
}