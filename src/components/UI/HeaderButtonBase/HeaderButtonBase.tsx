import React from 'react';
import { Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../HeaderButton';

import { IProps } from './types';


const HeaderButtonBase = (props: IProps) => {
    return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title={props.title}
                iconName={Platform.OS === 'android' ? props.iconAndroid : props.iconIos}
                onPress={props.onPress}
            />
        </HeaderButtons>
    )
};

export default HeaderButtonBase;
