import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as R from './types/redux';
import * as FetchResult from './types/fetchResult';
import { ActionTypes } from './types/ActionTypes';
import api from './api';

function* signUp(action: R.ISignUp) {
  try {
    const {email, password} = action;
    const {data}: AxiosResponse<FetchResult.ISignUpSucceed> = yield call(api.signUp, email, password);

    console.log('data', data);
    yield put<R.ISignUpSucceed>({
      type: ActionTypes.SignUpSucceed,
      email,
      password,
    });
  } catch (error) {
    console.log('signUp error message');
    yield put<R.ISignUpFailed>({
      type: ActionTypes.SignUpFailed,
      error,
    });
  }
}

export default function* watchActions() {
  yield takeLatest(ActionTypes.SignUp, signUp);
}
