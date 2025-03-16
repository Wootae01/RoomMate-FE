import axios from 'axios';

/**
 * 추천목록에서 상대방 '프로필 조회' 누를 시 상대 프로필 정보를 백엔드에서 반환 api 요청
 * @param {number} friendId
 * @return FriendData(basic+lifestyle+preferecne) : SignUpDTO Type
 */

export const getFriendInformation = async (friendId) => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/members/${friendId}/information`, // membercontroller의 getFriendInformatino() 호출
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    console.log('Friend Profile 반환에 대한 백엔드 응답:', response.data);
    return response.data;
  } catch (axiosError) {
    console.error(
      'Friend Profile 반환에 대한 백엔드 요청 실패:',
      axiosError.response?.data || axiosError.message
    );
  }
};

/**
 * 본인 Id를 통해 본인 프로필 정보를 백엔드에서 반환 api 요청
 *
 * @param {number} memberId
 * @return Basic || LifeStyle || Preference
 */

// 사용자의 Basic_Profile만 가져올 경우 : EditMemberDTO Type
export const getProfile = async (memberId) => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/members/${memberId}/basic`, // membercontroller의 getProfile()로 전송
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    console.log(
      'Member basic profile 조회 요청에 대한 백엔드 응답:',
      response.data
    );
    return response.data;
  } catch (axiosError) {
    console.error(
      'Member basic profile 조회 요청에 대한 백엔드 요청 실패:',
      axiosError.response?.data || axiosError.message
    );
  }
};

// 사용자의 LifeStyle만 가져올 경우 : LifeStyleDTO Type = Map<String, List<Long>>
export const getLifeStyle = async (memberId) => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/members/${memberId}/lifestyle`, // membercontroller의 getLifeStyle()로 전송
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    console.log(
      'Member LifeStyle 조회 요청에 대한 백엔드 응답:',
      response.data
    );
    return response.data;
  } catch (axiosError) {
    console.error(
      'Member LifeStyle 조회 요청에 대한 백엔드 요청 실패:',
      axiosError.response?.data || axiosError.message
    );
  }
};

// 사용자의 Preference만 가져올 경우 : PreferenceDTO Type = Map<String, List<Long>>
export const getPreference = async (memberId) => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/members/${memberId}/preference`, // membercontroller의 getPreference()로 전송
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    console.log(
      'Member Preference 조회 요청에 대한 백엔드 응답:',
      response.data
    );
    return response.data;
  } catch (axiosError) {
    console.error(
      'Member Preference 조회 요청에 대한 백엔드 요청 실패:',
      axiosError.response?.data || axiosError.message
    );
  }
};

/**
 * 사용자 닉네임 정보 반환
 * @param {number} memberId 사용자 id
 * @returns 닉네임
 */
export const getNickName = async (memberId) => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/members/${memberId}/nickname`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
/**
 * 사용자 알림 설정 정보 조회 메서드
 *
 * @param {number} memberId
 * @returns
 */
export const getNotificationAsync = async (memberId) => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/notifications/${memberId}/settings`
    );
    return response.data;
  } catch (error) {
    console.log('알림 정보 조회 실패', error);
  }
};
