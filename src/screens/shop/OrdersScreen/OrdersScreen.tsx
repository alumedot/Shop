import React, { useEffect } from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationStackScreenProps } from 'react-navigation-stack';

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

OrderScreen.navigationOptions = (navData: NavigationStackScreenProps) => {
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
})

export default OrderScreen;
