import { StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { PALETTES } from '../colors';
{
  /**기본 프로필 아이콘 */
}
const DefaultProfile = () => {
  return (
    <View style={styles.iconBackground}>
      <MaterialCommunityIcons name="account" size={40} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  iconBackground: {
    backgroundColor: PALETTES.NEUTRALVARIANT[80],
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default DefaultProfile;
