import { TextInputProps } from 'react-native';


export interface IProps extends TextInputProps {
    initialValue: string;
    initiallyValid: boolean;
    label: string;
    errorText: string;
    required: boolean;
    email: boolean;
    min: number;
    max: number;
    minLength: number;
}

export interface IReducerState {
    value: string;
    isValid: boolean;
    touched: boolean;
}

export enum Actions {
    InputChange = 'INPUT_CHANGE',
}

export interface IChange {
    type: Actions.InputChange;
    value: string;
    isValid: boolean;
}

export type IAction = IChange;
