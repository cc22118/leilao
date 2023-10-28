module.exports = class Cliente {
    id
    cargo
    nome
    email
    endereco
    senha
    urlAvatar
    constructor(id, cargo, nome, email, endereco, senha, urlAvatar) {
        this.id = id
        this.cargo = cargo
        this.nome = nome
        this.email = email
        this.endereco = endereco
        this.senha = senha
        this.urlAvatar = urlAvatar
    }
}