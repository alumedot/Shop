import React from 'react';
import { Alert, Button, FlatList, Text, View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationStackScreenProps } from 'react-navigation-stack';

import { IRootReduxState } from 'store/types';
import ProductItem from 'components/shop/ProductItem';
import HeaderButtonMenu from 'components/UI/HeaderButtonMenu';
import HeaderButtonBase from 'components/UI/HeaderButtonBase';
import { Colors, Screens } from 'constants';

import * as actionsProducts from 'store/products/actions';

import { IProps } from './types';


const UserProductsScreen = (props: IProps) => {
  const userProducts = useSelector(({products}: IRootReduxState) => products.userProducts);
  const dispatch = useDispatch();

  const onEditProduct = (id: string) => {
    props.navigation.navigate(Screens.EditProduct, {productId: id});
  };

  const onDelete = (id: string) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      {text: 'Nope', style: 'default'},
      {
        text: 'Yep',
        style: 'destructive',
        onPress: () => dispatch(actionsProducts.deleteProduct(id))
      },
    ])
  };

  if (!userProducts.length) {
    return (
      <View style={styles.noProductsContainer}>
        <Text>No products found, try to create some!</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => onEditProduct(itemData.item.id)}
        >
          <Button
            color={Colors.Primary}
            title="Edit"
            onPress={() => onEditProduct(itemData.item.id)}
          />
          <Button
            color={Colors.Primary}
            title="Delete"
            onPress={() => onDelete(itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  )
};

UserProductsScreen.navigationOptions = (navData: NavigationStackScreenProps) => {
  return {
    headerTitle: 'Your products',
    headerLeft: () => <HeaderButtonMenu navData={navData}/>,
    headerRight: () => (
      <HeaderButtonBase
        title="Add"
        iconIos="ios-create"
        iconAndroid="md-create"
        onPress={() => navData.navigation.navigate(Screens.EditProduct)}
      />
    )
  };
};

const styles = StyleSheet.create({
  noProductsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default UserProductsScreen;
