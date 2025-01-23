import { Pressable, StyleSheet, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import { PRIMARY, WHITE } from '../colors';
import tinycolor from 'tinycolor2';
const Button = ({ title, onPress, buttonStyle }) => {
  const backgroundColor = buttonStyle.backgroundColor || PRIMARY.DEFAULT;
  const darkColor = tinycolor(backgroundColor).darken(10).toString();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        buttonStyle,
        pressed && { backgroundColor: darkColor },
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingVertical: 20,
    justifyContent: 20,
    alignItems: 'center',
  },
  text: {
    color: WHITE,
    fontSize: 16,
    fontWeight: 700,
  },
});
export default Button;
