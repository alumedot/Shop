import React, { useEffect } from 'react';
import { View, Text, Button, FlatList, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackScreenProps } from 'react-navigation-stack';

import { IRootReduxState } from 'store/types';

import { Colors, Screens } from 'constants';
import ProductItem from 'components/shop/ProductItem';
import HeaderButton from 'components/UI/HeaderButton';
import HeaderButtonMenu from 'components/UI/HeaderButtonMenu';

import * as cartActions from 'store/cart/actions';
import * as actionsProducts from 'store/products/actions';

import { IProps } from './types';


const ProductsOverviewScreen = (props: IProps) => {
  const products = useSelector(({products}: IRootReduxState) => products.availableProducts);
  const isLoading = useSelector(({products}: IRootReduxState) => products.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus', () => {
      dispatch(actionsProducts.getProducts());
    })

    return () => {
      willFocusSub.remove();
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

  if (isLoading) {
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

ProductsOverviewScreen.navigationOptions = (navData: NavigationStackScreenProps) => {
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
