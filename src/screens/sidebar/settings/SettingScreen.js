import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, Text, Button } from 'react-native';

const handleLogout = (navigation) => {
    AsyncStorage.setItem('isLogin', "false");
    AsyncStorage.setItem('token', "");
    navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }], // Replace 'NewScreen' with the screen you want to navigate to
    });
}

const SettingScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Button
                title="Log Out"
                onPress={() => handleLogout(navigation)}
            />
        </View>
    );
};

export default SettingScreen;

