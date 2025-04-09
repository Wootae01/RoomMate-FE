// App.js
import { AppState, StyleSheet } from 'react-native';
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
import { useEffect, useState } from 'react';
import stompClient, { disconnect } from './api/stompClient';
// import * as WebBrowser from 'expo-web-browser';
// WebBrowser.maybeCompleteAuthSession();
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
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const changeAppState = (nextAppState) => {
      if (appState.match(/active/) && nextAppState === 'background') {
        console.log('백그라운드로 전환됨');
        if (stompClient.connected) {
          disconnect();
        }
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', changeAppState);

    return () => {
      subscription.remove();
    };
  }, [appState]);

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
