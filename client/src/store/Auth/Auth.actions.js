export const FETCH_ADMIN_TOKEN_REQUEST = 'FETCH_TOKEN_REQUEST';
export const FETCH_ADMIN_TOKEN_FAILURE = 'FETCH_TOKEN_FAILURE';
export const FETCH_ADMIN_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCCESS';

export const CHECK_ADMIN_TOKEN = 'CHECK_ADMIN_TOKEN';
export const FETCH_ADMIN_TOKEN = 'FETCH_ADMIN_TOKEN';
export const RESET_ADMIN_TOKEN = 'RESET_ADMIN_TOKEN';
export const CHECK_TOKEN = 'CHECK_TOKEN';
export const FETCH_TOKEN = 'FETCH_TOKEN';
export const RESET_TOKEN = 'RESET_TOKEN';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_ADMIN_TOKEN = 'SET_ADMIN_TOKEN';
export const SET_AUTHENTICATION = 'SET_AUTHENTICATION';
export const SET_ADMIN_AUTHENTICATION = 'SET_ADMIN_AUTHENTICATION';
export const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
export const RESET_AUTH_ERROR = 'RESET_AUTH_ERROR';

export const requestToken = (email, password) => ({
  type: FETCH_ADMIN_TOKEN,
  payload: { email, password }
});

export const checkToken = (token) => ({
  type: CHECK_TOKEN,
  payload: { token },
});

export const checkAdminToken = () => ({
  type: CHECK_ADMIN_TOKEN,
});

export const resetToken = () => ({
  type: RESET_TOKEN,
});

export const resetAdminToken = () => ({
  type: RESET_ADMIN_TOKEN,
});

export const setAdminAuthenticated = () => ({
  type: SET_ADMIN_AUTHENTICATION,
});

export const setAuthenticated = () => ({
  type: SET_AUTHENTICATION,
});

export const setAuthError = (message) => ({
  type: SET_AUTH_ERROR,
  payload: { errorMessage: message }
});

export const resetAuthError = (message) => ({
  type: RESET_AUTH_ERROR,
});

export const setAdminToken = (token) => ({
  type: SET_ADMIN_TOKEN,
  payload: { token }
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: { token }
});
