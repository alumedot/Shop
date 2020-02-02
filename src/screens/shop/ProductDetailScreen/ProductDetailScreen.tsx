import React from 'react';
import { ScrollView, View, Image, Button, Text, StyleSheet } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';


import { IRootReduxState } from 'store/types';
import * as cartActions from 'store/cart/actions';

import { Colors, Fonts } from 'constants';

import { IParams } from './types';
import { NavigationInjectedProps } from 'react-navigation';


const ProductDetailScreen = (props: NavigationInjectedProps<IParams>) => {
  const productId = props.navigation.getParam('productId');
  const selectedProduct = useSelector(
    ({products}: IRootReduxState) => products.availableProducts
      .find(product => product.id === productId)
  );
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: selectedProduct?.imageUrl}} />
      <View style={styles.actions}>
        <Button
          color={Colors.Primary}
          title="Add to Cart"
          onPress={() => dispatch(cartActions.addToCart(selectedProduct!))}
        />
      </View>
      <Text style={styles.price}>
        ${selectedProduct?.price.toFixed(2)}
      </Text>
      <Text style={styles.description}>
        {selectedProduct?.description}
      </Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = (navData: NavigationStackScreenProps<Partial<IParams>>) => {
  return {
    headerTitle: navData.navigation.getParam('productTitle'),
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
  price: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontFamily: Fonts.OpenSans,
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default ProductDetailScreen;
