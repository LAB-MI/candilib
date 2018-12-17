import { all } from 'redux-saga/effects';
import authSaga from '../Auth/Auth.saga';

export default function* rootSaga(): Generator<*, *, *> {
  yield all([
    authSaga(),
  ]);
}
