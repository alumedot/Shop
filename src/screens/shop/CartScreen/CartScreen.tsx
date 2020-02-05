import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { IRootReduxState } from 'store/types';

import { shadowStyles } from 'helpers/styles';

import { Colors, Fonts } from 'constants';

import CartItem from 'components/shop/CartItem';


const CartScreen = (props) => {
  const cartTotalAmount = useSelector(({cart}: IRootReduxState) => cart.totalAmount);
  const cartItems = useSelector(({cart}: IRootReduxState) => {
    const transformedCartItems = [];
    for (const key in cart.items) {
      transformedCartItems.push({
        id: key,
        title: cart.items[key].title,
        price: cart.items[key].price,
        quantity: cart.items[key].quantity,
        sum: cart.items[key].sum,
      })
    }
    return transformedCartItems;
  });

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          color={Colors.Accent}
          title="Order now"
          onPress={() => {}}
          disabled={cartItems.length === 0}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.title}
            sum={itemData.item.sum}
            onRemove={() => {}}
          />
        )}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    ...shadowStyles,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 18,
  },
  amount: {
    color: Colors.Primary,
  },
});

export default CartScreen;
