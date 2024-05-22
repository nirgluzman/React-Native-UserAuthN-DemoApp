// helper functions for managing Firebase Auth APIs
// https://firebase.google.com/docs/reference/rest/auth

import axios from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

// Sign up with email/password
// https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
export async function createUser(email, password) {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    {
      email,
      password,
      returnSecureToken: true
    }
  );

  return response.data;
}
