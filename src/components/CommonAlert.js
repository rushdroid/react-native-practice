import React from 'react';
import { Alert } from 'react-native';

const CommonAlert = ({ title, message, onOKPress, okButtonTitle = 'OK' }) => {
    const buttons = [{ text: okButtonTitle, onPress: onOKPress }];

    return Alert.alert(title, message, buttons);
};

export default CommonAlert;
