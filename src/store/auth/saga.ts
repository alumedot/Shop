import { AxiosResponse } from 'axios';
import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import * as R from './types/redux';
import * as FetchResult from './types/fetchResult';
import { ActionTypes } from './types/ActionTypes';
import api from './api';

function* signUp(action: R.ISignUp) {
  try {
    const {email, password, meta} = action;
    const {data: {idToken, localId, expiresIn}}: AxiosResponse<FetchResult.ISignUpSucceed> = yield call(api.signUp, email, password);

    yield put<R.IAuthenticate>({
      type: ActionTypes.Authenticate,
      token: idToken,
      userId: localId,
      expiryDate: Number(expiresIn) * 1000,
      meta,
    });

    const expirationDate = new Date(new Date().getTime() + parseInt(expiresIn) * 1000);
    saveDataToStorage(idToken, localId, expirationDate);
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
    const {data: {idToken, localId, expiresIn}}: AxiosResponse<FetchResult.ILoginSucceed> = yield call(api.login, email, password);

    yield put<R.IAuthenticate>({
      type: ActionTypes.Authenticate,
      token: idToken,
      userId: localId,
      expiryDate: Number(expiresIn) * 1000,
      meta,
    });

    const expirationDate = new Date(new Date().getTime() + parseInt(expiresIn) * 1000);
    saveDataToStorage(idToken, localId, expirationDate);
  } catch (error) {
    console.log('login error', error.response.data.error.message);
    const {meta} = action;
    yield put<R.ILoginFailed>({
      type: ActionTypes.LoginFailed,
      error: error.response.data.error.message,
      meta,
    });
  }
}

function* autoLogout(action) {
  yield delay(action.expiryDate);
  AsyncStorage.removeItem('userData');
  yield put({ type: ActionTypes.Logout });
}

export default function* watchActions() {
  yield takeLatest(ActionTypes.SignUp, signUp);
  yield takeLatest(ActionTypes.Login, login);
  yield takeLatest(ActionTypes.Authenticate, autoLogout);
}

const saveDataToStorage = (token: string, userId: string, expirationDate: Date) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token,
    userId,
    expiryDate: expirationDate.toISOString(),
  }));
};
