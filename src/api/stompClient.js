import { Client } from '@stomp/stompjs';
import * as SecureStore from 'expo-secure-store';

const stompClient = new Client({
  brokerURL: `${process.env.EXPO_PUBLIC_WEBSOCKET_BASE_URL}/ws/chat`,
  forceBinaryWSFrames: true,
  appendMissingNULLonIncoming: true,
  debug: (msg) => console.log('STOMP debug:', msg),
  reconnectDelay: 4000, //4초 후 자동 재연결 요청
  connectHeaders: {},
});

stompClient.onStompError = (error) => {
  console.log('STOMP error ', error);
};
stompClient.onWebSocketError = (error) => {
  console.error('websocket error ', error);
};

//웹 소켓 연결 해제
export const disconnect = () => {
  stompClient.deactivate();
};

//웹 소켓 연결
export const connect = async () => {
  try {
    const token = await SecureStore.getItemAsync('accessToken');
    stompClient.connectHeaders = {
      Authorization: `Bearer ${token}`,
    };
  } catch (error) {
    console.error('토큰 불러오는 중 에러', error);
  }
  stompClient.activate();
};

/**
 * 메시지 전송 메서드
 *
 * @param {string} nickname
 * @param {*} chatRoomId
 * @param {*} content
 * @returns
 */
export const sendMessage = ({ memberId, chatRoomId, content }) => {
  if (!stompClient.connected) {
    const errorMsg = 'fail send message. STOMP Client is not connected';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  const messageDTO = {
    memberId: memberId,
    chatRoomId: chatRoomId,
    content: content,
    sendTime: new Date().toISOString(),
  };

  try {
    stompClient.publish({
      destination: `/app/chatroom/${chatRoomId}`,
      body: JSON.stringify(messageDTO),
    });
  } catch (error) {
    console.error('Failed to publish message:', error);
    throw new Error('Message publishing failed');
  }
  return messageDTO;
};

export default stompClient;
