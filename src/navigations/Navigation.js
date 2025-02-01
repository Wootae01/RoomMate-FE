import { StyleSheet, View } from 'react-native';
import MainStack from './MainStack';

const Navigation = () => {
  return (
    <View style={styles.container}>
      <MainStack />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Navigation;
