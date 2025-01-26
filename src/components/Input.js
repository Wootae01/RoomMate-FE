import PropTypes from 'prop-types';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { NEUTRALVARIANT } from '../colors';

const Input = ({ title, placeholder }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput style={styles.input} placeholder={placeholder} />
    </View>
  );
};

Input.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  title: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: NEUTRALVARIANT.DARK,
    height: 45,
    paddingHorizontal: 10,
  },
});

export default Input;
