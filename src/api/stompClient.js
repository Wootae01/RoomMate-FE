import { Client } from '@stomp/stompjs';
import * as SecureStore from 'expo-secure-store';

const MAX_RETRY_ATTEMPT = 3;
let retryAttempt = 0;

const stompClient = new Client({
  brokerURL: `${process.env.EXPO_PUBLIC_WEBSOCKET_BASE_URL}/ws/chat`,
  forceBinaryWSFrames: true,
  appendMissingNULLonIncoming: true,
  debug: (msg) => console.log('STOMP debug:', msg),
  reconnectDelay: 4000, //4초 후 자동 재연결 요청
  connectHeaders: {},

  heartbeatIncoming: 10000,
  heartbeatOutgoing: 10000,
  connectionTimeout: 12000,
  beforeConnect: () => {
    console.log('beforeConnect: retryAttempt =', retryAttempt);
    if (retryAttempt >= MAX_RETRY_ATTEMPT) {
      console.log('재연결 시도 횟수 초과 웹소켓 연결 종료');
      stompClient.deactivate();
      return false;
    }
  },
});

stompClient.onStompError = (error) => {
  console.log('STOMP error ', error);
};
stompClient.onWebSocketError = (error) => {
  console.log('재연결 횟수: ', retryAttempt);
  console.error('WebSocket error, 연결 끊김 ', error);
  retryAttempt++;
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
    console.log('웹소켓 연결 중 엑세스 토큰 에러', error);
  }
  retryAttempt = 0;
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
    const errorMsg = '연결이 안되어 있습니다. 다시 시도해주세요';
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
