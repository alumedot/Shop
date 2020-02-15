import React, { useCallback, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, ScrollView, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';

import { IRootReduxState } from 'store/types';
import HeaderButtonBase from 'components/UI/HeaderButtonBase';
import Input from 'components/UI/Input';

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
            style={{ flex: 1 }}
            behavior="padding"
            keyboardVerticalOffset={100}
        >
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id={InputIds.Title}
                        label="Title"
                        errorText="Please enter a valid title"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.title : ''}
                        initiallyValid={!!editedProduct}
                        autoCorrect
                        required
                    />
                    <Input
                        id={InputIds.Url}
                        label="Image URL"
                        errorText="Please enter a valid image url"
                        keyboardType="default"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    {
                        !editedProduct && (
                            <Input
                                id={InputIds.Price}
                                label="Price"
                                errorText="Please enter a valid price"
                                keyboardType="decimal-pad"
                                returnKeyType="next"
                                onInputChange={inputChangeHandler}
                                min={0.1}
                                required
                            />
                        )
                    }
                    <Input
                        id={InputIds.Description}
                        label="Description"
                        errorText="Please enter a valid description"
                        keyboardType="default"
                        returnKeyType="next"
                        autoCapitalize="sentences"
                        numberOfLines={3}
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={!!editedProduct}
                        minLength={5}
                        autoCorrect
                        multiline
                        required
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
});

export default EditProductScreen;
