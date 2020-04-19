import React from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Button, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { InputIds } from 'screens/user/EditProductScreen/form';
import Input from 'components/UI/Input';
import Card from 'components/UI/Card';
import { Colors } from 'constants';

const AuthScreen = () => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              required
              email
              autoCapitalize="none"
              id={InputIds.Email}
              label="E-mail"
              keyboardType="email-address"
              errorText="Please enter a valid email address"
              onInputChange={() => {}}
              initialValue=""
            />
            <Input
              required
              email
              secureTextEntry
              minLength={5}
              autoCapitalize="none"
              id={InputIds.Password}
              label="Password"
              keyboardType="default"
              errorText="Please enter a valid password"
              onInputChange={() => {}}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              <Button title="Login" color={Colors.Primary} onPress={() => {}} />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Switch to Sigh up" color={Colors.Accent} onPress={() => {}} />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  )
}

AuthScreen.navigationOptions = {
  headerTitle: 'Authentication',
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 10,
  }
});

export default AuthScreen;
