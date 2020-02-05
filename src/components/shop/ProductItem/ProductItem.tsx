import React, { ElementType } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
} from 'react-native';

import { Colors, Fonts } from 'constants';
import { shadowStyles } from 'helpers/styles';
import { IProps } from './types';


const ProductItem = (props: IProps) => {
  const TouchableComponent: ElementType = Platform.OS === 'android' && Platform.Version >= 21 ?
    TouchableNativeFeedback : TouchableOpacity;

  return (
    <View style={styles.product}>
      <TouchableComponent useForeground activeOpacity={0.6} onPress={props.onViewDetail}>
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
            <Button color={Colors.Primary} title="View details" onPress={props.onViewDetail}/>
            <Button color={Colors.Primary} title="To cart" onPress={props.onAddToCart}/>
          </View>
        </View>
      </TouchableComponent>
    </View>
  )
};

const styles = StyleSheet.create({
  product: {
    ...shadowStyles,
    height: 300,
    margin: 20,
    overflow: 'hidden',
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: 10,
    width: '100%',
    height: '60%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    alignItems: 'center',
    height: '15%',
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
    height: '25%',
    paddingHorizontal: 20,
  },
});

export default ProductItem;
