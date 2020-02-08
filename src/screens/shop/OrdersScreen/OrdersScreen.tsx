import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationStackScreenProps } from 'react-navigation-stack';

import { IRootReduxState } from 'store/types';
import HeaderButtonMenu from 'components/UI/HeaderButtonMenu';
import OrderItem from 'components/shop/OrderItem';


const OrderScreen = () => {
    const orders = useSelector(({orders}: IRootReduxState) =>  orders.orders);

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
        headerLeft: () => <HeaderButtonMenu navData={navData} />,
    }
};

export default OrderScreen;
