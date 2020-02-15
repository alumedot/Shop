import React, { useState } from 'react';

// Redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import productsReducer from './src/store/products/reducer';
import cartReducer from './src/store/cart/reducer';
import ordersReducer from './src/store/orders/reducer';

import ShopNavigator from './src/navigation/ShopNavigator';


const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/Fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/Fonts/OpenSans-Bold.ttf'),
  });
};

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(ReduxThunk),
    )
);

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  return fontLoaded ? (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  ) : (
    <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontLoaded(true)}
    />
  )
}
