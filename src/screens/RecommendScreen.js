import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';
import { BLACK, WHITE } from '../colors';
import RecommendItem from '../components/RecommendItem';
const RecommendScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.fliter}>
        <MaterialCommunityIcons name="account-search" size={30} color={BLACK} />
      </View>
      <View style={styles.list}>
        <RecommendItem />
        <RecommendItem />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: WHITE,
    flex: 1,
  },
  fliter: { flexDirection: 'row' },
  list: { paddingHorizontal: 15 },
});

export default RecommendScreen;
