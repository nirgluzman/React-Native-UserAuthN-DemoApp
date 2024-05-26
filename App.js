import { useContext, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

// The SplashScreen module from the expo-splash-screen library is used to tell the splash screen to remain visible until it has been explicitly told to hide.
import * as SplashScreen from 'expo-splash-screen';

// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';

import IconButton from './components/UI/IconButton';

// Context for managing user authentication
import AuthContextProvider, { AuthContext } from './store/auth-context';

// global color styles
import { Colors } from './constants/styles';

const Stack = createNativeStackNavigator();

// keep the splash screen visible while we fetch resources.
SplashScreen.preventAutoHideAsync();

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
  // consuming the Context
  const { logout } = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 }
      }}>
      <Stack.Screen
        name='Welcome'
        component={WelcomeScreen}
        options={{
          // logout button
          headerRight: ({ tintColor }) => (
            <IconButton icon='exit' size={24} color={tintColor} onPress={logout} />
          )
        }}
      />
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

function Root() {
  // consuming the Context
  const { authenticate } = useContext(AuthContext);

  // state to keep track of whether we are trying to fetch the token from the storage.
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  // fetch the token from the storage when the Provider is created.
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('idToken'); // reading idToken from storage.
      if (storedToken) {
        authenticate(storedToken);
      }

      setIsTryingLogin(false); // finish interating with the storage.
    }
    fetchToken();
  }, []);

  // show the splash screen until we complete the fetching from storage.
  if (isTryingLogin) {
    return null;
  } else {
    // hide the splash screen.
    SplashScreen.hideAsync();
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style='light' />

      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
