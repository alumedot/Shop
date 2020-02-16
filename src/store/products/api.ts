import axios from 'axios';

import { url } from 'config';

import { ICreateProductSucceed} from './types/fetchResult';


export default {
    async createProduct(title: string, description: string, imageUrl: string, price: number): Promise<ICreateProductSucceed> {
        return await axios.post(url + 'products.json',
            {
                title,
                description,
                imageUrl,
                price,
            }
        );
    },
}
