import { AxiosResponse } from 'axios';
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';

import { Product } from 'models/product';

import api from './api';
import * as R from './types/redux';
import * as FetchResult from './types/fetchResult';
import { ActionTypes } from './types/ActionTypes';


function* createProduct(action: R.ICreateProduct) {
    try {
        const { title, description, url, price} = action.productData;
        const { data }: AxiosResponse<FetchResult.ICreateProductSucceed> = yield call(api.createProduct, title, description, url, price);

        yield put<R.ICreateProductSucceed>({
            type: ActionTypes.CreateProductSucceed,
            name: data.name,
        });
    } catch (error) {
        console.log('createProduct error message', error);
        yield put<R.ICreateProductFailed>({
            type: ActionTypes.CreateProductFailed,
            error,
        })
    }
}

function* getProducts() {
    try {
        const { data }: AxiosResponse<FetchResult.IGetProducts> = yield call(api.getProducts);
        const loadedProducts = [];

        for (const key in data) {
            const {title, imageUrl, description, price} = data[key];
            loadedProducts.push(new Product(key, 'u1', title, imageUrl, description, price))
        }

        yield put<R.IGetProductsSucceed>({
            type: ActionTypes.GetProductsSucceed,
            products: loadedProducts,
        })
    } catch (error) {
        console.log('getProducts error message', error);
        yield put<R.IGetProductsFailed>({
            type: ActionTypes.GetProductsFailed,
            error: error.message,
        })
    }
}

export default function* watchActions() {
    yield takeLatest(ActionTypes.CreateProduct, createProduct);
    yield takeEvery(ActionTypes.GetProducts, getProducts);
}
