import { Client } from '@stomp/stompjs';

const stompClient = new Client({
  brokerURL: `${process.env.EXPO_PUBLIC_WEBSOCKET_BASE_URL}/ws/chat`,
  forceBinaryWSFrames: true,
  appendMissingNULLonIncoming: true,
  debug: (msg) => console.log('STOMP debug:', msg),
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

//웹 소켓 연결결
export const connect = () => {
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
export const sendMessage = ({ nickname, chatRoomId, content }) => {
  if (!stompClient.connected) {
    console.error('fail send message. STOMP Client is not connected');
    return;
  }

  const messageDTO = {
    memberId: 1, //임시로 설정 ★★★★★★
    nickname: nickname,
    chatRoomId: chatRoomId,
    content: content,
    sendTime: new Date().toISOString(),
  };
  stompClient.publish({
    destination: `/app/chatroom/${chatRoomId}`,
    body: JSON.stringify(messageDTO),
  });
  return messageDTO;
};

export default stompClient;
