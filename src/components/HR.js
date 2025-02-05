import { StyleSheet, View } from 'react-native';
import { NEUTRALVARIANT } from '../colors';

const HR = () => {
  return (
    <View style={defaultStyles.container}>
      <View style={defaultStyles.line}></View>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  line: {
    ...StyleSheet.absoluteFill,
    borderBottomWidth: 1,
    borderBottomColor: NEUTRALVARIANT.DEFAULT,
    height: '50%',
  },
});

export default HR;
