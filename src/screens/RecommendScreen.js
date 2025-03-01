import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useContext, useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFilteredMember, getRecommendList } from '../api/recommend';
import { BLACK, WHITE } from '../colors';
import FilterCond from '../components/FilterCond';
import HR from '../components/HR';
import RecommendItem from '../components/RecommendItem';
import UserContext from '../contexts/UserContext';

//추천 목록 화면
const RecommendScreen = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState(null); //추천 목록 데이터

  //필터 적용 함수
  const fetchFilteredData = async (filterCond) => {
    console.log('필터 조건: ', filterCond);
    const newData = await getFilteredMember(user.userId, filterCond);
    setData(newData);
  };

  //처음 추천목록 탭 눌렀을 때, 추천 목록 가져옴
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getRecommendList(user.userId);
        setData(result);
      } catch (error) {
        console.log('Failed to get recommendationList: ', error); //임시 에러 처리
      }
    };
    fetchData();
  }, [user?.userId]);
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
        <FilterCond onSearch={fetchFilteredData} />
      </View>
      <HR />

      {/**추천 목록 영역 */}
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <RecommendItem {...item} />}
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
