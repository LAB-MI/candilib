import 'whatwg-fetch';

import store from '../store';
import { resetToken } from '../store/Auth/Auth.actions';
import apiPaths from './api-paths';
import { STORAGE_TOKEN_KEY } from '../config/constants';

const checkStatus = async (response) => {
  if (response.status === 401) {
    store.dispatch(resetToken())
    throw new Error('unauthorized')
  }
  return response;
}

const checkValidJson = async (response) => {
  let data;
  try {
    data = await response.json()
  } catch (e) {
    throw new Error('invalid_json')
  }
  if (response.ok) {
      return data;
  }

  throw new Error(data.message || 'Une erreur inattendue est survenue. Veuillez réessayer plus tard.');
}

export const fetchClient = (url, options) => fetch(url, options).then(checkStatus)
export const jsonClient = (url, options) => fetchClient(url, options).then(checkValidJson)

const apiClient = {
  post: (url, options) => (
    jsonClient(url, { ...options, method: 'post'})
  ),
  get: (url, options) => (
    jsonClient(url, { ...options, method: 'GET'})
  ),
  getRaw: (url, options) => (
    fetchClient(url, { ...options, method: 'GET'})
  ),
  put: (url, options) => (
    jsonClient(url, { ...options, method: 'PUT'})
  ),
  delete: (url, options) => (
    jsonClient(url, { ...options, method: 'DELETE'})
  ),
}

const getAdminHeadersForJson = () => {
  const token = localStorage.getItem(STORAGE_TOKEN_KEY)
  return {
    'Content-Type': 'application/json',
    'x-access-token': token,
  }
};

const getTokenHeader = () => {
  const token = localStorage.getItem(STORAGE_TOKEN_KEY)
  return {
    'x-access-token': token,
  }
};

const getAdminHeaders = () => {
  const token = localStorage.getItem(STORAGE_TOKEN_KEY)
  return {
    'x-access-token': token,
  }
};

const getCandidatHeaders = () => {
  const token = localStorage.getItem(STORAGE_TOKEN_KEY)
  return {
    'Content-Type': 'application/json',
    'x-access-token': token,
  }
};

export default {
  auth: {
    async sendMagicLink (email) {
      const json = await apiClient.post(apiPaths.sendMagicLink, {
        headers: getCandidatHeaders(),
        body: JSON.stringify({
          email,
        }),
      });
      return json
    },

    async requestToken (email, password) {
      const json = await apiClient.post(apiPaths.login, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      return json;
    },

    async signup (formData) {
      const json = await apiClient.post(apiPaths.signup, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      return json;
    },

    async verifyToken(token) {
      const json = await apiClient.post(apiPaths.verifyToken, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
        }),
      })
      return json;
    }
  },

  admin: {
    async getCandidats () {
      const json = await apiClient.get(apiPaths.admin.candidats, {
        headers: getAdminHeadersForJson(),
      });
      return json;
    },

    async getCreneaux () {
      const json = await apiClient.get(apiPaths.creneaux, {
        headers: getAdminHeadersForJson(),
      });
      return json;
    },

    async uploadCandidatsJson (body) {
      const json = await apiClient.post(apiPaths.admin.uploadCandidatsJson, {
        headers: getAdminHeaders(),
        body,
      });
      return json;
    },

    async exportCsv () {
      const json = await apiClient.getRaw(apiPaths.admin.exportCsv, {
        headers: getAdminHeaders(),
      });
      return json;
    },

    async uploadPlacesCSV (body) {
      const json = await apiClient.post(apiPaths.admin.uploadPlacesCSV, {
        headers: getTokenHeader(),
        body,
      });
      return json;
    },

    async getWhitelist () {
      const json = await apiClient.get(apiPaths.admin.whitelist, {
        headers: getTokenHeader(),
      });
      return json;
    },

    async removeFromWhitelist (id) {
      const json = await apiClient.delete(`${apiPaths.admin.whitelist}/${id}`, {
        headers: getTokenHeader(),
      });
      return json;
    },

    async addToWhitelist (candidat) {
      const json = await apiClient.post(apiPaths.admin.whitelist, {
        headers: getAdminHeadersForJson(),
        body: JSON.stringify(candidat),
      });
     return json;
    },
  },
}
