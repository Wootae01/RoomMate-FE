import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Button from './components/Button';
import {
  BLACK,
  ERROR,
  NEUTRAL,
  NEUTRALVARIANT,
  PRIMARY,
  SECONDARY,
} from './colors';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Button
        title="test"
        onPress={() => {}}
        buttonStyle={{ backgroundColor: PRIMARY.DEFAULT }}
      />
      <Button
        title="test2"
        onPress={() => {}}
        buttonStyle={{ backgroundColor: SECONDARY.DEFAULT }}
      />
      <Button
        title="test3"
        onPress={() => {}}
        buttonStyle={{ backgroundColor: ERROR.DEFAULT }}
      />
      <Button
        title="test4"
        onPress={() => {}}
        buttonStyle={{ backgroundColor: NEUTRALVARIANT.DEFAULT }}
      />
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
