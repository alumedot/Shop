import React from 'react';
import { FlatList, Platform, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackScreenProps } from 'react-navigation-stack';

import { IRootReduxState } from 'store/types';
import HeaderButton from 'components/UI/HeaderButton/HeaderButton';


const OrderScreen = () => {
    const orders = useSelector(({orders}: IRootReduxState) =>  orders.orders);

    return (
        <FlatList
            data={orders}
            keyExtractor={itemData => itemData.id}
            renderItem={itemData => <Text>{itemData.item.totalAmount}</Text>}
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
