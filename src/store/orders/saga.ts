import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import Order from 'models/order';
import api from './api';
import * as R from './types/redux';
import * as FetchResult from './types/fetchResult';
import { ActionTypes } from './types/ActionTypes';


function* addOrder(action: R.IAddOrder) {
  const date = new Date();
  try {
    const {items, totalAmount} = action.orderData;
    const {data}: AxiosResponse<FetchResult.IAddOrderSucceed> = yield call(
      api.addOrder,
      items,
      totalAmount,
      date.toISOString()
    );

    yield put<R.IAddOrderSucceed>({
      type: ActionTypes.AddOrderSucceed,
      id: data.name,
      items,
      totalAmount,
      date,
    });
  } catch (error) {
    console.log('addOrder error message', error);
    yield put<R.IAddOrderFailed>({
      type: ActionTypes.AddOrderFailed,
      error,
    })
  }
}

function* getOrders(action: R.IGetOrders) {
  try {
    const {data}: AxiosResponse<FetchResult.IGetOrdersSucceed> = yield call(api.getOrders);
    const loadedOrders = [];

    for (const key in data) {
      loadedOrders.push(new Order(key, data[key].items, data[key].totalAmount, new Date(data[key].date)))
    }

    yield put<R.IGetOrdersSucceed>({
      type: ActionTypes.GetOrdersSucceed,
      orders: loadedOrders,
    });
  } catch (error) {
    console.log('getOrders error message', error);
    yield put<R.IGetOrdersFailed>({
      type: ActionTypes.GetOrdersFailed,
      error,
    })
  }
}

export default function* watchActions() {
  yield takeLatest(ActionTypes.AddOrder, addOrder);
  yield takeLatest(ActionTypes.GetOrders, getOrders);
}
