import { useIsFocused } from '@react-navigation/native';
import { useContext, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getChatRooms } from '../api/chat';
import { BLACK, WHITE } from '../colors';
import ChatItem from '../components/ChatItem';
import UserContext from '../contexts/UserContext';
import stompClient, { connect } from '../api/stompClient';

const ChatListScreen = () => {
  const [chatList, setChatList] = useState([]);
  const isFocused = useIsFocused();
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState();

  const subRef = useRef(null);

  useEffect(() => {
    // 화면 마운트 시 또는 user 변경 시 구독 설정
    let isSubscribed = true;
    const subscribeHandler = (msg) => {
      console.log('WS msg arrived', msg.body);
      try {
        const payload = JSON.parse(msg.body);
        setChatList((prev) => {
          const idx = prev.findIndex(
            (c) => c.chatRoomId === payload.chatRoomId
          );
          let next;
          if (idx >= 0) {
            next = prev.map((c) =>
              c.chatRoomId === payload.chatRoomId
                ? {
                    ...c,
                    message: payload.message,
                    updatedTime: payload.updatedTime,
                    nickname: payload.nickname,
                  }
                : c
            );
          } else {
            // 새 채팅방이면 맨 앞에 추가
            next = [
              {
                chatRoomId: payload.chatRoomId,
                lastMessage: payload.message,
                lastAt: payload.updatedTime,
                nickname: payload.nicname,
              },
              ...prev,
            ];
          }
          // 정렬 (최신이 위)
          next.sort(
            (a, b) => new Date(b.updatedTime) - new Date(a.updatedTime)
          );
          return next;
        });
      } catch (e) {
        console.error('WS parse error', e);
      }
    };

    const setupSubscription = async () => {
      console.log('subscribed to /user/queue/chat-list');
      if (!stompClient.connected) {
        await connect(); // 네가 구현한 connect() 호출
        stompClient.onConnect = () => {
          if (!isSubscribed) return;
          // user 전용 queue 구독 (Spring convertAndSendToUser 사용 시)
          subRef.current = stompClient.subscribe(
            '/user/queue/chat-list',
            subscribeHandler,
            { id: `sub-chat-list-${user.userId}` }
          );
        };
      } else {
        // 이미 연결되어 있다면 바로 구독
        subRef.current = stompClient.subscribe(
          '/user/queue/chat-list',
          subscribeHandler,
          { id: `sub-chat-list-${user.userId}` }
        );
      }
    };

    setupSubscription();

    return () => {
      isSubscribed = false;
      try {
        subRef.current?.unsubscribe?.();
      } catch (e) {
        console.log(e);
      }
    };
  }, [user.userId]);

  useEffect(() => {
    //화면 focus 되면 재랜더링
    if (isFocused) {
      const request = async () => {
        setIsLoading(true);
        try {
          const chatRooms = await getChatRooms(user.userId);
          console.log('채팅방 목록 데이터: ', chatRooms);
          setChatList(chatRooms);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };
      request();
    }
  }, [isFocused, user.userId]);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={BLACK} />
        </View>
      ) : (
        <>
          <Text style={{ fontSize: 22, fontWeight: '700' }}>채팅</Text>
          {chatList.length === 0 ? (
            //채팅방 데이터가 없는 경우
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>채팅방이 없습니다.</Text>
              <Text style={styles.emptyText}>
                추천 목록에서 채팅을 시작해 보세요!
              </Text>
            </View>
          ) : (
            //채팅방 데이터가 존재하는 경우
            <FlatList
              data={chatList}
              keyExtractor={(item) => item.chatRoomId.toString()}
              renderItem={({ item }) => <ChatItem data={item} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.list}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: WHITE,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
  },
  list: {},
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatListScreen;
