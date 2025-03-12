import axios from 'axios';

/**
 * 나의 모든 채팅방 목록 가져오는 api 요청
 *
 * @param {number} memberId
 * @returns 채팅방 목록
 */
export const getChatRooms = async (memberId) => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/members/${memberId}/chatrooms`
    );
    return response.data;
  } catch (error) {
    console.log('fail get chatrooms');
    throw error;
  }
};

/**
 * 새로운 채팅방 생성 api 요청. 이미 그 상대방과 채팅방 있으면 기존 채팅방 반환
 *
 * @param {number} member1Id 사용자 id
 * @param {number} member2Id 상대방 id
 * @return chtRoomId
 *  */
export const createChatRoom = async (member1Id, member2Id) => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/chatroom`,
      { member1Id: member1Id, member2Id: member2Id },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return response.data;
  } catch (error) {
    console.log('Error create ChatRoom', error);
    throw error;
  }
};

/**
 * 특정 채팅방의 모든 메시지 가져오는 api 요쳥 메서드
 *
 * @param {number} chatRoomId
 * @returns 해당 채팅방의 모든 메시지지
 */
export const findAllMessages = async (chatRoomId) => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/chatroom/${chatRoomId}/messages`
    );
    return response.data;
  } catch (error) {
    console.log('Eror Get Chatting Message ', error);
    throw error;
  }
};
/**
 * 채팅 알림 토큰 저장 요청을 하는 api 메서드
 *
 * @param {number} memberId 사용자 Id
 * @param {string} token 알림 토큰 정보
 * @returns
 */
export const saveNotificationsToken = async (memberId, token) => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/notifications/token`,
      { memberId: memberId, token: token }
    );
    return response.data;
  } catch (error) {
    console.log('Eror Save Notification ', error.response?.data?.message);
    throw error;
  }
};
