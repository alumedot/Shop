import { fork } from 'redux-saga/effects';

import products from './products/saga';
import orders from './orders/saga';


export default function* saga() {
    yield fork(products);
    yield fork(orders);
}
