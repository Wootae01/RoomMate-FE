import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { WHITE } from './colors';
import Navigation from './navigations/Navigation';

const App = () => {
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
