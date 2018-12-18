import { call, put, takeEvery } from 'redux-saga/effects';
import api from '../../api';
import {
  CHECK_ADMIN_TOKEN,
  CHECK_TOKEN,
  FETCH_TOKEN,
  RESET_TOKEN,
  resetToken as resetTokenAC,
  setAuthError,
  setToken,
  setAuthenticated,
} from './Auth.actions';

import { STORAGE_TOKEN_KEY, STORAGE_CANDIDAT_ID_KEY } from '../../config/constants';

const auth = api.auth;

export function * checkAdminToken () {
  const getItem = localStorage.getItem.bind(localStorage)
  const token = yield call(getItem, STORAGE_TOKEN_KEY);
  if (token) {
    const action = yield call(setAuthenticated);
    yield put(action);
    return;
  }
  const action = yield call(resetTokenAC);
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
        yield call(setItem, STORAGE_CANDIDAT_ID_KEY, result.id);
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

export function * resetToken () {
  const removeItem = localStorage.removeItem.bind(localStorage);
  yield call(removeItem, STORAGE_TOKEN_KEY);
}

export function * loginAdmin (initialAction) {
  try {
    const { payload: { email, password }} = initialAction;
    const { token } = yield call(auth.requestToken, email, password);
    const action = yield call(setToken, token);
    yield * storeToken(token);
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
    yield * storeToken(token);
    const action = yield call(setToken, token);
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

export function * storeToken (token) {
  const setItem = localStorage.setItem.bind(localStorage)
  yield call(setItem, STORAGE_TOKEN_KEY, token);
}

export default function* authSaga() {
  yield takeEvery(CHECK_TOKEN, checkToken);
  yield takeEvery(CHECK_ADMIN_TOKEN, checkAdminToken);
  yield takeEvery(FETCH_TOKEN, login);
  yield takeEvery(RESET_TOKEN, resetToken);
}
