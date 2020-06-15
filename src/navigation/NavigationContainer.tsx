import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { IRootReduxState } from 'store/types';
import ShopNavigator from './ShopNavigator';

const NavigationContainer = () => {
  const navRef = useRef<any>(null);
  const isAuth = useSelector(({ auth }: IRootReduxState) => !!auth.token);

  useEffect(() => {
    !isAuth && navRef.current.dispatch(NavigationActions.navigate({
      routeName: 'Auth',
    }));
  }, [isAuth])

  return <ShopNavigator ref={navRef} />
};

export default NavigationContainer;
