import React, { useCallback, useReducer, useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Button,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import { IRootReduxState } from 'store/types';
import Input from 'components/UI/Input';
import Card from 'components/UI/Card';
import { Colors } from 'constants';
import { FormActions, InputIds, IFormAction } from '../../types';
import * as actionsAuth from 'store/auth/actions';
import { INavProps } from '../../types';
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

const AuthScreen = (props: INavProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const error = useSelector(({auth}: IRootReduxState) => auth.error)
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

  useEffect(() => {
    let message;
    switch (error) {
      // login
      case 'EMAIL_NOT_FOUND': message = 'This email could not be found!';
        break;
      case 'INVALID_PASSWORD': message = 'This password is not valid!';
        break;

      // sign up
      case 'EMAIL_EXISTS': message = 'This email already exists!';
        break;
      default: message = 'Something went wrong!';
    }

    error && Alert.alert('An Error Occurred', message, [{ text: 'Okay' }]);
    setIsLoading(false);
  }, [error])

  const onAuth = async () => {
    setIsLoading(true);
    const {email, password} = formState.inputValues;
    isSignUp ?
      await dispatch(actionsAuth.signUp(email, password)) :
      await dispatch(actionsAuth.login(email, password));
    setIsLoading(false);
    // !error && props.navigation.navigate('Shop');
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
              {
                isLoading ? <ActivityIndicator size='small' color={Colors.Primary} /> : (
                  <Button
                    title={isSignUp ? 'Sign Up' : 'Login'}
                    color={Colors.Primary}
                    onPress={onAuth}
                  />
                )
              }
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignUp ? 'Login' : 'Sign Up'}`}
                color={Colors.Accent}
                onPress={() => setIsSignUp(prevState => !prevState)}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  )
}

export const screenOptions = {
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
