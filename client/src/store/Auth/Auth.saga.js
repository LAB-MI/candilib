import { call, put, takeEvery } from 'redux-saga/effects';
import api from '../../api';
import {
  CHECK_TOKEN,
  FETCH_TOKEN,
  RESET_TOKEN,
  CHECK_ADMIN_TOKEN,
  FETCH_ADMIN_TOKEN,
  RESET_ADMIN_TOKEN,
  resetAdminToken as resetAdminTokenAC,
  resetToken as resetTokenAC,
  setAuthError,
  setToken,
  setAdminToken,
  setAuthenticated,
  setAdminAuthenticated,
} from './Auth.actions';

import { ADMIN_STORAGE_TOKEN_KEY, STORAGE_TOKEN_KEY } from '../../config/constants';

const auth = api.auth;

export function * checkAdminToken () {
  const getItem = localStorage.getItem.bind(localStorage)
  const token = yield call(getItem, ADMIN_STORAGE_TOKEN_KEY);
  if (token) {
    const action = yield call(setAdminAuthenticated);
    yield put(action);
    return;
  }
  const action = yield call(resetAdminTokenAC);
  yield put(action);
}

export function * checkToken (initialAction) {
  try {
    let { payload: { token }} = initialAction;

    if (!token) {
      const getItem = localStorage.getItem.bind(localStorage);
      token = yield call(getItem, STORAGE_TOKEN_KEY);
    }

    if (token) {
      const result = yield call(auth.verifyToken, token);
      if (result.isAuthenticated) {
        const setItem = localStorage.setItem.bind(localStorage);
        yield call(setItem, STORAGE_TOKEN_KEY, token);
        const action = yield call(setAuthenticated);
        yield put(action);
      }
      return;
    }
    const action = yield call(resetTokenAC);
    yield put(action);
  } catch (error) {
    console.error(error);
  }
}

export function * resetAdminToken () {
  const removeItem = localStorage.removeItem.bind(localStorage);
  yield call(removeItem, ADMIN_STORAGE_TOKEN_KEY);
}

export function * resetToken () {
  const removeItem = localStorage.removeItem.bind(localStorage);
  yield call(removeItem, STORAGE_TOKEN_KEY);
}

export function * loginAdmin (initialAction) {
  try {
    const { payload: { email, password }} = initialAction;
    const { token } = yield call(auth.requestToken, email, password);
    const action = yield call(setAdminToken, token);
    yield * storeAdminToken(token);
    yield put(action);
  } catch (error) {
    let message = error.message;
    if (error.message === 'invalid_json') {
      message = 'Réponse inattendue du serveur, veuillez réessayer plus tard.'
    } else if (error.message === 'unauthorized') {
      message = 'Identifiants incorrects'
    }
    const action = yield call(setAuthError, message);
    yield put(action);
  }
}

export function * login (initialAction) {
  try {
    const { payload: { email, password }} = initialAction
    const { token } = yield call(auth.requestToken, email, password);
    const action = yield call(setToken, token);
    yield * storeAdminToken(token);
    yield put(action);
  } catch (error) {
    let message = error.message;
    if (error.message === 'invalid_json') {
      message = 'Réponse inattendue du serveur, veuillez réessayer plus tard.'
    } else if (error.message === 'unauthorized') {
      message = 'Identifiants incorrects'
    }
    const action = yield call(setAuthError, message);
    yield put(action);
  }
}

export function * storeAdminToken (token) {
  const setItem = localStorage.setItem.bind(localStorage)
  yield call(setItem, ADMIN_STORAGE_TOKEN_KEY, token);
}

export default function* authSaga() {
  yield takeEvery(CHECK_ADMIN_TOKEN, checkAdminToken);
  yield takeEvery(FETCH_ADMIN_TOKEN, loginAdmin);
  yield takeEvery(RESET_ADMIN_TOKEN, resetAdminToken);
  yield takeEvery(CHECK_TOKEN, checkToken);
  yield takeEvery(FETCH_TOKEN, login);
  yield takeEvery(RESET_TOKEN, resetToken);
}
