export default class BaseConnect {
  static url = 'http://localhost:3028';
  static base_path = '/';

  private static handleParamsInPath(path: string, params?: object) {
    if(!params) return path;
    return Object.keys(params).reduce((acc, key) => acc.replace(`:${key}`, (params as any)[key]), path);
  }

  private static handleData(value: object | string | undefined) { 
    if(!value) return undefined;
    if(typeof value === 'string') return value;
    return JSON.stringify(value);
  }

  private static handleQuery(value: string | object | undefined) {
    if(!value) return '';
    if(typeof value === 'string') return value;
    return "?"+Object.keys(value).map(key => `${key}=${(value as any)[key]}`).join('&');
  }

  private static handleHeaders(value: HeadersInit | undefined, typeOfData: string) {
    if(typeOfData === 'object')
      return {
        'Content-Type': 'application/json',
        ...value,
      }
    return value;
  }

  static async get(path: string, config?: { params?: object, data?: object | string, query?: Object, headers?: HeadersInit }) {
    const response = await fetch(`${this.url}${this.handleParamsInPath(path, config?.params)}${this.handleQuery(config?.query)}`, {
      method: 'GET',
      body: this.handleData(config?.data),
      headers: this.handleHeaders(config?.headers, typeof config?.data),
    });
    return response;
  }

  static async post(path: string, data: object | string, config?: { params?: object, query?: Object, headers?: HeadersInit }) {
    const response = await fetch(`${this.url}${this.handleParamsInPath(path, config?.params)}${this.handleQuery(config?.query)}`, {
      method: 'POST',
      body: this.handleData(data),
      headers: this.handleHeaders(config?.headers, typeof data),
    });
    return response;
  }

  static async put(path: string, data: object | string, config?: { params?: object, query?: Object, headers?: HeadersInit }) {
    const response = await fetch(`${this.url}${this.handleParamsInPath(path, config?.params)}${this.handleQuery(config?.query)}`, {
      method: 'PUT',
      body: this.handleData(data),
      headers: this.handleHeaders(config?.headers, typeof data),
    });
    return response;
  }

  static async delete(path: string, config?: { params?: object, data?: object | string, query?: Object, headers?: HeadersInit }) {
    const response = await fetch(`${this.url}${this.handleParamsInPath(path, config?.params)}${this.handleQuery(config?.query)}`, {
      method: 'DELETE',
      body: this.handleData(config?.data),
      headers: this.handleHeaders(config?.headers, typeof config?.data),
    });
    return response;
  }
}