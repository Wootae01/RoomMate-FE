import { FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WHITE } from '../colors';
import ChatItem from '../components/ChatItem';

const ChatListScreen = () => {
  const dummyData = Array(10).fill(null);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 22, fontWeight: '700' }}>채팅</Text>
      <FlatList
        data={dummyData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={() => <ChatItem />}
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
