import axios from 'axios';

import { url } from 'config';

import { ICreateProductSucceed } from './types/fetchResult';


export default {
  async createProduct(
    token: string,
    ownerId: string,
    title: string,
    description: string,
    imageUrl: string,
    price: number,
  ): Promise<ICreateProductSucceed> {
    return await axios.post(url + 'products.json?auth=' + token,
      {
        title,
        description,
        imageUrl,
        price,
        ownerId,
      }
    );
  },

  async getProducts() {
    return await axios.get(url + 'products.json');
  },

  async updateProduct(
    id: string,
    token: string,
    title: string,
    description: string,
    imageUrl: string
  ) {
    return await axios.patch(url + `products/${id}.json?auth=` + token, {
      title,
      description,
      imageUrl,
    })
  },

  async deleteProduct(id: string, token: string) {
    return await axios.delete(url + `products/${id}.json?auth=` + token);
  }
}
