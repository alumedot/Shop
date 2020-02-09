import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';


export interface IProps {
    children: ReactNode;
    style: StyleProp<ViewStyle>;
}
