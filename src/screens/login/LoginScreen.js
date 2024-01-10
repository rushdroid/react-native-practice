import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetworkHelper from '../../utils/NetworkHelper';
import { LOGIN } from '../../utils/EndPoints';
import CommonButton from '../../components/CommonButton';
import { commonStyles } from '../../components/CommonStyles';


const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter email and password');
            return;
        }

        setLoading(true);

        try {
            const request = { "email": email, "password": password };
            const response = await NetworkHelper(endpoint = LOGIN, method = 'POST', data = request, headers = {});
            console.log('GET response:', response);
            // if (!response.status) {
            //     throw new Error(response.message || 'Login failed');
            // }

            // Login successful, handle the authenticated user data or token
            console.log('Login successful:', response);

            // Replace 'Home' with your home screen route name
            // You may also want to store authentication token/user data in state or AsyncStorage
            if (response.code !== null && response.code == '0') {
                await AsyncStorage.setItem('isLogin', "true");
                await AsyncStorage.setItem('token', response.data.Token);
                navigation.replace('Main');
            } else {
                Alert.alert('Error', response.message || 'Login failed');
            }
        } catch (error) {
            setLoading(false);
            Alert.alert('Error', error.message || 'Login failed');
        }
    };

    const handleRegister = () => {
        navigation.navigate('RegisterScreen');
    }

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.header}>Login</Text>
            <TextInput
                style={commonStyles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={commonStyles.input}
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />
            <CommonButton style={commonStyles.blueButton} onPress={handleLogin} title='Login' />
            <View style={{ height: 8 }}></View>
            <CommonButton style={commonStyles.blackButton} onPress={handleRegister} title='Register' />
            {loading && (
                <View style={commonStyles.loader}>
                    <ActivityIndicator size="large" color="blue" />
                </View>
            )}
        </View>
    );
};


export default LoginScreen;
