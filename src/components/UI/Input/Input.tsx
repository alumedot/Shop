import React, { useReducer, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Fonts } from 'constants';

import { emailRegex } from './constants';
import { IProps, IReducerState, Actions, IAction } from './types';


const inputReducer = (state: IReducerState, action: IAction) => {
    switch (action.type) {
        case Actions.InputChange: {
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        }
        case Actions.InputBlur: {
            return {
                ...state,
                touched: true,
            }
        }
        default: return state;
    }
};

const Input = (props: IProps) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '',
        isValid: props.initiallyValid || false,
        touched: false,
    });

    const { onInputChange, id } = props;

    useEffect(() => {
        inputState.touched && onInputChange(id, inputState.value, inputState.isValid);
    }, [inputState, onInputChange, id]);

    const textChangeHandler = (text: string) => {
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

    const onLostFocus = () => {
        dispatch({
            type: Actions.InputBlur,
        });
    };

    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                {...props}
                style={styles.input}
                value={inputState.value}
                onChangeText={textChangeHandler}
                onBlur={onLostFocus}
            />
            {
                !inputState.isValid && inputState.touched && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{props.errorText}</Text>
                    </View>
                )
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
    errorContainer: {
        marginVertical: 5,
    },
    errorText: {
        fontFamily: Fonts.OpenSans,
        color: 'red',
        fontSize: 14,
    },
});

export default Input;
