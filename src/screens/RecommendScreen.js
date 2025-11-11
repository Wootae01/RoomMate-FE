import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { saveNotificationsToken } from '../api/chat';
import {
  getFilteredMember,
  getMatchedDormList,
  getRecommendList,
} from '../api/recommend';
import { BLACK, WHITE } from '../colors';
import FilterCond from '../components/FilterCond';
import HR from '../components/HR';
import RecommendItem from '../components/RecommendItem';
import UserContext from '../contexts/UserContext';
import { registerForPushNotificationsAsync } from '../utils/notifications';

//추천 목록 화면
const RecommendScreen = () => {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const [data, setData] = useState([]); //추천 목록 데이터
  const [isLoading, setIsLoading] = useState(false);
  const [isSimilarity, setIsSimilarity] = useState(false);

  const handleButtonPress = () => {
    fetchMatchedDormList();
  };

  const fetchMatchedDormList = async () => {
    setIsLoading(true);
    try {
      const result = await getMatchedDormList(user.userId);
      console.log('추천 목록 데이터: ', result);
      setData(result);
    } catch (error) {
      console.log('추천 로딩 실패', error);
    } finally {
      setIsLoading(false);
    }
  };

  // const fetchRecommendList = async () => {
  //   setIsLoading(true);
  //   try {
  //     const result = await getRecommendList(user.userId);
  //     console.log('추천 목록 데이터: ', result);
  //     setData(result);
  //   } catch (error) {
  //     console.log('Preference 추천 로딩 실패', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  //필터 적용 함수
  const fetchFilteredData = async (filterCond) => {
    console.log('필터 조건: ', filterCond);
    const newData = await getFilteredMember(user.userId, filterCond);
    console.log('필터 적용 데이터: ', newData);
    setData(newData);

    // 만약 '유사도 순 정렬로 보는 중' 상태로 필터버튼을 눌렀을 경우, '맞춤 추천으로 보는 중'으로 바꿈
    if (isSimilarity === true) {
      setIsSimilarity(false);
    }
  };

  // 유사도 정렬 적용 함수
  // const fetchSimilarityData = async () => {
  //   console.log('--유사도 순으로 정렬--');
  //   setIsLoading(true);
  //   try {
  //     const newData = await getSimilarityList(user.userId);
  //     console.log('유사도 데이터: ', newData);
  //     setData(newData);
  //   } catch (error) {
  //     console.log('유사도 로딩 실패', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  //로그인 성공 후 알림 토큰 저장
  useEffect(() => {
    const fetchAndSaveToken = async () => {
      try {
        const token = await registerForPushNotificationsAsync();
        await saveNotificationsToken(user.userId, token);
      } catch (error) {
        console.log('알림 권한 허용 x', error);
      }
    };

    fetchAndSaveToken();
  }, [navigation, user.userId]);

  //처음 추천 목록 탭 누르거나, user 기본 정보 또는 preference 정보 바뀌면 재랜더링
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await getRecommendList(user.userId);
        console.log('추천 목록 데이터: ', result);
        setData(result);
      } catch (error) {
        console.log('Failed to get recommendationList: ', error); //임시 에러 처리
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 22, fontWeight: '700' }}>추천 목록</Text>
        <Pressable
          onPress={handleButtonPress}
          hitSlop={20}
          style={[styles.topButton, styles.similarityColor]}
        >
          <Text style={[styles.similarityColor]}>같은 기숙사 사용자 보기</Text>
        </Pressable>
      </View>
      {/**필터 영역 */}
      <View style={styles.fliter}>
        <FilterCond onSearch={fetchFilteredData} />
      </View>
      <HR />

      {/**추천 목록 영역 */}
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={BLACK} />
        </View>
      ) : data.length === 0 ? (
        //추천 목록 데이터가 없는 경우
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>조건에 맞는 룸메이트가 없습니다.</Text>
          <Text style={styles.emptyText}>
            필터 조건을 수정하여 새로운 룸메이트를 찾아보세요!
          </Text>
        </View>
      ) : (
        //추천 목록 데이터가 존재하는 경우
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <RecommendItem {...item} />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 17,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fliter: { flexDirection: 'row', paddingHorizontal: 0 },
  list: { paddingHorizontal: 15 },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: BLACK,
  },
  similarityColor: {
    backgroundColor: '#D49F00',
    color: BLACK,
  },
  preferenceColor: {
    backgroundColor: '#702673',
    color: WHITE,
  },
  defaultButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default RecommendScreen;
