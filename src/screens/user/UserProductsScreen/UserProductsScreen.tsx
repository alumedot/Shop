import React from 'react';
import { Button, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationStackScreenProps } from 'react-navigation-stack';

import { IRootReduxState } from 'store/types';
import ProductItem from 'components/shop/ProductItem';
import HeaderButtonMenu from 'components/UI/HeaderButtonMenu';
import { Colors } from 'constants';

import * as actionsProducts from 'store/products/actions';


const UserProductsScreen = () => {
    const userProducts = useSelector(({products}: IRootReduxState) => products.userProducts);
    const dispatch = useDispatch();

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {}}
                >
                    <Button
                        color={Colors.Primary}
                        title="Edit"
                        onPress={() => {}}
                    />
                    <Button
                        color={Colors.Primary}
                        title="Delete"
                        onPress={() => dispatch(actionsProducts.deleteProduct(itemData.item.id))}
                    />
                </ProductItem>
            )}
        />
    )
};

UserProductsScreen.navigationOptions = (navData: NavigationStackScreenProps) => {
    return {
        headerTitle: 'Your products',
        headerLeft: () => <HeaderButtonMenu navData={navData} />
    };
};

export default UserProductsScreen;
