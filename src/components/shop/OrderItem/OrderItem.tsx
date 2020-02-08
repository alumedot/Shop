import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';

import { Colors, Fonts } from 'constants';
import { shadowStyles } from 'helpers/styles';

import CartItem from '../CartItem';

import { IProps } from './types';


const OrderItem = (props: IProps) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button
                color={showDetails ? Colors.Accent : Colors.Primary}
                title={showDetails ? "Hide details" : "Show Details"}
                onPress={() => setShowDetails(prevState => !prevState)}
            />
            <View style={styles.detailItems}>
                <Collapsible collapsed={!showDetails}>
                    {props.items.map(item => (
                        <CartItem
                            key={item.id}
                            quantity={item.quantity}
                            title={item.title}
                            sum={item.sum}
                        />
                    ))}
                </Collapsible>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    orderItem: {
        ...shadowStyles,
        margin: 20,
        padding: 10,
        alignItems: 'center',
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    amount: {
        fontFamily: Fonts.OpenSansBold,
        fontSize: 16,
    },
    date: {
        fontFamily: Fonts.OpenSans,
        fontSize: 16,
        color: '#888',
    },
    detailItems: {
        width: '100%',
    }
});

export default OrderItem;
