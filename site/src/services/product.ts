import BaseConnect from "./base_connect"

export interface Product {
  id: number
  criador: number
  nome: string
  descricao: string
  urlFoto: string
  valorMinimo: number
}

export default class ProductConnection extends BaseConnect {
  static async getAll() {
    return await this.get("/product/list/all")
  }

  static async getByIdCriador(id: string) {
    return await this.get("/product/list/all", { query: {"id_vendedor": id} })
  }

  static async getById(id: number) {
    return await this.get("/product/:id", { params: {id} })
  }
}