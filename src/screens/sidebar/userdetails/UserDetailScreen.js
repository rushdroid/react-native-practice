import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import MakeRequest from '../../../utils/NetworkHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET_USER_BY_ID } from '../../../utils/EndPoints';

const UserDetailScreen = ({ route, navigation }) => {
    const { itemId, itemName } = route.params;
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        if (loading) {
            return; // Prevent multiple requests while loading
        }

        setLoading(true);

        try {
            const token = await AsyncStorage.getItem('token');
            const response = await MakeRequest(endpoint = GET_USER_BY_ID + itemId, method = 'GET', data = null, headers = {
                Authorization: `Bearer ${token}`
            });
            console.log('Get user:', response);
            if (response.email !== null) {
                setUserData(response);
            } else {
                setUserData(null);
                Alert.alert('Error', response.message || 'Login failed');
            }
            setLoading(false);
        } catch (error) {
            setUserData(null);
            setLoading(false);
            console.log('error:', error);
        }
    };
    return (
        <View>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" /> // Show loader while loading
            ) : (
                // Render UI with fetched 'userData'
                <ScrollView>
                    {/* Display user data */}
                    {userData && (
                        <View>
                            <Text>User ID: {userData.email}</Text>
                            <Text>Name: {userData.email}</Text>
                            {/* Render other user details */}
                        </View>
                    )}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default UserDetailScreen;
