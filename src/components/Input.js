import PropTypes from 'prop-types';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { NEUTRALVARIANT } from '../colors';

const Input = ({ title, placeholder, customStyle, ...props }) => {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}

      <TextInput
        style={[styles.input, customStyle]}
        placeholder={placeholder}
        {...props}
      />
    </View>
  );
};

Input.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  customStyle: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
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
    paddingHorizontal: 10,

    textAlignVertical: 'top', // 텍스트를 상단 정렬 (안드로이드에서 효과적)
    padding: 10, // 내부 여백 추가
  },
});

export default Input;
