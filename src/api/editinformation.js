import api from './api';

/**
 * 회원정보 수정 시 회원정보 전달하는 api 요청
 *
 * @param {JSON} memberData
 * @param {number} memberId
 * @param {Json} memberprofile
 * @param {Json} memberlifestlye
 * @param {Json} memberpreference
 * @return "success" : "true"
 */

export const editProfile = async (
  memberId,
  nickname,
  gender,
  age,
  dormitory,
  introduce
) => {
  try {
    const requestData = {
      nickname: nickname,
      gender: gender,
      age: age,
      dormitory: dormitory,
      introduce: introduce,
    };
    const response = await api.post(
      `/members/${memberId}/editprofile`, // membercontroller로 전송
      requestData,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    console.log('Member profile 수정 전달에 대한 백엔드 응답:', response.data);
    return response.data;
  } catch (axiosError) {
    console.error(
      'Member profile 전달에 대한 백엔드 요청 실패:',
      axiosError.response?.data || axiosError.message
    );
    throw axiosError;
  }
};

export const editLifeStyle = async (memberId, memberLifestyle) => {
  const requestData = { options: memberLifestyle };
  try {
    const response = await api.post(
      `/members/${memberId}/editlifestyle`, // membercontroller로 전송
      requestData,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    console.log(
      'Member LifeStlye 수정 전달에 대한 백엔드 응답:',
      response.data
    );
    return response.data;
  } catch (axiosError) {
    console.error(
      'Member LifeStlye 수정 전달에 대한 백엔드 요청 실패:',
      axiosError.response?.data || axiosError.message
    );
    throw axiosError;
  }
};

export const editPreference = async (memberId, memberPreference) => {
  const requestData = {
    options: memberPreference,
  };
  try {
    const response = await api.post(
      `/members/${memberId}/editpreference`, // membercontroller로 전송
      requestData,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    console.log(
      'Member Preference 수정 전달에 대한 백엔드 응답:',
      response.data
    );
    return response.data;
  } catch (axiosError) {
    console.error(
      'Member Preference 수정 전달에 대한 백엔드 요청 실패:',
      axiosError.response?.data || axiosError.message
    );
    throw axiosError;
  }
};

/**
 * 사용자 알림 설정 수정 요청 메서드
 *
 * @param {number} memberId
 * @param {boolean} chatToggle
 * @returns
 */
export const editNotification = async (memberId, chatToggle) => {
  const requestData = {
    permission: chatToggle,
  };
  try {
    const response = await api.post(
      `/notifications/${memberId}/settings`, // membercontroller로 전송
      requestData,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    return response.data;
  } catch (axiosError) {
    console.error(
      '알림 수정 실패',
      axiosError.response?.data || axiosError.message
    );
    throw axiosError;
  }
};
