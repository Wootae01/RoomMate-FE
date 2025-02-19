import { StyleSheet } from 'react-native';

import { initializeKakaoSDK } from '@react-native-kakao/core';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { WHITE } from './colors';
import Navigation from './navigations/Navigation';
import { UserProvider } from './contexts/UserContext';

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
