import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from './UserContext'; 
import LoadingScreen from './LoadingScreen';
import GetStartedScreen from './GetStartedScreen';
import LoginScreen from './Login';             
import RegisterScreen from './Register';    
import Timer from './Timer';   
import HomepageScreen from './Homepage'; 



const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen name="GetStarted" component={GetStartedScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Timer" component={Timer} />
          <Stack.Screen name="Homepage" component={HomepageScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}



 