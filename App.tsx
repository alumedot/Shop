import React, { useState } from 'react';

// Redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { middleware as thunkMiddleware } from 'redux-saga-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Expo
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import ErrorHandler from './src/components/helpers/ErrorHandler';

// Reducers
import productsReducer from './src/store/products/reducer';
import cartReducer from './src/store/cart/reducer';
import ordersReducer from './src/store/orders/reducer';

// Navigator
import ShopNavigator from './src/navigation/ShopNavigator';

// Saga
import saga from './src/store/rootSaga';


const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/Fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/Fonts/OpenSans-Bold.ttf'),
  });
};

const sagaMiddleware = createSagaMiddleware();
const middlewares = [
  thunkMiddleware,
  sagaMiddleware
];

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middlewares),
  )
);

sagaMiddleware.run(saga);

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  return fontLoaded ? (
    <Provider store={store}>
      <ErrorHandler>
        <ShopNavigator/>
      </ErrorHandler>
    </Provider>
  ) : (
    <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontLoaded(true)}
    />
  )
}
