import { useState } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/UI/LoadingOverlay'; // custom spinner component

// helper functions for managing Firebase Auth APIs
import { createUser } from '../util/auth';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true); // enable spinner
    try {
      await createUser(email, password);
    } catch (err) {
      console.log(err);
      Alert.alert(
        'Authentication failed!',
        'Could not create user. Please check your input and try again.'
      );
    }
    setIsAuthenticating(false); // disable spinner
  }

  if (isAuthenticating) {
    return <LoadingOverlay message='Creating user ...' />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
