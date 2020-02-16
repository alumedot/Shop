import { call, put, takeLatest } from 'redux-saga/effects';

import api from './api';
import * as R from './types/redux';
import * as FetchResult from './types/fetchResult';
import { ActionTypes } from './types/ActionTypes';
import { AxiosResponse } from 'axios';


function* createProduct(action: R.ICreateProduct) {
    try {
        const { title, description, url, price} = action.productData;
        const { data }: AxiosResponse<FetchResult.ICreateProductSucceed> = yield call(api.createProduct, title, description, url, price);

        yield put<R.ICreateProductSucceed>({
            type: ActionTypes.CreateProductSucceed,
            name: data.name,
        });
    } catch (error) {
        console.log(error);
        yield put<R.ICreateProductFailed>({
            type: ActionTypes.CreateProductFailed,
            error,
        })
    }
}

export default function* watchActions() {
    yield takeLatest(ActionTypes.CreateProduct, createProduct);
}
