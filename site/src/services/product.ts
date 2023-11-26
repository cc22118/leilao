import BaseConnect from "./base_connect"

export interface Product {
  id: number
  criador: number
  nome: string
  descricao: string
  urlFoto: string
  valorMinimo: number
}

export interface ProductAuction extends Product {
  idLeilao: number
  idProduto: number
  dataInicio: string
  dataFim: string
}

export default class ProductConnection extends BaseConnect {
  static async getAll() {
    return await this.get("/product/list/all")
  }

  static async getAllAuction() {
    return await this.get("/product/list/auction")
  }

  static async getByIdCriador(id: string) {
    return await this.get("/product/list/auction", { query: {"id_vendedor": id} })
  }

  static async getById(id: number) {
    return await this.get("/product/:id", { params: {id} })
  }

  static async getByIdLeilao(idLeilao: number) {
    return await this.get("/product/list/auction/:idLeilao", { params: {idLeilao} })
  }
}