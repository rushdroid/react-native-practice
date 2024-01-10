// import React from 'react';
// import { View, Text, Button } from 'react-native';

// const HomeScreen = ({ navigation }) => {

//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Text>Home Screen</Text>
//             <Button
//                 title="Go to Sub Screen 1"
//                 onPress={() => navigation.navigate('SubScreen1')}
//             />
//         </View>
//     );
// };

// export default HomeScreen;

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        if (loading) {
            return; // Prevent multiple requests while loading
        }

        setLoading(true);

        const token = await AsyncStorage.getItem('token');
        // Replace 'http://restapi.adequateshop.com/api/users?page=' with your API endpoint
        await fetch(`http://restapi.adequateshop.com/api/users?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log('Response Data:', responseData); // Log the response data
                if (responseData && responseData.data) {
                    setData([...data, ...responseData.data]);
                    setTotalPages(responseData.total_pages);
                    setPage(page + 1);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error); // Log the error
                setLoading(false);
            });
    };

    const renderFooter = () => {
        if (!loading) return null;

        return (
            <View style={styles.footer}>
                <ActivityIndicator animating size="large" color="#0000ff" />
            </View>
        );
    };

    const handleItemClick = (item) => {
        // Navigate to the DetailScreen and pass item details as params
        navigation.navigate('UserDetailScreen', {
            itemId: item.id,
            itemName: item.name,
            // Pass other details of the item as needed
        });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleItemClick(item)}>
            <View style={styles.item}>
                <Text>{item.name}</Text>
                <Text>{item.email}</Text>
                {/* Render other item details as needed */}
            </View>
        </TouchableOpacity>
    );

    const handleLoadMore = () => {
        if (page <= totalPages) {
            fetchData();
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
                ListFooterComponent={renderFooter}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    footer: {
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
