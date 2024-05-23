// Access to the WelcomeScreen requires user authentication.

import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Context for managing user authentication
import { AuthContext } from '../store/auth-context';

// helper function for managing Firebase Realtime Database
import { fetchMessage } from '../util/database';

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMessage] = useState('');

  // consuming the Context
  const { token } = useContext(AuthContext);

  useEffect(() => {
    // fetch message from Firebase Realtime Database and set it in state.
    async function getMessage() {
      const message = await fetchMessage(token);
      setFetchedMessage(message);
    }

    getMessage();
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8
  }
});
