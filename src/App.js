import { StatusBar, StyleSheet } from 'react-native';

import SignUpStack from './navigations/SignUpStack';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer style={styles.container}>
      <StatusBar style="dark"></StatusBar>
      <SignUpStack />
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;
