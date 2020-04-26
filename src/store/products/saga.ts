import { AxiosResponse } from 'axios';
import { call, put, takeLatest, takeEvery, select } from 'redux-saga/effects';

import { Product } from 'models/product';

import { authData } from '../helpers';
import api from './api';
import * as R from './types/redux';
import * as FetchResult from './types/fetchResult';
import { ActionTypes } from './types/ActionTypes';


function* createProduct(action: R.ICreateProduct) {
  try {
    const {title, description, url, price} = action.productData;
    const {token, userId} = yield select(authData);
    const {data}: AxiosResponse<FetchResult.ICreateProductSucceed> = yield call(
      api.createProduct,
      token,
      userId,
      title,
      description,
      url,
      price,
    );

    yield put<R.ICreateProductSucceed>({
      type: ActionTypes.CreateProductSucceed,
      productData: {
        id: data.name,
        title,
        description,
        price,
        url,
        ownerId: userId,
      },
    });
  } catch (error) {
    console.log('createProduct error message', error);
    yield put<R.ICreateProductFailed>({
      type: ActionTypes.CreateProductFailed,
      error,
    })
  }
}

function* updateProduct(action: R.IUpdateProduct) {
  try {
    const {token} = yield select(authData);
    const {title, description, url} = action.productData;
    yield call(
      api.updateProduct,
      action.id,
      token,
      title,
      description,
      url,
    );

    yield put<R.IUpdateProductSucceed>({
      type: ActionTypes.UpdateProductSucceed,
    });
  } catch (error) {
    console.log('updateProduct error message', error);
    yield put<R.IUpdateProductFailed>({
      type: ActionTypes.UpdateProductFailed,
      error,
    })
  }
}

function* deleteProduct(action: R.IDeleteProduct) {
  try {
    const {token} = yield select(authData);
    const {id} = action;
    yield call(api.deleteProduct, id, token);

    yield put<R.IUpdateProductSucceed>({
      type: ActionTypes.UpdateProductSucceed,
    });
  } catch (error) {
    console.log('deleteProduct error message', error);
    yield put<R.IDeleteProductFailed>({
      type: ActionTypes.DeleteProductFailed,
      error,
    })
  }
}

function* getProducts(action: R.IGetProducts) {
  const {meta} = action;
  const {userId} = yield select(authData);
  try {
    const {data}: AxiosResponse<FetchResult.IGetProducts> = yield call(api.getProducts);
    const loadedProducts = [];

    for (const key in data) {
      const {ownerId, title, imageUrl, description, price} = data[key];
      loadedProducts.push(new Product(key, ownerId, title, imageUrl, description, price))
    }

    yield put<R.IGetProductsSucceed>({
      type: ActionTypes.GetProductsSucceed,
      products: loadedProducts,
      userProducts: loadedProducts.filter(product => product.ownerId === userId),
      meta,
    })
  } catch (error) {
    console.log('getProducts error message', error);
    yield put<R.IGetProductsFailed>({
      type: ActionTypes.GetProductsFailed,
      error: error.message,
      meta,
    })
  }
}


export default function* watchActions() {
  yield takeLatest(ActionTypes.CreateProduct, createProduct);
  yield takeLatest(ActionTypes.UpdateProduct, updateProduct);
  yield takeLatest(ActionTypes.DeleteProduct, deleteProduct);
  yield takeEvery(ActionTypes.GetProducts, getProducts);
}
