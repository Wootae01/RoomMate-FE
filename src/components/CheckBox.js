import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { BLACK } from '../colors';
const CheckBox = ({ name }) => {
  const [isCheck, setIsCheck] = useState(false);
  const checkBoxProps = {
    name: isCheck ? 'checkbox-marked' : 'checkbox-blank-outline',
    size: 30,
    color: BLACK,
  };
  return (
    <View style={styles.container}>
      <Pressable
        hitSlop={10}
        onPress={() => {
          setIsCheck((pre) => !pre);
        }}
      >
        <MaterialCommunityIcons {...checkBoxProps} />
        <Text>{name}</Text>
      </Pressable>
    </View>
  );
};

CheckBox.propTypes = {
  name: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CheckBox;
