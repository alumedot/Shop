import React from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { IRootReduxState } from 'store/types';

import { Screens } from 'constants';
import ProductItem from 'components/shop/ProductItem';

import * as cartActions from 'store/cart/actions';

import { IProps } from './types';


const ProductsOverviewScreen = (props: IProps) => {
  const products = useSelector((state: IRootReduxState) => state.products.availableProducts);
  const dispatch = useDispatch();

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => props.navigation.navigate(
            Screens.ProductDetail,
            {
              productId: itemData.item.id,
              productTitle: itemData.item.title,
            }
          )}
          onAddToCart={() => dispatch(cartActions.addToCart(itemData.item))}
        />
      )}
    />
  )
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products',
};

export default ProductsOverviewScreen;
