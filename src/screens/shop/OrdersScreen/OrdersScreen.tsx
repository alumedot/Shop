import React from 'react';
import { FlatList, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackScreenProps } from 'react-navigation-stack';

import { IRootReduxState } from 'store/types';
import HeaderButton from 'components/UI/HeaderButton/HeaderButton';
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
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => navData.navigation.toggleDrawer()}
                />
            </HeaderButtons>
        ),
    }
};

export default OrderScreen;
