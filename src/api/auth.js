import { getKeyHashAndroid } from '@react-native-kakao/core';
import { getAccessToken, login, logout, unlink } from '@react-native-kakao/user';
import axios from 'axios';

export const kakaoLogin = async () => {
  try {
    getKeyHashAndroid().then(console.log);
    const result = await login();

    console.log('URL', process.env.EXPO_PUBLIC_API_BASE_URL);
    console.log('카카오 로그인 성공!', result);

    const accessToken = result.accessToken;
    console.log('Access Token:', accessToken);

    const token = await getAccessToken();
    console.log('액세스토큰 확인 : ', token)
    // axios 요청 확인을 위해 try-catch 블록을 추가
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/kakao/callback`,
        { accessToken: accessToken },
        {
          headers: {
            'Content-Type': 'application/json', // JSON 형식으로 명시
          },
        }
      );
      console.log('백엔드 응답:', response.data);

      return response.data;
    } catch (axiosError) {
      console.error(
        '백엔드 요청 실패:',
        axiosError.response?.data || axiosError.message
      );
    }
  } catch (error) {
    console.log('KaKao login error:', error.message);
  }
};


// Kakao Logout

export const kakaoLogout = async () => {
  try {
    const token = await getAccessToken();
    console.log('로그아웃 직전 토큰 유무 확인 : ', token);

    console.log('카카오 로그아웃 실행')

    const result = await logout();

    console.log('Kakao Logout 성공 : ', result);

  } catch (err) {
    console.error("Logout error", err);
  }
}

/**
 * 회원 탈퇴 처리
 * @param {number} memberId 사용자 id
 * @returns 성공 여부  : success : true
 */
export const reSign = async (memberId) => {
  try {
    console.log('회원탈퇴 실행')
    const response = await axios.delete(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/members/${memberId}/resign`
    );

    console.log('회원탈퇴에 대한 백엔드 응답 : ', response.data)

    await unlinkKakao();

    return response.data;

  } catch (error) {
    console.error("회원탈퇴 error", error);
  }
};

export const unlinkKakao = async() => {
  try {
  
    console.log('카카오 Unlink 실행')

    const result = await unlink();

    console.log('Kakao unlink 성공 : ', result);
    return result

  } catch (err) {
    console.error("unlink error", err);
  }
}