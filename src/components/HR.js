import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { NEUTRALVARIANT } from '../colors';

const HR = ({ customStyles }) => {
  return (
    <View style={[defaultStyles.container, customStyles?.container]}>
      <View style={[defaultStyles.line, customStyles?.line]}></View>
    </View>
  );
};

HR.propTypes = {
  customStyles: PropTypes.object,
};

const defaultStyles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    ...StyleSheet.absoluteFill,
    borderBottomWidth: 1,
    borderBottomColor: NEUTRALVARIANT.DEFAULT,
    height: '50%',
  },
});

export default HR;
