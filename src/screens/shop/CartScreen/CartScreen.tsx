import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { IRootReduxState } from 'store/types';

import Card from 'components/UI/Card';

import { Colors, Fonts } from 'constants';

import * as actionsCart from 'store/cart/actions';
import * as actionsOrders from 'store/orders/actions';

import CartItem from 'components/shop/CartItem';
import { IOrderItem } from 'store/orders/types/instance';

const CartScreen = () => {
  const cartTotalAmount = useSelector(({cart}: IRootReduxState) => cart.totalAmount);
  const loading = useSelector(({orders}: IRootReduxState) => orders.loading);
  const cartItems = useSelector(({cart}: IRootReduxState) => {
    const transformedCartItems: IOrderItem[] = [];
    for (const key in cart.items) {
      transformedCartItems.push({
        id: key,
        title: cart.items[key].title,
        price: cart.items[key].price,
        quantity: cart.items[key].quantity,
        sum: cart.items[key].sum,
        ownerPushToken: cart.items[key].ownerPushToken,
      })
    }
    return transformedCartItems.sort((a, b) => a.id > b.id ? 1 : -1);
  });
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>
          ${Math.round(Number(cartTotalAmount.toFixed(2)) * 100) / 100}
        </Text>
        </Text>
        {
          loading ? (
            <ActivityIndicator size="small" color={Colors.Primary} />
          ) : (
            <Button
              color={Colors.Accent}
              title="Order now"
              onPress={() => dispatch(actionsOrders.addOrder(cartItems, cartTotalAmount))}
              disabled={cartItems.length === 0}
            />
          )
        }
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <CartItem
            deletable
            quantity={itemData.item.quantity}
            title={itemData.item.title}
            sum={itemData.item.sum}
            onRemove={() => dispatch(actionsCart.removeFromCart(itemData.item.id))}
          />
        )}
      />
    </View>
  )
};

export const screenOptions = {
  headerTitle: 'Your cart',
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
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
