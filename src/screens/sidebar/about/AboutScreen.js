import React from 'react';
import { View, Text, Button } from 'react-native';

const handleGotoHome = (navigation) => {
    navigation.navigate('SubScreen1');
}

const AboutScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Button
                title="Setting and go to SubScreen 1"
                onPress={() => handleGotoHome(navigation)}
            />
        </View>
    );
};

export default AboutScreen;