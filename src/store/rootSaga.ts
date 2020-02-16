import { fork } from 'redux-saga/effects';

import products from './products/saga';


export default function* saga() {
    yield fork(products);
}
