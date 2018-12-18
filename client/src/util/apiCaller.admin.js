import { API_URL } from './apiCaller';
import { getFromStorage } from './storage';
import { KEYSTORAGETOKEN } from './app.constants';

export class ApiCaller {
  constructor(endpoint, method = 'get', body) {
    this._endpoint = endpoint;
    this._method = method;
    const token = localStorage.getItem(KEYSTORAGETOKEN);
    this._headers = {
      'content-type': 'application/json',
      'x-access-token': token,
    };
    this._body = body;
  }

  set body(value) {
    this._body = JSON.stringify(value);
  }

  set headers(value) {
    this._headers = value;
    this._headers['x-access-token'] = getFromStorage(KEYSTORAGETOKEN);
    return this;
  }

  _fetch(endpoint, method) {
    const _endpoint = endpoint === undefined ? this._endpoint : endpoint;
    const options = {
      method: method === undefined ? this._method : method,
      headers: this._headers,
    };

    if (this._body !== undefined) {
      options.body = this._body;
    }

    return fetch(`${API_URL}/${_endpoint}`, options).then((response) => {
      if (!response.ok) {
        return Promise.reject(response.json());
      }
      return response;
    });
  }

  get() {
    this._method = 'get';
    return this._fetch();
  }

  download() {
    let filename;
    return this._fetch()
      .then((response) => {
        // responseContentType = response.headers.get('Content-Type');
        [, filename] = response.headers.get('Content-Disposition').split('=');
        return response.blob();
      })
      .then((response) => {
        const ret = {
          filename,
          url: URL.createObjectURL(response),
        };
        const link = document.createElement('a');
        document.body.appendChild(link);
        link.style = 'display: none';
        link.href = ret.url;
        link.download = ret.filename;
        link.click();
        URL.revokeObjectURL(ret.url);
        document.body.removeChild(link);
        return Promise.resolve(ret);
      });
  }

  post(body) {
    if (body instanceof FormData) {
      delete this._headers['content-type'];
      this._body = body;
    } else {
      this.body = body;
    }
    return this._fetch();
  }

  delete(id) {
    this._method = 'delete';
    const endpoint = this._endpoint + '/' + id;
    return this._fetch(endpoint);
  }

  then(callback) {
    return this._fetch().then(callback);
  }
}

export const callApi = (endpoint, method, body) => new ApiCaller(endpoint, method, body);
