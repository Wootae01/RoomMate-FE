import { getKeyHashAndroid } from '@react-native-kakao/core';
import { login, logout } from '@react-native-kakao/user';
import axios from 'axios';

export const kakaoLogin = async () => {
  try {
    getKeyHashAndroid().then(console.log);
    const result = await login();

    console.log('URL', process.env.EXPO_PUBLIC_API_BASE_URL);
    console.log('카카오 로그인 성공!', result);

    const accessToken = result.accessToken;
    console.log('Access Token:', accessToken);

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
    console.log('카카오 로그아웃 실행')
    const result = await logout();
    const message = result.toString();

    console.log('Kakao Login 성공', message);

  } catch (err) {
    console.error("Logout error", err);
  }
}
