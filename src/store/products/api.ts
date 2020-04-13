import axios from 'axios';

import { url } from 'config';

import { ICreateProductSucceed } from './types/fetchResult';


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

  async getProducts() {
    return await axios.get(url + 'products.json');
  },

  async updateProduct(id: string, title: string, description: string, imageUrl: string) {
    return await axios.patch(url + `products/${id}.json`, {
      title,
      description,
      imageUrl,
    })
  },

  async deleteProduct(id: string) {
    return await axios.delete(url + `products/${id}.json`);
  }
}
