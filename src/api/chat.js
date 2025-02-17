import { Client } from '@stomp/stompjs';
import axios from 'axios';

const stompClient = new Client({
  brokerURL: 'ws://localhost:8080/ws/chat',
});

//추천 목록에서 채팅 시작
export const startChat = async (member1Id, member2Id) => {
  const { chat_room_id: chatRoomId } = await createChatRoom(
    member1Id,
    member2Id
  );
  connectChatRoom(chatRoomId);
  return findAllMessage(chatRoomId);
};

//채팅방 데이터 가져오고, webSocket 연결
export const loadChatRoom = async (chatRoomId) => {
  connectChatRoom(chatRoomId);
  return findAllMessage(chatRoomId);
};

//나의 모든 채팅방 정보 가져오는 요청
export const getChatRooms = async (memberId) => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_BASE_URL}/members/${memberId}/chatrooms`
    );
    return response.data;
  } catch (error) {
    console.log('fail get chatrooms');
    throw error;
  }
};

//채팅방 들어갈 때 연결 후 구독
const connectChatRoom = (chatRoomId) => {
  if (!stompClient.connected) {
    stompClient.activate();
  }

  stompClient.unsubscribe();
  stompClient.subscribe(`/topic/chatroom/${chatRoomId}`, (message) => {
    console.log(JSON.parse(message.body).content);
  });
};

//메시지 전송하는 함수
export const sendMessage = (nickname, chatRoomId, content) => {
  if (!stompClient.connected) {
    console.error('fail send message. STOMP Client is not connected');
    return;
  }
  const messageDTO = {
    nickname: nickname,
    chatRoomId: chatRoomId,
    content: content,
    sendTime: new Date().toISOString(),
  };
  stompClient.send(
    `/app/chatroom/${chatRoomId}`,
    {
      /**인증 헤더 */
    },
    JSON.stringify(messageDTO)
  );
};

//새로운 채팅방 생성 api 요청
const createChatRoom = async (member1Id, member2Id) => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_BASE_URL}/chatroom`,
      { member1Id, member2Id },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    console.log('Error create ChatRoom');
    throw error;
  }
};

//특정 채팅방의 모든 채팅 기록 가져옴
const findAllMessage = async (chatRoomId) => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_BASE_URL}/chatroom/${chatRoomId}/messages`
    );
    return response.data;
  } catch (error) {
    console.log('Eror Get Chatting Message');
    throw error;
  }
};

//웹 소켓 연결 해제
export const disconnect = () => {
  stompClient.deactivate();
};

stompClient.onWebSocketError = (error) => {
  console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
  console.error('Broker reported error: ' + frame.headers['message']);
  console.error('Additional details: ' + frame.body);
};
