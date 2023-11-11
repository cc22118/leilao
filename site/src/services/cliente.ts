import BaseConnect from "./base_connect"

export default class ClienteConnection extends BaseConnect {
  static base_path = '/user';

  static async BuscarTodos() {
    const response = await this.get(`${this.base_path}/list/all`);
    return response;
  }

  static async BuscarPorId(id: number) {
    const response = await this.get(`${this.base_path}/list/:id`, { params: { id } });
    return response;
  }

  static async Criar(data: object) {
    const response = await this.post(`${this.base_path}/create`, data);
    return response;
  }
  
  static async Login(data: object) {
    const response = await this.post(`${this.base_path}/login`, data);
    return response;
  }

  static async Atualizar(id: number, data: object) {
    const response = await this.put(`${this.base_path}/:id`, data, { params: { id } });
    return response;
  }

  static async Deletar(id: number) {
    const response = await this.delete(`${this.base_path}/:id`, { params: { id } });
    return response;
  }

  static async info() {
    const response = await this.get(`${this.base_path}/info`);
    return response;
  }

}