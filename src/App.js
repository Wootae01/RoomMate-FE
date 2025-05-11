// App.js
import { AppState, StyleSheet } from 'react-native';
import { initializeKakaoSDK } from '@react-native-kakao/core';
import { NavigationContainer } from '@react-navigation/native';
import { WHITE } from './colors';
import Navigation from './navigations/Navigation';
import { UserProvider } from './contexts/UserContext';
import { TextDecoder, TextEncoder } from 'text-encoding';
import { NotificationProvider } from './contexts/NotificationContext';
import NotificationHandler from './utils/NotificationHandler';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import stompClient, { disconnect } from './api/stompClient';
import { ActiveChatRoomProvider } from './contexts/ActiveChatRoomContext';

global.TextEncoder = TextEncoder; //websocket encoder
global.TextDecoder = TextDecoder; //websocket decoder

initializeKakaoSDK(`${process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY}`);

const App = () => {
  const [appState, setAppState] = useState(AppState.currentState);

  //백그라운드 전환 시 연결된 웹소켓 종료료
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
        <ActiveChatRoomProvider>
          <NavigationContainer style={styles.container}>
            <StatusBar style="dark"></StatusBar>
            <Navigation />
            <NotificationHandler />
          </NavigationContainer>
        </ActiveChatRoomProvider>
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
