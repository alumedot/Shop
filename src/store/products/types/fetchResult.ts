import { AxiosError } from 'axios';

import { IProduct } from '../../instance';


export interface IGetProducts {
    [key:string]: IProduct;
}

export interface ICreateProductSucceed {
    name: string;
}

export interface ICreateProductSucceed {
    error: AxiosError;
}
