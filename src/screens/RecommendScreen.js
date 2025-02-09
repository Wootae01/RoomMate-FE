import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BLACK, WHITE } from '../colors';
import FilterCond from '../components/FilterCond';
import HR from '../components/HR';
import RecommendItem from '../components/RecommendItem';

const dummyData = Array(10).fill(null); //테스트용 더미 데이터

const RecommendScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 22, fontWeight: '700' }}>추천 목록</Text>
        <Pressable
          onPress={() => {
            console.log('pressed2');
          }}
          hitSlop={20}
        >
          <MaterialCommunityIcons
            name="account-search"
            size={30}
            color={BLACK}
          />
        </Pressable>
      </View>
      {/**필터 영역 */}
      <View style={styles.fliter}>
        <FilterCond />
      </View>
      <HR />

      {/**추천 목록 영역 */}
      <FlatList
        data={dummyData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={() => <RecommendItem />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: WHITE,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fliter: { flexDirection: 'row', paddingHorizontal: 0 },
  list: { paddingHorizontal: 15 },
});

export default RecommendScreen;
