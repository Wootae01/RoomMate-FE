import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { PALETTES } from '../colors';
{
  /**기본 프로필 아이콘 */
}
const DefaultProfile = ({ size }) => {
  return (
    <View style={styles.iconBackground}>
      <MaterialCommunityIcons
        name="account"
        size={size ? size : 40}
        color="black"
      />
    </View>
  );
};
DefaultProfile.propTypes = {
  size: PropTypes.number,
};

const styles = StyleSheet.create({
  iconBackground: {
    backgroundColor: PALETTES.NEUTRALVARIANT[80],
    padding: 10,
    borderRadius: 10,
  },
});

export default DefaultProfile;
