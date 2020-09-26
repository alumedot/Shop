import axios from 'axios';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

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
    let pushToken;
    let statusObj = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (statusObj.status !== 'granted') {
      statusObj = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
    if (statusObj.status !== 'granted') {
      pushToken = null
    } else {
      pushToken = (await Notifications.getExpoPushTokenAsync()).data;
    }
    return await axios.post(url + 'products.json?auth=' + token,
      {
        title,
        description,
        imageUrl,
        price,
        ownerId,
        ownerPushToken: pushToken,
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
