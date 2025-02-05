import PropTypes from 'prop-types';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BLACK, PALETTES, WHITE } from '../colors';

const TextButton = ({ onPress, text, styles }) => {
  return (
    <View style={[defaultStyles.container, styles?.container]}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          defaultStyles.content,
          styles?.content,
          pressed && { backgroundColor: PALETTES.NEUTRALVARIANT[90] },
        ]}
      >
        <Text style={[defaultStyles.text, styles?.text]}>{text}</Text>
      </Pressable>
    </View>
  );
};

TextButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  styles: PropTypes.object,
};

const defaultStyles = StyleSheet.create({
  container: {},
  content: {
    backgroundColor: WHITE,
  },
  text: {
    fontSize: 15,
    color: BLACK,
    paddingVertical: 12,
  },
});

export default TextButton;
