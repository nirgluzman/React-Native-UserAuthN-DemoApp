import { useState, useContext } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/UI/LoadingOverlay'; // custom spinner component

// Context for managing user authentication
import { AuthContext } from '../store/auth-context';

// helper functions for managing Firebase Auth APIs
import { createUser } from '../util/auth';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // consuming the Context
  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true); // enable spinner
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token); // pass the token to Auth Context
    } catch (err) {
      console.log(err);
      Alert.alert(
        'Authentication failed!',
        'Could not create user. Please check your input and try again.'
      );
      setIsAuthenticating(false); // disable spinner
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message='Creating user ...' />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
