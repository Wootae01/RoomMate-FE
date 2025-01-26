import { Pressable, StyleSheet, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import { PRIMARY, WHITE } from '../colors';
import tinycolor from 'tinycolor2';
const Button = ({
  title,
  onPress,
  buttonStyle = { backgroundColor: PRIMARY.DEFAULT },
}) => {
  const backgroundColor = buttonStyle.backgroundColor;
  const darkColor = tinycolor(backgroundColor).darken(10).toString();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: backgroundColor },
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
  buttonStyle: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  text: {
    color: WHITE,
    fontSize: 16,
    fontWeight: 700,
  },
});
export default Button;
