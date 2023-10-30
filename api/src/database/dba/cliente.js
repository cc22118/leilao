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

    static validaId = (data) => (
        !data && typeof data != "number" &&
        data <= 0
    )
    static validaCargo = (data) => (
        !data && typeof data != "string" &&
        data.length < 15 && data.lenght > 0
    )
    static validaNome = (data) => (
        !nome && typeof data != "string" &&
        data.length < 50 && data.length > 3
    )
    static validaEmail = (data) => (
        !data && typeof data != "string" &&
        data.length < 50 && data.length > 0
    )
    static validaEndereco = (data) => (
        !data && typeof data != "string"  &&
        data.length < 50 && data.length > 0
    )
    static validaSenha = (data) => (
        !data && typeof data != "string" &&
        data.length > 8
    )
    static validaUrlAvatar = (data) => (
        !data && typeof data != "string" &&
        data.length > 0
    )
}