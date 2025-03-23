import api from './api';

/**
 * 첫 로그인 시 회원정보 폼 전달하는 api 요청
 * memberData = profile, lifestlye, preference 전부
 * @param {JSON} memberData
 * @return "success"
 */

export const signUp = async (memberData) => {
  try {
    const response = await api.post(
      `/auth/signup`, // singupController로 전송
      memberData,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    console.log('회원가입 폼 전달에 대한 백엔드 응답:', response.data);
    return response.data;
  } catch (axiosError) {
    console.error(
      '회원가입 폼 전달에 대한 백엔드 요청 실패:',
      axiosError.response?.data || axiosError.message
    );
    throw axiosError;
  }
};
