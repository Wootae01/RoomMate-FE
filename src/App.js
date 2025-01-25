import { StatusBar, StyleSheet, View } from 'react-native';

import LifeStyleSurveyScreen from './screens/LifeStyleSurveyScreen';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="dark"></StatusBar>
      <LifeStyleSurveyScreen />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;
