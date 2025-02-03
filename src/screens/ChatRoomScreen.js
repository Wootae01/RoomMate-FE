import { StyleSheet, Text, View } from 'react-native';
import ChatItem from '../components/ChatItem';
import { WHITE } from '../colors';

const ChatRoomScreen = () => {
  return (
    <View style={styles.container}>
      <Text>채팅 방</Text>
      <ChatItem />
      <ChatItem />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: WHITE,
  },
});

export default ChatRoomScreen;
