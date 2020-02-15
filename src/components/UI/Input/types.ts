import { TextInputProps } from 'react-native';

import { InputIds } from 'screens/user/EditProductScreen/form';


export interface IProps extends TextInputProps {
    id: InputIds
    label: string;
    errorText: string;
    onInputChange(id: InputIds, value: string, isValid: boolean): void;
    initialValue?: string;
    initiallyValid?: boolean;
    required?: boolean;
    email?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
}

export interface IReducerState {
    value: string;
    isValid: boolean;
    touched: boolean;
}

export enum Actions {
    InputChange = 'INPUT_CHANGE',
    InputBlur = 'INPUT_ONBLUR',
}

export interface IChange {
    type: Actions.InputChange;
    value: string;
    isValid: boolean;
}

export interface IBlur {
    type: Actions.InputBlur;
}

export type IAction = IChange | IBlur;
