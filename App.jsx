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
import About from './About'; 
import Profile from './Profile';   
import Settings from './Settings';
import Support from './Support'
import DailyGoals from './DailyGoals'  



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
          <Stack.Screen name="About" component={About} /> 
          <Stack.Screen name="Profile" component={Profile} /> 
          <Stack.Screen name="Settings"component= {Settings}/>
          <Stack.Screen name="Support"component= {Support}/>
          <Stack.Screen name="DailyGoals"component= {DailyGoals}/>
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}



 