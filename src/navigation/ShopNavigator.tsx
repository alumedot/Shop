import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { DrawerIconProps } from 'react-navigation-drawer';

// screens
import ProductsOverviewScreen from 'screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from 'screens/shop/ProductDetailScreen';
import CartScreen from 'screens/shop/CartScreen';
import OrdersScreen from 'screens/shop/OrdersScreen';
import UserProductsScreen from 'screens/user/UserProductsScreen';
import EditProductScreen from 'screens/user/EditProductScreen';
import AuthScreen from 'screens/user/AuthScreen';
import StartupScreen from 'screens/StartupScreen';

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
    drawerIcon: (drawerConfig: DrawerIconProps) => (
      <Ionicons
        name={Platform.OS === 'android' ? androidIcon : iosIcon}
        size={23}
        color={drawerConfig.tintColor}
      />
    ),
  }
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: navOptions('md-cart', 'ios-cart'),
    defaultNavigationOptions: defaultNavOptions,
  });

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    navigationOptions: navOptions('md-list', 'ios-list'),
    defaultNavigationOptions: defaultNavOptions,
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen,
  },
  {
    navigationOptions: navOptions('md-create', 'ios-create'),
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.Primary,
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  },
)

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
