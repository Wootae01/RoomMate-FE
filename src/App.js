import { StyleSheet } from 'react-native';

import { initializeKakaoSDK } from '@react-native-kakao/core';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { WHITE } from './colors';
import Navigation from './navigations/Navigation';

const App = () => {
  initializeKakaoSDK(`${process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY}`);
  return (
    <NavigationContainer style={styles.container}>
      <StatusBar style="dark"></StatusBar>
      <Navigation />
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});

export default App;
