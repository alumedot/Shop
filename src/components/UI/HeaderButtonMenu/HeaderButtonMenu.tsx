import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Platform } from 'react-native';

import HeaderButton from 'components/UI/HeaderButton';

const HeaderButtonMenu = (props) => {
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
