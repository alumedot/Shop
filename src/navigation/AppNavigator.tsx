import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { ShopNavigator, AuthNavigator } from 'navigation/ShopNavigator';
import { IRootReduxState } from 'store/types';
import StartupScreen from 'screens/StartupScreen';

const AppNavigator = () => {
  const { token, didTryAutoLogin } = useSelector((state: IRootReduxState) => state.auth);

  return (
    <NavigationContainer>
      { !!token && <ShopNavigator/> }
      { !token && didTryAutoLogin && <AuthNavigator/> }
      { !token && !didTryAutoLogin && <StartupScreen/> }
    </NavigationContainer>
  );
};

export default AppNavigator;
