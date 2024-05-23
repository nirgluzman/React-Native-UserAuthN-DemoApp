// helper functions to handle HTTP requests to Firebase Realtime database.

import axios from 'axios';

// Axios returns a PROMISE that eventually gives you an access to the data (i.e. it doesn't complete immediatly).
// The response is either fulfilled or rejected, depending on the response from the backend service.

// Firebase Realtime Database
const DB_URL = process.env.EXPO_PUBLIC_DB_URL;

// fetch message from the database.
export async function fetchMessage(token) {
  const response = await axios.get(DB_URL + 'message.json' + `?auth=${token}`);

  return response.data;
}
