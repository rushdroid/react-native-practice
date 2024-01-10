import React from 'react';
import { View, Text, Button } from 'react-native';

const handleGotoHome = (navigation) => {
    navigation.navigate('SubScreen2');
}

const SubScreen1 = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>This is your subscreen 1.</Text>
            <Button
                title="Go to Sub Screen 2"
                onPress={() => handleGotoHome(navigation)}
            />
        </View>
    );
};

export default SubScreen1;
