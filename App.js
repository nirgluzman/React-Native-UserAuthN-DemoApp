import { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';

// Context for managing user authentication
import AuthContextProvider, { AuthContext } from './store/auth-context';

// global color styles
import { Colors } from './constants/styles';

const Stack = createNativeStackNavigator();

// un-authenticated user
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 }
      }}>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Signup' component={SignupScreen} />
    </Stack.Navigator>
  );
}

// authenticated user
function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 }
      }}>
      <Stack.Screen name='Welcome' component={WelcomeScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {
  // consuming the Context
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {/* render the AuthStack for un-authenticated users (i.e. login and signup screens). */}
      {!isAuthenticated && <AuthStack />}

      {/* render the AuthenticatedStack for authenticated users (i.e. welcome screen). */}
      {isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style='light' />

      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}
