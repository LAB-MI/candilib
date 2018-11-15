import fetch from 'isomorphic-fetch';
import Config from '../../server/config';
import { getFromStorage } from './storage';

const KEYSTORAGETOKEN = 'candilib';


export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/api`) :
  '/api';

export default function callApi(endpoint, method = 'get', body) {
  return fetch(`${API_URL}/${endpoint}`, {
    headers: { 
      'content-type': 'application/json',
      'x-access-token': getFromStorage(KEYSTORAGETOKEN),
     },
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  })
  .then(
    response => response,
    error => error
  );
}
