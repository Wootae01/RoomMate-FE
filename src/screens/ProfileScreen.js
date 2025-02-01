import { StyleSheet, Text, View } from 'react-native';

const ProflieScreen = () => {
  return (
    <View style={styles.container}>
      <Text>내 프로필</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProflieScreen;
