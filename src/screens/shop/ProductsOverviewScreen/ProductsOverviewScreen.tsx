import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { StackNavigationProp } from '@react-navigation/stack'

import { IRootReduxState } from 'store/types';

import { Colors, Screens } from 'constants';
import ProductItem from 'components/shop/ProductItem';
import HeaderButton from 'components/UI/HeaderButton';
import HeaderButtonMenu from 'components/UI/HeaderButtonMenu';

import * as cartActions from 'store/cart/actions';
import * as actionsProducts from 'store/products/actions';


const ProductsOverviewScreen = (props: { navigation: StackNavigationProp<any, any> }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const products = useSelector(({products}: IRootReduxState) => products.availableProducts);
  const isLoading = useSelector(({products}: IRootReduxState) => products.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      dispatch(actionsProducts.getProducts());
    })

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(actionsProducts.getProducts());
  }, [dispatch]);

  const onSelectItem = (id: string, title: string) => {
    props.navigation.navigate(
      Screens.ProductDetail,
      {
        productId: id,
        productTitle: title,
      }
    )
  };

  const refreshProducts = async () => {
    setIsRefreshing(true);
    await dispatch(actionsProducts.getProducts());
    setIsRefreshing(false);
  }

  if (isLoading && !isRefreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.Primary}/>
      </View>
    )
  }

  if (!isLoading && !products.length) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={refreshProducts}
      refreshing={isRefreshing}
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => onSelectItem(itemData.item.id, itemData.item.title)}
        >
          <Button
            color={Colors.Primary}
            title="View details"
            onPress={() => onSelectItem(itemData.item.id, itemData.item.title)}
          />
          <Button
            color={Colors.Primary}
            title="To cart"
            onPress={() => dispatch(cartActions.addToCart(itemData.item))}
          />
        </ProductItem>
      )}
    />
  )
};

export const screenOptions = (navData) => {
  return {
    headerTitle: 'All Products',
    headerLeft: () => <HeaderButtonMenu navData={navData}/>,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => navData.navigation.navigate(Screens.Cart)}
        />
      </HeaderButtons>
    ),
  }
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ProductsOverviewScreen;
