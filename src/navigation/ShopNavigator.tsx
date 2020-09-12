import React from 'react';
import { useDispatch } from 'react-redux';
import { Platform, Button, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import * as actionAuth from 'store/auth/actions';

// screens
import ProductsOverviewScreen, { screenOptions as productsOverviewScreenOptions } from 'screens/shop/ProductsOverviewScreen';
import ProductDetailScreen, { screenOptions as productDetailScreenOptions } from 'screens/shop/ProductDetailScreen';
import CartScreen, { screenOptions as cartScreenOptions } from 'screens/shop/CartScreen';
import OrdersScreen, { screenOptions as ordersScreenOptions } from 'screens/shop/OrdersScreen';
import UserProductsScreen, { screenOptions as userProductsScreenOptions } from 'screens/user/UserProductsScreen';
import EditProductScreen, { screenOptions as editProductScreenOptions } from 'screens/user/EditProductScreen';
import AuthScreen, { screenOptions as authScreenOptions } from 'screens/user/AuthScreen';

import { Colors, Fonts } from 'constants';


const defaultNavOptions = {
  cardStyle: {
    backgroundColor: 'white',
  },
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.Primary : '',
  },
  headerTitleStyle: {
    fontFamily: Fonts.OpenSansBold,
  },
  headerBackTitleStyle: {
    fontFamily: Fonts.OpenSans,
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.Primary,
};

const navOptions = (androidIcon: string, iosIcon: string) => {
  return {
    drawerIcon: (props) => (
      <Ionicons
        name={Platform.OS === 'android' ? androidIcon : iosIcon}
        size={23}
        color={props.tintColor}
      />
    ),
  }
};

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={productsOverviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={productDetailScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={cartScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
        name="Orders"
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
}

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminStackNavigator.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={userProductsScreenOptions}
      />
      <AdminStackNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  )
}

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();

  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={props => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={Colors.Primary}
                onPress={() => {
                  dispatch(actionAuth.logout());
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{activeTintColor: Colors.Primary}}
    >
      <ShopDrawerNavigator.Screen
        name="Products"
        component={ProductsNavigator}
        options={navOptions('md-cart', 'ios-cart')}
      />
      <ShopDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={navOptions('md-list', 'ios-list')}
      />
      <ShopDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
        options={navOptions('md-create', 'ios-create')}
      />
    </ShopDrawerNavigator.Navigator>
  )
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  )
}
