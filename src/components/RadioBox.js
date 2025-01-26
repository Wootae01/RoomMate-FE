import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import PropTypes from 'prop-types';
import { BLACK } from '../colors';
const RadioBox = ({ name, isSelected, onPress, radioStyle, textStyle }) => {
  const radioboxBoxProps = {
    name: isSelected ? 'radiobox-marked' : 'radiobox-blank',
    size: 30,
    color: BLACK,
  };
  return (
    <View style={[styles.container, radioStyle]}>
      <Pressable hitSlop={15} onPress={onPress}>
        <MaterialCommunityIcons {...radioboxBoxProps} />
      </Pressable>
      <Text style={[styles.text, textStyle]}>{name}</Text>
    </View>
  );
};

RadioBox.propTypes = {
  name: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onPress: PropTypes.func,
  radioStyle: PropTypes.object,
  textStyle: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    minWidth: 120,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  text: {
    marginTop: 3,
    paddingHorizontal: 2,
    fontSize: 16,
    marginLeft: 6,
    textAlign: 'center',
  },
});

export default RadioBox;
