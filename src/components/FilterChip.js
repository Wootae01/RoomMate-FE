import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { PALETTES, WHITE } from '../colors';

('../colors');
const FilterChip = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Pressable
        onPress={onPress}
        hitSlop={{ top: 10, bottom: 10, left: 15, right: 10 }}
      >
        <MaterialCommunityIcons name="close" size={12} color="white" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    padding: 4,
    margin: 5,
    backgroundColor: PALETTES.PRIMARY[30],
  },
  text: {
    color: WHITE,
    fontSize: 12,
    marginLeft: 1,
  },
});

FilterChip.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default FilterChip;
