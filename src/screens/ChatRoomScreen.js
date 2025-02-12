import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PALETTES, PRIMARY } from '../colors';
import Input from '../components/Input';
import Message, { MessageType } from '../components/Message';
import OtherMessage from '../components/OtherMesaage';
const ChatRoomScreen = () => {
  const [message, setMessage] = useState('');
  const [inputHeight, setInputHeight] = useState(45); // 기본 높이
  const sendMessage = () => {
    setMessage('');
    setInputHeight(45);
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* 메시지 영역 */}
      <View style={styles.messageContainer}>
        <OtherMessage />
        <Message messageType={MessageType.MY_MESSAGE} />
      </View>

      {/* 입력 영역 */}
      <View style={styles.inputContainer}>
        <View style={{ flex: 1 }}>
          <Input
            value={message}
            onChangeText={(message) => setMessage(message)}
            multiline={true}
            onContentSizeChange={(event) =>
              setInputHeight(event.nativeEvent.contentSize.height)
            }
            customStyle={{ height: Math.max(45, inputHeight) }}
          />
        </View>

        <Pressable onPress={sendMessage}>
          <MaterialCommunityIcons
            name="send-circle"
            size={45}
            color={message ? PRIMARY.DEFAULT : PALETTES.NEUTRALVARIANT[40]}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ChatRoomScreen;
