import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';
import { Colors } from 'constants';
import { INavProps } from './types';
import { authenticate, setDidTryAL } from 'store/auth/actions';

const StartupScreen = (props: INavProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        dispatch(setDidTryAL());
        // props.navigation.navigate('Auth');
        return;
      }
      const transformedData = JSON.parse(userData as string);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        dispatch(setDidTryAL());
        // props.navigation.navigate('Auth');
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      // props.navigation.navigate('Shop');
      dispatch(authenticate(userId, token, expirationTime))
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.Primary} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default StartupScreen;
