import { StatusBar, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigations/Navigation';

import { WHITE } from './colors';

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
