## React Native - User AuthN

### GitHub repo

https://github.com/nirgluzman/React-Native-UserAuthN-DemoApp.git
https://github.com/academind/react-native-practical-guide-code.git (course)

### Start a new React Native project with Expo

https://reactnative.dev/docs/environment-setup, https://docs.expo.dev/

```bash
npx create-expo-app <project name> --template blank
```

### React Navigation

https://reactnavigation.org/docs/getting-started

- Mandatory installations:

```bash
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
```

- Native Stack Navigator:

```bash
npm install @react-navigation/native-stack
```

- Bottom Tabs Navigator:

```bash
npm install @react-navigation/bottom-tabs
```

### Environment variables in Expo

https://docs.expo.dev/guides/environment-variables/

- The Expo CLI will automatically load environment variables with an `EXPO_PUBLIC_` prefix from .env
  files for use within your JavaScript code.

- Do not store sensitive info, such as private keys, in `EXPO_PUBLIC_` variables. These variables
  will be visible in plain-text in your compiled application.

### Firebase for AuthN Backend

- Firebase Auth REST API, https://firebase.google.com/docs/reference/rest/auth

* Sign in with email/password,
  https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password

* Sign up with email/password,
  https://firebase.google.com/docs/reference/rest/auth#section-create-email-password

- Token management
  https://www.udemy.com/course/react-native-the-practical-guide/learn/lecture/31404572#questions
  - Automatically user logout after token expiration time.
  - Token refresh: Whenever you get an auth token (i.e., after logging in or creating a new user),
    you also get a refresh token.
    https://firebase.google.com/docs/reference/rest/auth#section-refresh-token
  - Alternatively, many third-party services (like Firebase) offer official SDKs which handle token
    management (and refreshing the token) for you.

### Firebase Realtime Database

- Security rule to use idToken

```json
{
  "rules": {
    ".read": "auth.uid != null",
    ".write": "auth.uid != null"
  }
}
```

### React Native Async Storage

https://reactnative.dev/docs/asyncstorage
https://github.com/react-native-async-storage/async-storage

- AsyncStorage is an unencrypted, asynchronous, persistent, key-value storage system that is global
  to the app. It should be used instead of LocalStorage.

### Expo SplashScreen

https://docs.expo.dev/versions/latest/sdk/splash-screen/

- Library to tell the splash screen to remain visible until it has been explicitly told to hide.

- This is useful to do tasks that will happen behind the scenes such as making API calls,
  pre-loading fonts, animating the splash screen and so on.
