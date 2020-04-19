import { AxiosResponse } from 'axios';
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';

import { Product } from 'models/product';

import api from './api';
import * as R from './types/redux';
import * as FetchResult from './types/fetchResult';
import { ActionTypes } from './types/ActionTypes';


function* createProduct(action: R.ICreateProduct) {
  try {
    const {title, description, url, price} = action.productData;
    const {data}: AxiosResponse<FetchResult.ICreateProductSucceed> = yield call(api.createProduct, title, description, url, price);

    yield put<R.ICreateProductSucceed>({
      type: ActionTypes.CreateProductSucceed,
      productData: {
        id: data.name,
        title,
        description,
        price,
        url,
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
    const {title, description, url} = action.productData;
    yield call(
      api.updateProduct,
      action.id,
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
    const {id} = action;
    yield call(api.deleteProduct, id);

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
  try {
    const {data}: AxiosResponse<FetchResult.IGetProducts> = yield call(api.getProducts);
    const loadedProducts = [];

    for (const key in data) {
      const {title, imageUrl, description, price} = data[key];
      loadedProducts.push(new Product(key, 'u1', title, imageUrl, description, price))
    }

    yield put<R.IGetProductsSucceed>({
      type: ActionTypes.GetProductsSucceed,
      products: loadedProducts,
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
