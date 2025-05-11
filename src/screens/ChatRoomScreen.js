import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  InteractionManager,
  AppState,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { findAllMessages } from '../api/chat';
import stompClient, {
  connect,
  disconnect,
  sendMessage,
} from '../api/stompClient';
import { PALETTES, PRIMARY } from '../colors';
import Input from '../components/Input';
import Message, { MessageType } from '../components/Message';
import OtherMessage from '../components/OtherMesaage';
import UserContext from '../contexts/UserContext';
import ActiveChatRoomContext from '../contexts/ActiveChatRoomContext';

const ChatRoomScreen = ({ route }) => {
  const [messages, setMessages] = useState([]); //채팅 메시지
  const [inputHeight, setInputHeight] = useState(45); // 기본 높이
  const [content, setContent] = useState(''); //입력한 메시지
  const [chatRoomId, setChatRoomId] = useState(route.params.chatRoomId);
  const { setActiveChatRoomId } = useContext(ActiveChatRoomContext);
  const flatListRef = useRef(null);
  const { user } = useContext(UserContext);

  //자동 스크롤
  useEffect(() => {
    if (messages.length > 0) {
      InteractionManager.runAfterInteractions(() => {
        setTimeout(() => {
          // 렌더링이 모두 끝난 다음 scrollToEnd를 호출 (줄바꿈이 많은 경우)
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      });
    }
  }, [messages]);

  //채팅방 id 변경
  useEffect(() => {
    if (route.params?.chatRoomId) {
      console.log('채팅방 id: ', route.params?.chatRoomId);
      setChatRoomId(route.params.chatRoomId);
      setActiveChatRoomId(route.params?.chatRoomId);
    }
    return () => setActiveChatRoomId(null);
  }, [route.params?.chatRoomId, setActiveChatRoomId]);

  //채팅방의 메시지 가져옴
  useEffect(() => {
    const getMessages = async () => {
      const messages = await findAllMessages(chatRoomId);
      setMessages(messages);
    };
    getMessages();
  }, [chatRoomId]);

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
        disconnect();
      }
    };
  }, [chatRoomId, subscribeToChatRoom]);

  //백에서 포그라운드 전환 시 재연결
  useEffect(() => {
    const change = async (nextAppState) => {
      if (nextAppState === 'active') {
        // 포그라운드로 돌아왔을 때 연결이 끊겼다면 재연결
        if (!stompClient.connected) {
          console.log('포그라운드 전환: WebSocket 연결 재설정');
          await connect();
          subscribeToChatRoom();
        }
      }
    };

    const subscription = AppState.addEventListener('change', change);
    return () => subscription.remove();
  }, [subscribeToChatRoom]);

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
      <KeyboardAvoidingView // 키보드 올라올때 화면 밀어올리도록
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <View style={styles.inner}>
          {/* 메시지 영역 */}
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={({ item }) =>
              item.memberId.toString() === user.userId.toString() ? (
                <Message messageType={MessageType.MY_MESSAGE} message={item} />
              ) : (
                <OtherMessage message={item} />
              )
            }
            onContentSizeChange={() =>
              // 새로운 메세지가 추가돼서 콘텐츠 높이가 바뀌면 호출
              flatListRef.current?.scrollToEnd({ animated: true })
            }
            onLayout={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            } // 채팅방 들어올때 자동으로 맨 아래까지 내려줌
            contentContainerStyle={{ paddingBottom: 10 }}
          />

          {/* 입력 영역 */}
          <View style={styles.inputContainer}>
            <View style={{ flex: 1, marginLeft: 8, marginRight: 3 }}>
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
              style={{ marginRight: 5 }}
              onPress={async () => {
                if (!stompClient.connected) {
                  await connect();
                  stompClient.onConnect = () => {
                    subscribeToChatRoom();
                  };
                }
                if (content.trim() === '') {
                  setContent(content.trim());
                  return;
                }
                try {
                  await sendMessage({
                    memberId: user.userId,
                    chatRoomId,
                    content,
                  });
                  setContent(''); // 메세지 전송 후 입력내용 초기화
                  setInputHeight(45); // 줄바꿈 포함된 메세지 이후 Input 높이 유지되는 현상 방지
                } catch (error) {
                  console.error('메시지 전송 실패', error);
                  Alert.alert('네트워크 에러', ' 잠시 후 다시 시도해 주세요');
                }
              }}
            >
              <MaterialCommunityIcons
                name="send-circle"
                size={45}
                color={content ? PRIMARY.DEFAULT : PALETTES.NEUTRALVARIANT[40]}
              />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    paddingVertical: 8,
  },
  inner: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default ChatRoomScreen;
