import React, { useReducer } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { InputIds } from 'screens/user/EditProductScreen/form';
import { Fonts } from 'src/constants';

import { emailRegex } from './constants';
import { IProps, IReducerState, Actions, IAction } from './types';


const inputReducer = (state: IReducerState, action: IAction) => {
    switch (action.type) {
        case Actions.InputChange: {

        }
        default: return state;
    }
};

const Input = (props: IProps) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '',
        isValid: props.initiallyValid,
        touched: false,
    });

    const textChangeHandler = (text) => {
        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (props.min != null && +text < props.min) {
            isValid = false;
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }

        dispatch({ type: Actions.InputChange, value: text, isValid });
    };

    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                {...props}
                style={styles.input}
                value={inputValues.title}
                onChangeText={text => textChangeHandler(InputIds.Title, text)}
            />
            {
                !formState.inputValidities.title && <Text>{props.errorText}</Text>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    formControl: {
        width: '100%',
    },
    label: {
        fontFamily: Fonts.OpenSansBold,
        marginVertical: 8,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
});

export default Input;
