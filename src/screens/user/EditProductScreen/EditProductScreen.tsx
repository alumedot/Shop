import React, { useCallback, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';

import { IRootReduxState } from 'store/types';

import { Fonts } from 'constants';
import HeaderButtonBase from 'components/UI/HeaderButtonBase';

import * as actionsProducts from 'store/products/actions';

import { IParams, IProps } from './types';
import { FormActions, IFormAction, IFormState, InputIds } from './form';


const formReducer = (state: IFormState, action: IFormAction): IFormState => {
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
        default: return state;
    }
};

const EditProductScreen = (props: IProps) => {
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(({products}: IRootReduxState) => {
        return products.userProducts.find(product => product.id === prodId)
    });
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct?.title || '',
            url: editedProduct?.imageUrl || '',
            description: editedProduct?.description || '',
            price: 0,
        },
        inputValidities: {
            title: !!editedProduct,
            url: !!editedProduct,
            description: !!editedProduct,
            price: !!editedProduct,
        },
        formIsValid: !!editedProduct,
    });

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please check the errors in the form', [
                {text: 'Oki-doki'},
            ]);
            return;
        }

        const {title, url, price, description} = formState.inputValues;
        editedProduct ?
            dispatch(actionsProducts.updateProduct(prodId, title, description, url)) :
            dispatch(actionsProducts.createProduct(title, description, url, +price));

        props.navigation.goBack();
    }, [dispatch, prodId, formState]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    const textChangeHandler = (inputId: InputIds, text: string) => {
        dispatchFormState({
            type: FormActions.FormInputUpdate,
            value: text,
            isValid: !!text.trim(),
            inputId,
        });
    };

    const { inputValues } = formState;

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={inputValues.title}
                        onChangeText={text => textChangeHandler(InputIds.Title, text)}
                        keyboardType="default"
                        autoCapitalize="sentences"
                        returnKeyType="next"
                        onSubmitEditing={() => console.log('Doggy')}
                        autoCorrect
                    />
                    {
                        !formState.inputValidities.title && <Text>Please enter a valid title</Text>
                    }
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        value={inputValues.url}
                        onChangeText={text => textChangeHandler(InputIds.Url, text)}
                    />
                </View>
                {
                    !editedProduct && (
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Price</Text>
                            <TextInput
                                style={styles.input}
                                value={inputValues.price ? inputValues.price.toString() : ''}
                                onChangeText={text => textChangeHandler(InputIds.Price, text)}
                                keyboardType="decimal-pad"
                            />
                        </View>
                    )
                }
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={inputValues.description}
                        onChangeText={text => textChangeHandler(InputIds.Description, text)}
                    />
                </View>
            </View>
        </ScrollView>
    )
};

EditProductScreen.navigationOptions = (navData: NavigationStackScreenProps<IParams>) => {
    const submitHandler = navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('productId') ?
            'Edit product' : 'Add product',
        headerRight: () => (
            <HeaderButtonBase
                title="Save"
                iconIos="ios-checkmark"
                iconAndroid="md-checkmark"
                onPress={submitHandler}
            />
        ),
    }
};

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
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

export default EditProductScreen;
