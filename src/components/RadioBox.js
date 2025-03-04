import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import PropTypes from 'prop-types';
import { BLACK } from '../colors';
const RadioBox = ({ name, isSelected, onPress, customStyles }) => {
  const radioboxBoxProps = {
    name: isSelected ? 'radiobox-marked' : 'radiobox-blank',
    size: 30,
    color: BLACK,
  };
  return (
    <View style={[styles.container, customStyles?.container]}>
      <Pressable hitSlop={15} onPress={onPress}>
        <View style={[styles.content, customStyles?.content]}>
          <MaterialCommunityIcons {...radioboxBoxProps} />
          <Text style={[styles.text, customStyles?.text]}>{name}</Text>
        </View>
      </Pressable>
    </View>
  );
};

RadioBox.propTypes = {
  name: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onPress: PropTypes.func,
  customStyles: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    minWidth: 120,
    paddingHorizontal: 5,
  },
  content: {
    flexDirection: 'row',
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
