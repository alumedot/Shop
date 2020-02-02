import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// screens
import ProductsOverviewScreen  from 'screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from 'screens/shop/ProductDetailScreen';

import { Colors, Fonts } from 'constants';


const ProductsNavigator = createStackNavigator({
  ProductsOverview: ProductsOverviewScreen,
  ProductDetail: ProductDetailScreen,
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.Primary : '',
    },
    headerTitleStyle: {
      fontFamily: Fonts.OpenSansBold,
    },
    headerBackTitleStyle: {
      fontFamily: Fonts.OpenSansBold,
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.Primary,
  }
});

export default createAppContainer(ProductsNavigator);
