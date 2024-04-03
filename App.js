// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screen/HomeScreen';
import HistoryScreen from './screen/HistoryScreen';
import Coba from './screen/Coba';
import WelcomeScreen from './screen/WelcomeScreen';
import NewsScreen from './screen/NewsScreen';
import AccountScreen from './screen/AccountScreen';
import EditProfileScreen from './screen/EditProfileScreen';
import LoginForm from './screen/LoginFormScreen';
import CompostScreen from './screen/CompostScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Compost"
          component={CompostScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="News"
          component={NewsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Account"
          component={AccountScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
