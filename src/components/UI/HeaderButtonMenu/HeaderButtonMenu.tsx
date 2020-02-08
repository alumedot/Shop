import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Platform } from 'react-native';

import HeaderButton from 'components/UI/HeaderButton';

import { IProps } from './types';


const HeaderButtonMenu = (props: IProps) => {
    return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => props.navData.navigation.toggleDrawer()}
            />
        </HeaderButtons>
    )
};

export default HeaderButtonMenu;
