import React from 'react';
import { FlatList, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackScreenProps } from 'react-navigation-stack';

import { IRootReduxState } from 'store/types';

import { Screens } from 'constants';
import ProductItem from 'components/shop/ProductItem';
import HeaderButton from 'components/UI/HeaderButton';

import * as cartActions from 'store/cart/actions';

import { IProps } from './types';


const ProductsOverviewScreen = (props: IProps) => {
    const products = useSelector((state: IRootReduxState) => state.products.availableProducts);
    const dispatch = useDispatch();

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onViewDetail={() => props.navigation.navigate(
                        Screens.ProductDetail,
                        {
                            productId: itemData.item.id,
                            productTitle: itemData.item.title,
                        }
                    )}
                    onAddToCart={() => dispatch(cartActions.addToCart(itemData.item))}
                />
            )}
        />
    )
};

ProductsOverviewScreen.navigationOptions = (navData: NavigationStackScreenProps) => {
    return {
        headerTitle: 'All Products',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => navData.navigation.toggleDrawer()}
                />
            </HeaderButtons>
        ),
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

export default ProductsOverviewScreen;
