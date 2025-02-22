import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PALETTES, PRIMARY } from '../colors';
import Input from '../components/Input';
import Message, { MessageType } from '../components/Message';
import OtherMessage from '../components/OtherMesaage';
import PropTypes from 'prop-types';
import { findAllMessages } from '../api/chat';
import stompClient, { connect, sendMessage } from '../api/stompClient';

const ChatRoomScreen = ({ route }) => {
  const [messages, setMessages] = useState([]); //채팅 메시지
  const [inputHeight, setInputHeight] = useState(45); // 기본 높이
  const [content, setContent] = useState(''); //입력한 메시지
  const [chatRoomId, setChatRoomId] = useState(route.params.chatRoomId);
  const flatListRef = useRef(null);

  //자동 스크롤
  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  //채팅방 id 변경
  useEffect(() => {
    if (route.params?.chatRoomId) {
      setChatRoomId(route.params.chatRoomId);
    }
  }, [route.params?.chatRoomId]);

  //채팅방의 메시지 가져옴
  useEffect(() => {
    const getMessages = async () => {
      const messages = await findAllMessages(chatRoomId);
      setMessages(messages);
    };
    getMessages();
  }, [chatRoomId]);

  useEffect(() => {}, [messages]); //메시지 바뀌면 랜더링

  //실시간으로 메시지 받음(구독)
  useEffect(() => {
    if (!stompClient.connected) {
      connect();
      stompClient.onConnect = () => {
        subscribeToChatRoom();
      };
    } else {
      subscribeToChatRoom();
    }
    return () => {
      if (stompClient.connected) {
        stompClient.unsubscribe(`sub-${chatRoomId}`);
      }
    };
  }, [chatRoomId, subscribeToChatRoom]);

  //구독 함수
  const subscribeToChatRoom = useCallback(() => {
    stompClient.subscribe(
      `/topic/chatroom/${chatRoomId}`,
      (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prev) => [...prev, newMessage]);
        console.log(JSON.parse(message.body).content);
      },
      { id: `sub-${chatRoomId}` }
    );
  }, [chatRoomId]);

  return (
    <SafeAreaView style={styles.container}>
      {/* 메시지 영역 */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) =>
          item.memberId === 1 ? ( //임시로 id 설정 ★★★★★
            <Message messageType={MessageType.MY_MESSAGE} message={item} />
          ) : (
            <OtherMessage message={item} />
          )
        }
      />

      {/* 입력 영역 */}
      <View style={styles.inputContainer}>
        <View style={{ flex: 1 }}>
          <Input
            value={content}
            onChangeText={(content) => setContent(content)}
            multiline={true}
            onContentSizeChange={(event) =>
              setInputHeight(event.nativeEvent.contentSize.height)
            }
            customStyle={{ height: Math.max(45, inputHeight) }}
          />
        </View>

        {/**전송 버튼 */}
        <Pressable
          onPress={async () => {
            await sendMessage({
              nickname: '1',
              chatRoomId,
              content,
            }); //임시로 닉네임 설정 ★★★★★
            setContent('');
          }}
        >
          <MaterialCommunityIcons
            name="send-circle"
            size={45}
            color={content ? PRIMARY.DEFAULT : PALETTES.NEUTRALVARIANT[40]}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

ChatRoomScreen.propTypes = {
  route: PropTypes.object,
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
