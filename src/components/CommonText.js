import React from 'react';
import { Text, StyleSheet } from 'react-native';

const CommonText = ({ children, style }) => {
    return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: '#333',
    },
});

export default CommonText;
