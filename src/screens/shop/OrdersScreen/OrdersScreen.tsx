import React, { useEffect } from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { IRootReduxState } from 'store/types';
import HeaderButtonMenu from 'components/UI/HeaderButtonMenu';
import OrderItem from 'components/shop/OrderItem';
import * as actionsOrders from 'store/orders/actions';
import { Colors } from 'constants';

const OrderScreen = () => {
  const orders = useSelector(({orders}: IRootReduxState) => orders.orders);
  const loading = useSelector(({orders}: IRootReduxState) => orders.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionsOrders.getOrders());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator size="large" color={Colors.Primary} />
      </View>
    );
  }

  if (!orders.length) {
    return (
      <View style={styles.noOrdersContainer}>
        <Text>No orders found, try to order some!</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={itemData => itemData.id}
      renderItem={itemData => (
        <OrderItem
          items={itemData.item.items}
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
        />
      )}
    />
  )
};

export const screenOptions = (navData) => {
  return {
    headerTitle: 'Your orders',
    headerLeft: () => <HeaderButtonMenu navData={navData}/>,
  }
};

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noOrdersContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default OrderScreen;
