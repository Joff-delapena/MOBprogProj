import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from './src/Authentication/UserContext'; 
import LoadingScreen from './src/Components/LoadingScreen';
import GetStartedScreen from './src/Components/GetStartedScreen';
import LoginScreen from './src/Authentication/Login';             
import RegisterScreen from './src/Authentication/Register';    
import Timer from './src/Dashboard/Timer';   
import HomepageScreen from './src/Dashboard/Homepage'; 
import About from './src/Dashboard/About'; 
import Profile from './src/Dashboard/Profile';   
import Settings from './src/Dashboard/Settings';
import Support from './src/Dashboard/Support';
import DailyGoals from './src/Dashboard/DailyGoals';
import ScreenUnlocks from './src/Dashboard/ScreenUnlocks';
import AppBlocker from './src/Dashboard/AppBlocker';
import Notifications from './src/Dashboard/Notifications';
import RecentGoals from './src/Dashboard/RecentGoals';


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
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Support" component={Support} />
          <Stack.Screen name="DailyGoals" component={DailyGoals} />
          <Stack.Screen name="ScreenUnlocks" component={ScreenUnlocks} />
          <Stack.Screen name="AppBlocker" component={AppBlocker} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="RecentGoals" component={RecentGoals} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
