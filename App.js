import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/sidebar/home/HomeScreen';
import SplashScreen from './src/screens/splash/SplashScreen';
import LoginScreen from './src/screens/login/LoginScreen';
import RegisterScreen from './src/screens/register/RegisterScreen';
import SubScreen2 from './src/screens/sidebar/settings/SubScreen2';
import SubScreen1 from './src/screens/sidebar/about/SubScreen1';
import AboutScreen from './src/screens/sidebar/about/AboutScreen';
import SettingScreen from './src/screens/sidebar/settings/SettingScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import UserDetailScreen from './src/screens/sidebar/userdetails/UserDetailScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();

// Authentication Stack Navigator
const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

// Nested Stack for Home Screen with sub-screens
const TabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}>
      <Tab.Screen options={{
        tabBarIcon: ({ color }) => {
          return <MaterialCommunityIcons name="home" color={color} size={26} />
        }
      }} name="HomeTabScreen" component={HomeStack} />
      <Tab.Screen options={{
        tabBarIcon: ({ color }) => {
          return <MaterialCommunityIcons name="account" color={color} size={26} />
        }
      }} name="AboutTab" component={AboutStack} />
      <Tab.Screen options={{
        tabBarIcon: ({ color }) => {
          return <MaterialCommunityIcons name="bell" color={color} size={26} />
        }
      }} name="SettingTab" component={SettingsStack} />
    </Tab.Navigator>
  );
};

// Nested Stack for Home Screen with sub-screens
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SubScreen1" component={SubScreen1} />
      <Stack.Screen name="SubScreen2" component={SubScreen2} />
      <Stack.Screen name='UserDetailScreen' component={UserDetailScreen} />
    </Stack.Navigator>
  );
};

// Nested Stack for About Screen with sub-screens
const AboutStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
      <Stack.Screen name="SubScreen1" component={SubScreen1} />
      <Stack.Screen name="SubScreen2" component={SubScreen2} />
    </Stack.Navigator>
  );
};

// Nested Stack for Settings Screen with sub-screens
const SettingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="SubScreen1" component={SubScreen1} />
      <Stack.Screen name="SubScreen2" component={SubScreen2} />
    </Stack.Navigator>
  );
};

// Drawer Navigator for main screens
const MainDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="TabBar" component={TabStack} />
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="About" component={AboutStack} />
      <Drawer.Screen name="Settings" component={SettingsStack} />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Main" component={MainDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
