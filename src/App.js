import { StyleSheet } from 'react-native';

import { initializeKakaoSDK } from '@react-native-kakao/core';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { WHITE } from './colors';
import Navigation from './navigations/Navigation';
import { UserProvider } from './contexts/UserContext';
import { TextDecoder, TextEncoder } from 'text-encoding';
import * as Notifications from 'expo-notifications';

global.TextEncoder = TextEncoder; //websocket encoder
global.TextDecoder = TextDecoder; //websocket decoder

/**
 * 앱이 실행 중일 때 도착하는 푸시 알림의 동작 방식을 지정한다.
 *
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, //알림 도착했을 때, 알림창 표시
    shouldPlaySound: true, //알림 도착 시 소리 재생
    shouldSetBadge: true, //배지 설정. 읽지 않은 알림 수 숫자로 표시시
  }),
});

const App = () => {
  initializeKakaoSDK(`${process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY}`);

  return (
    <UserProvider>
      <NavigationContainer style={styles.container}>
        <StatusBar style="dark"></StatusBar>
        <Navigation />
      </NavigationContainer>
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
