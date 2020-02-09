import React, { ElementType } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
    StyleSheet,
} from 'react-native';

import { Fonts } from 'constants';
import Card from 'components/UI/Card';

import { IProps } from './types';


const ProductItem = (props: IProps) => {
    const TouchableComponent: ElementType = Platform.OS === 'android' && Platform.Version >= 21 ?
        TouchableNativeFeedback : TouchableOpacity;

    return (
        <Card style={styles.product}>
            <View style={styles.touchable}>
                <TouchableComponent useForeground activeOpacity={0.6} onPress={props.onSelect}>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.image}
                                source={{uri: props.image}}
                            />
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                        </View>
                        <View style={styles.actions}>
                            {props.children}
                        </View>
                    </View>
                </TouchableComponent>
            </View>
        </Card>
    )
};

const styles = StyleSheet.create({
    product: {
        height: 300,
        margin: 20,
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    imageContainer: {
        overflow: 'hidden',
        width: '100%',
        height: '60%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    details: {
        alignItems: 'center',
        height: '17%',
        padding: 10,
    },
    title: {
        fontFamily: Fonts.OpenSansBold,
        fontSize: 18,
        marginVertical: 2,
    },
    price: {
        fontFamily: Fonts.OpenSans,
        fontSize: 14,
        color: '#888',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '23%',
        paddingHorizontal: 20,
    },
});

export default ProductItem;
