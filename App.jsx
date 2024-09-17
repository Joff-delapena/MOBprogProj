import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from './UserContext'; 
import LoginScreen from './Login';             
import RegisterScreen from './Register';   
import HomepageScreen from './Homepage';       

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Homepage" component={HomepageScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
