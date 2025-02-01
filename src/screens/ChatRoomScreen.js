import { StyleSheet, Text, View } from 'react-native';

const ChatRoomScreen = () => {
  return (
    <View style={styles.container}>
      <Text>채팅 방</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatRoomScreen;
