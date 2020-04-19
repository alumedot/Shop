import { fork } from 'redux-saga/effects';

import products from './products/saga';
import orders from './orders/saga';
import auth from './auth/saga';


export default function* saga() {
    yield fork(products);
    yield fork(orders);
    yield fork(auth);
}
