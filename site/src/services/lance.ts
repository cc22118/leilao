import BaseConnect from "./base_connect"

export interface Lance {
  id: number;
  idLeilao: number;
  idCliente: number;
  valor: number;
  atualizadoEm: Date;
}

export default class LanceConnection extends BaseConnect {
  static base_path = '/bid';

  static async BuscarLances(idLeilao: number) {
    const response = await this.get(`${this.base_path}/:idLeilao/list`, { params: { idLeilao } })
      .then(res => res.status === 200? res.json() as any as Array<Lance> : [])
      .catch(err => {
        throw err;
      });

    return response;
  }

  static async BuscarPrimeiroLance(idLeilao: number) {
    const response = await this.get(`${this.base_path}/:idLeilao/first`, { params: { idLeilao } })
      .then(res => res.status === 200? res.json() as any as Lance : undefined)
      .catch(err => {
        throw err;
      });
    return response;
  }

  static async BuscarUltimoLance(idLeilao: number) {
    const response = await this.get(`${this.base_path}/:idLeilao/last`, { params: { idLeilao } })
      .then(res => res.status === 200? res.json() as any as Lance : undefined)
      .catch(err => {
        throw err;
      });
    return response;
  }

  static async BuscarTodos() {
    const response = await this.get(`${this.base_path}/list/all`)
      .then(res => res.status === 200? res.json() as any as Array<Lance> : [])
      .catch(err => {
        throw err;
      });
    return response;
  }

  static async Criar(data: Omit<Lance, 'id' | "idCliente" | 'atualizadoEm'>) {
    const response = await this.post(`${this.base_path}/create`, data)
      .then(res => res.status === 201? true : false)
      .catch(err => {
        throw err;
      });
    return response;
  }
}