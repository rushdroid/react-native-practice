import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { commonStyles } from './CommonStyles';

const CommonButton = ({ onPress, title, style, textStyle }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: commonStyles.blueButton,
    buttonText: commonStyles.whiteText,
});

export default CommonButton;
