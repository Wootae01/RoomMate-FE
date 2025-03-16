// App.js
import { StyleSheet } from 'react-native';
import { initializeKakaoSDK } from '@react-native-kakao/core';
import { NavigationContainer } from '@react-navigation/native';
import { WHITE } from './colors';
import Navigation from './navigations/Navigation';
import { UserProvider } from './contexts/UserContext';
import { TextDecoder, TextEncoder } from 'text-encoding';
import * as Notifications from 'expo-notifications';
import { NotificationProvider } from './contexts/NotificationContext';
import NotificationHandler from './utils/NotificationHandler';
import { StatusBar } from 'expo-status-bar';

global.TextEncoder = TextEncoder; //websocket encoder
global.TextDecoder = TextDecoder; //websocket decoder

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

initializeKakaoSDK(`${process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY}`);

const App = () => {
  return (
    <UserProvider>
      <NotificationProvider>
        <NavigationContainer style={styles.container}>
          <StatusBar style="dark"></StatusBar>
          <Navigation />
          <NotificationHandler />
        </NavigationContainer>
      </NotificationProvider>
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});

export default App;
