import { getKeyHashAndroid } from '@react-native-kakao/core';
import { login } from '@react-native-kakao/user';
import axios from 'axios';

export const kakaoLogin = async () => {
  try {
    getKeyHashAndroid().then(console.log); //안드로이드 해시 코드 확인
    const result = await login();
    console.log(result);

    //후속 작업
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/kakao/callback`,
      { code: result.accessToken }
    );
    console.log(response);

    return response;
  } catch (error) {
    console.log('KaKao login error:', error.message);
  }
};
