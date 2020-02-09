import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';

import { IRootReduxState } from 'store/types';

import { Fonts } from 'constants';
import HeaderButtonBase from 'components/UI/HeaderButtonBase';

import * as actionsProducts from 'store/products/actions';

import { IProps, IParams } from './types';


const EditProductScreen = (props: IProps) => {
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(({products}: IRootReduxState) => {
        return products.userProducts.find(product => product.id === prodId)
    });
    const dispatch = useDispatch();

    const [title, setTitle] = useState(editedProduct?.title || '');
    const [url, setUrl] = useState(editedProduct?.imageUrl || '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct?.description || '');

    const submitHandler = useCallback(() => {
        editedProduct ?
            dispatch(actionsProducts.updateProduct(prodId, title, description, url)) :
            dispatch(actionsProducts.createProduct(title, description, url, +price));
    }, [dispatch, prodId, title, url, price, description]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={text => setTitle(text)}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        value={url}
                        onChangeText={text => setUrl(text)}
                    />
                </View>
                {
                    !editedProduct && (
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Price</Text>
                            <TextInput
                                style={styles.input}
                                value={price}
                                onChangeText={text => setPrice(text)}
                            />
                        </View>
                    )
                }
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={text => setDescription(text)}
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
