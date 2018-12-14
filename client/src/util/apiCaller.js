import fetch from 'isomorphic-fetch';

import { getFromStorage } from './storage';
import { KEYSTORAGETOKEN } from './app.constants';

export const API_URL = typeof window === 'undefined'
  || process.env.NODE_ENV === 'test'
  || process.env.NODE_ENV === 'development'
    ? process.env.BASE_URL || `http://localhost:${process.env.PORT}/api`
    : '/candilib/api';

export default function callApi(endpoint, method = 'get', body) {
  // const { token } = getFromStorage(KEYSTORAGETOKEN);
  let tokenCandidat = getFromStorage(KEYSTORAGETOKEN);
  if (tokenCandidat !== null && tokenCandidat.token !== undefined) {
    tokenCandidat = tokenCandidat.token;
  }
  return fetch(`${API_URL}/${endpoint}`, {
    headers: {
      'content-type': 'application/json',
      'x-access-token': tokenCandidat,
    },
    method,
    body: JSON.stringify(body),
  })
    .then((response) => {
      return response.json().then(json => ({ json, response }));
    })
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return json;
    })
    .then(response => response, error => error);
}
