import { useState, useContext } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/UI/LoadingOverlay'; // custom spinner component

// Context for managing user authentication
import { AuthContext } from '../store/auth-context';

// helper functions for managing Firebase Auth APIs
import { loginUser } from '../util/auth';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // consuming the Context
  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true); // enable spinner
    try {
      const token = await loginUser(email, password);
      authCtx.authenticate(token); // pass the token to Auth Context
    } catch (err) {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!'
      );
    }
    setIsAuthenticating(false); // disable spinner
  }

  if (isAuthenticating) {
    return <LoadingOverlay message='Logging you in ...' />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
