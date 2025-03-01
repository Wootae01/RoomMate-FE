import { useIsFocused } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
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
          console.log(chatRooms);
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
      <FlatList
        data={chatList}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <ChatItem data={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
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
  list: {},
});

export default ChatListScreen;
