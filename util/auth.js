// helper functions for managing Firebase Auth APIs
// https://firebase.google.com/docs/reference/rest/auth

import axios from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true // should always be true.
  });

  const token = response.data.idToken; // Firebase Auth ID token for the authenticated user.
  return token;
}

// Sign up with email/password
// https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
export function createUser(email, password) {
  return authenticate('signUp', email, password);
}

// Sign in with email/password
// https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
export function loginUser(email, password) {
  return authenticate('signInWithPassword', email, password);
}
