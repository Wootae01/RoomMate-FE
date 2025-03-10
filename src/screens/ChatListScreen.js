import { useIsFocused } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getChatRooms } from '../api/chat';
import { WHITE } from '../colors';
import ChatItem from '../components/ChatItem';
import UserContext from '../contexts/UserContext';

const ChatListScreen = () => {
  const [chatList, setChatList] = useState([]);
  const isFocused = useIsFocused();
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (isFocused) {
      const request = async () => {
        try {
          const chatRooms = await getChatRooms(user.userId);
          console.log('채팅방 목록 데이터: ', chatRooms);
          setChatList(chatRooms);
        } catch (error) {
          console.log(error);
        }
      };
      request();
    }
  }, [isFocused, user.userId]);

  return (
    <SafeAreaView style={styles.container}>
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
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <ChatItem data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
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
});

export default ChatListScreen;
