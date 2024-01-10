
import React from 'react';
import { View, Text, Button } from 'react-native';

const handleGotoHome = (navigation) => {
    navigation.goBack();
}

const SubScreen2 = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>This is your Subscreen 2</Text>
            <Button
                title="Move back to Sub Screen 1"
                onPress={() => handleGotoHome(navigation)}
            />
        </View>
    );
};

export default SubScreen2;
