import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import NetworkHelper from '../../utils/NetworkHelper';
import { REGISTER } from '../../utils/EndPoints';
import { commonStyles } from '../../components/CommonStyles';
import CommonButton from '../../components/CommonButton';

const RegisterScreen = ({ navigation }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        navigation.goBack();
    }

    const validateEmail = (email) => {
        // Regular expression for validating email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test(email);
    };

    const handleRegister = async () => {
        if (!name || !email || !password) {
            Alert.alert('Error', 'Please enter name, email, and password');
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert('Error', 'Please enter valid email address');
            return;
        }

        setLoading(true);

        try {
            const data = await NetworkHelper(REGISTER,
                method = 'POST',
                data = JSON.stringify({ email: email, password: password, name: name }),
                headers = {
                    'Content-Type': 'application/json',
                }
            );

            console.log('Register successful:', data);
            if (data.code !== null && data.code == '0') {
                await AsyncStorage.setItem('isLogin', "true");
                await AsyncStorage.setItem('token', data.data.Token);
                navigation.replace('Main');
            } else {
                Alert.alert('Error', data.message || 'Failed to register');
            }
        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to register');
        } finally {
            setLoading(false);
        }
    };

    return <View style={commonStyles.container}>
        <Text style={commonStyles.header}>Register</Text>

        <TextInput
            style={commonStyles.input}
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            keyboardType="email-address"
            autoCapitalize="none"
        />
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
        <CommonButton style={commonStyles.blueButton} onPress={handleRegister} title='Register' />
        <View style={{ height: 8 }}></View>
        <Text style={styles.smallText}>Already Register? Click to Login</Text>
        <CommonButton style={commonStyles.blackButton} onPress={handleLogin} title='Back to Login' />

        {loading && (
            <View style={commonStyles.loader}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        )}
    </View>
}

const styles = StyleSheet.create({
    smallText: {
        fontSize: 12,
        margin: 8
    },
    registerButton: {
        width: '100%',
        height: 40,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    loginButton: {
        width: '100%',
        height: 40,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    loader: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RegisterScreen;