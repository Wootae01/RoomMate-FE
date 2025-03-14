import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useContext, useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFilteredMember, getRecommendList } from '../api/recommend';
import { BLACK, WHITE } from '../colors';
import FilterCond from '../components/FilterCond';
import HR from '../components/HR';
import RecommendItem from '../components/RecommendItem';
import UserContext from '../contexts/UserContext';
import { registerForPushNotificationsAsync } from '../utils/notifications';
import { saveNotificationsToken } from '../api/chat';
import * as Notifications from 'expo-notifications';
import NotificationContext from '../contexts/NotificationContext';
import { useNavigation } from '@react-navigation/native';
import { ChatRoutes, MainRoutes } from '../navigations/routes';

//추천 목록 화면
const RecommendScreen = () => {
  const { user } = useContext(UserContext);

  const { setNotificationCount } = useContext(NotificationContext);
  const navigation = useNavigation();
  const [data, setData] = useState([]); //추천 목록 데이터

  const notificationListener = useRef();
  const responseListener = useRef();

  //필터 적용 함수
  const fetchFilteredData = async (filterCond) => {
    console.log('필터 조건: ', filterCond);
    const newData = await getFilteredMember(user.userId, filterCond);
    console.log('필터 적용 데이터: ', newData);
    setData(newData);
  };

  //로그인 성공 후 알림 토큰 저장
  useEffect(() => {
    const fetchAndSaveToken = async () => {
      try {
        const token = await registerForPushNotificationsAsync();
        await saveNotificationsToken(user.userId, token);
      } catch (error) {
        console.error('토큰 저장 실패', error);
      }
    };

    fetchAndSaveToken();

    //포그라운드 상태에서 알림 수신 시 동작
    notificationListener.current =
      Notifications.addNotificationReceivedListener((response) => {
        if (response.request.content.data.chatRoomId) {
          const chatRoomId = response.request.content.data.chatRoomId;
          setNotificationCount((prev) => ({
            ...prev,
            [chatRoomId]: (prev[chatRoomId] || 0) + 1,
          }));
        } else {
          console.log('알림에 chatRoomId 데이터가 없습니다.', response);
        }
      });

    //알림 상호 작용 시 동작.
    //해당 채팅방의 수신한 알림 수 0으로 초기화 하고,
    //채팅방으로 이동
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const content = response?.notification?.request?.content;

        const chatRoomId = content.data?.chatRoomId;
        if (chatRoomId) {
          setNotificationCount((prev) => ({ ...prev, [chatRoomId]: 0 }));
          navigation.navigate(MainRoutes.CHAT_STACK, {
            screen: ChatRoutes.CHAT_ROOM,
            params: { nickname: content.title, chatRoomId },
          });
        } else {
          console.log('알림에 chatRoomId 데이터가 없습니다.', response);
        }
      });
  }, [navigation, setNotificationCount, user.userId]);

  //처음 추천 목록 탭 누르거나, user 기본 정보 또는 preference 정보 바뀌면 재랜더링
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getRecommendList(user.userId);
        console.log('추천 목록 데이터: ', result);
        setData(result);
      } catch (error) {
        console.log('Failed to get recommendationList: ', error); //임시 에러 처리
      }
    };
    fetchData();
  }, [user]);
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
      {data.length === 0 ? (
        //추천 목록 데이터가 없는 경우
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>조건에 맞는 룸메이트가 없습니다.</Text>
          <Text style={styles.emptyText}>
            필터 조건을 수정하여 새로운 룸메이트를 찾아보세요!
          </Text>
        </View>
      ) : (
        //추천 목록 데이터가 존재하는는 경우
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
});

export default RecommendScreen;
