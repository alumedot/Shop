import React, { useCallback, useReducer } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import Input from 'components/UI/Input';
import Card from 'components/UI/Card';
import { Colors } from 'constants';
import { FormActions, InputIds, IFormAction } from '../../types';
import * as actionsAuth from 'store/auth/actions';
import { IFormState } from './types';

const formReducer = (state: IFormState, action: IFormAction) => {
  switch (action.type) {
    case FormActions.FormInputUpdate: {
      const updatedValues = {
        ...state.inputValues,
        [action.inputId]: action.value,
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.inputId]: action.isValid,
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }

      return {
        inputValues: updatedValues,
        inputValidities: updatedValidities,
        formIsValid: updatedFormIsValid,
      };
    }
    default:
      return state;
  }
};

const AuthScreen = () => {
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const onSignUp = () => {
    const {email, password} = formState.inputValues;
    dispatch(actionsAuth.signUp(email, password));
  }

  const inputChangeHandler = useCallback((inputId: InputIds, value: string, isValid: boolean) => {
    dispatchFormState({
      type: FormActions.FormInputUpdate,
      value,
      isValid,
      inputId,
    });
  }, [dispatchFormState]);

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
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              required
              secureTextEntry
              minLength={5}
              autoCapitalize="none"
              id={InputIds.Password}
              label="Password"
              keyboardType="default"
              errorText="Please enter a valid password"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              <Button title="Login" color={Colors.Primary} onPress={onSignUp} />
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
