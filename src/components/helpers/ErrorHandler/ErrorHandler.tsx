import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Text, StyleSheet } from 'react-native';

import { IRootReduxState } from 'store/types';

import Card from 'components/UI/Card';
import { Fonts } from 'constants';

import { IProps } from './types';


const ErrorHandler = (props: IProps) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const state = useSelector((state: IRootReduxState) => state);
    useEffect(() => {
        Object.keys(state).forEach(key => {
            let error = null;
            state[key]?.error && setErrorMessage(state[key].error);
            errorMessage && !error && setErrorMessage(null);
        });
    }, [state]);

    return (
        <>
            {
                errorMessage && (
                    <Card style={styles.errorContainer}>
                        <Text style={styles.errorText}>{`${errorMessage}`}</Text>
                    </Card>
                )
            }
            {props.children}
        </>
    )
};

const styles = StyleSheet.create({
    errorContainer: {
        height: 40,
        backgroundColor: '#e03223',
        padding: 10,
        margin: 10,
        position: 'absolute',
        bottom: 10,
        right: 0,
        left: 0,
        zIndex: 1,
    },
    errorText: {
        fontFamily: Fonts.OpenSans,
        color: 'white',
    }
});

export default ErrorHandler;
