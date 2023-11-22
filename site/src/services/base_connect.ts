export default class BaseConnect {
  static url = 'http://localhost:3028';
  static base_path = '/';

  private static handleParamsInPath(path: string, params?: object) {
    if(!params) return path;
    return Object.keys(params).reduce((acc, key) => acc.replace(`:${key}`, (params as any)[key]), path);
  }

  private static handleData(value?: object) { 
    if(!value) return null;
    return JSON.stringify(value);
  }

  private static handleQuery(value?: { [key: string]: string }) {
    if(!value) return '';
    return "?"+Object.keys(value).map(key => `${key}=${value[key]}`).join('&');
  }

  private static handleHeaders(value?: HeadersInit) {
      return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...value,
      }
  }

  protected static async get(path: string, config?: { params?: object, data?: object, query?: { [key: string]: string }, headers?: HeadersInit }) {
    const response = await fetch(`${this.url}${this.handleParamsInPath(path, config?.params)}${this.handleQuery(config?.query)}`, {
      method: 'GET',
      body: this.handleData(config?.data),
      headers: this.handleHeaders(config?.headers),
    });
    return response;
  }

  protected static async post(path: string, data: object, config?: { params?: object, query?: { [key: string]: string }, headers?: HeadersInit }) {
    const response = await fetch(`${this.url}${this.handleParamsInPath(path, config?.params)}${this.handleQuery(config?.query)}`, {
      method: 'POST',
      body: this.handleData(data),
      headers: this.handleHeaders(config?.headers),
    });
    return response;
  }

  protected static async put(path: string, data: object, config?: { params?: object, query?: { [key: string]: string }, headers?: HeadersInit }) {
    const response = await fetch(`${this.url}${this.handleParamsInPath(path, config?.params)}${this.handleQuery(config?.query)}`, {
      method: 'PUT',
      body: this.handleData(data),
      headers: this.handleHeaders(config?.headers),
    });
    return response;
  }

  protected static async delete(path: string, config?: { params?: object, data?: object, query?: { [key: string]: string }, headers?: HeadersInit }) {
    const response = await fetch(`${this.url}${this.handleParamsInPath(path, config?.params)}${this.handleQuery(config?.query)}`, {
      method: 'DELETE',
      body: this.handleData(config?.data),
      headers: this.handleHeaders(config?.headers),
    });
    return response;
  }
}