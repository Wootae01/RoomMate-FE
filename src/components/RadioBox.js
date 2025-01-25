import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import PropTypes from 'prop-types';
import { BLACK } from '../colors';
const RadioBox = ({ name, isSelected, onPress, radioStyle }) => {
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
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

RadioBox.propTypes = {
  name: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onPress: PropTypes.func,
  radioStyle: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 120,
  },
  text: {
    textAlign: 'center',
    marginTop: 3,
  },
});

export default RadioBox;
