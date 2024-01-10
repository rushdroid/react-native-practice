import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(async () => {
            const isLogin = await AsyncStorage.getItem('isLogin');
            if (isLogin !== null) {
                console.log('Value exists:', isLogin);
                if (isLogin === 'true') {
                    navigation.replace('Main');
                } else {
                    navigation.replace('LoginScreen');
                }
            } else {
                navigation.replace('LoginScreen');
            }
        }, 3000);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.welcomText}> Welcome to React-Native Practice</Text>
            <Image
                source={require('../../../assets/splash.png')}
                style={styles.image}
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        width: '0%', // Adjust width as needed
        height: '0%', // Adjust height as needed
    },
    welcomText: {
        fontSize: 24,

    }
});

export default SplashScreen;
