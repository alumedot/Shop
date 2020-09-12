import React from 'react';
import { ScrollView, View, Image, Button, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { IRootReduxState } from 'store/types';
import * as cartActions from 'store/cart/actions';

import { Colors, Fonts } from 'constants';

import { RootStackNavigatorProps } from 'src/screens/types';

type EditProductScreenNavigationProp = StackNavigationProp<RootStackNavigatorProps, 'ProductDetail'>

type ProductDetailProps = {
  route: RouteProp<RootStackNavigatorProps, 'ProductDetail'>;
  navigation: EditProductScreenNavigationProp;
}

const ProductDetailScreen = (props: ProductDetailProps) => {
  const productId = props.route.params.productId;
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

export const screenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.productTitle,
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
