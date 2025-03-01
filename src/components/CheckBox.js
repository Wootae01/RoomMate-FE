import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BLACK } from '../colors';
const CheckBox = ({ name, customStyles, size, onChangeValues, isChecked }) => {
  const [isCheck, setIsCheck] = useState(isChecked || false);
  const checkBoxProps = {
    name: isCheck ? 'checkbox-marked' : 'checkbox-blank-outline',
    size: size || 30,
    color: BLACK,
  };

  useEffect(() => {
    setIsCheck(isChecked);
  }, [isChecked]);

  return (
    <View style={[styles.container, customStyles?.container]}>
      <Pressable
        hitSlop={10}
        onPress={() => {
          const update = !isCheck;
          setIsCheck(update);
          onChangeValues(update);
        }}
      >
        <MaterialCommunityIcons {...checkBoxProps} />
      </Pressable>
      <Text style={[styles.text, customStyles?.text]}>{name}</Text>
    </View>
  );
};

CheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  customStyles: PropTypes.object,
  size: PropTypes.number,
  onChangeValues: PropTypes.func,
  isChecked: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  text: {
    marginTop: 3,
    fontSize: 16,
    marginLeft: 6,
    textAlign: 'center',
  },
});

export default CheckBox;
