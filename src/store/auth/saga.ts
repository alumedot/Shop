import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as R from './types/redux';
import * as FetchResult from './types/fetchResult';
import { ActionTypes } from './types/ActionTypes';
import api from './api';

function* signUp(action: R.ISignUp) {
  try {
    const {email, password, meta} = action;
    const {data: {idToken, localId}}: AxiosResponse<FetchResult.ISignUpSucceed> = yield call(api.signUp, email, password);

    yield put<R.ISignUpSucceed>({
      type: ActionTypes.SignUpSucceed,
      email,
      password,
      token: idToken,
      userId: localId,
      meta,
    });
  } catch (error) {
    console.log('signUp error message');
    yield put<R.ISignUpFailed>({
      type: ActionTypes.SignUpFailed,
      error: error.response.data.error.message,
      meta: action.meta,
    });
  }
}

function* login(action: R.ILogin) {
  try {
    const {email, password, meta} = action;
    const {data: {idToken, localId}}: AxiosResponse<FetchResult.ILoginSucceed> = yield call(api.login, email, password);

    yield put<R.ILoginSucceed>({
      type: ActionTypes.LoginSucceed,
      email,
      password,
      token: idToken,
      userId: localId,
      meta,
    });
  } catch (error) {
    console.log('login error', error.response.data.error.message);
    console.log('login error message');
    const {meta} = action;
    yield put<R.ILoginFailed>({
      type: ActionTypes.LoginFailed,
      error: error.response.data.error.message,
      meta,
    });
  }
}

export default function* watchActions() {
  yield takeLatest(ActionTypes.SignUp, signUp);
  yield takeLatest(ActionTypes.Login, login)
}
