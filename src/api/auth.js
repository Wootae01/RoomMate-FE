import { Linking } from 'react-native';

export const kakaoLogin = async () => {
  const REST_API_KEY = '813ed8dc237356e90d7a1dd08cec8591';
  const REDIRECT_URI = 'http://localhost:8080/auth/login/callback';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  try {
    await Linking.openURL(KAKAO_AUTH_URL);
  } catch (error) {
    console.log('KaKaO login error:', error.message);
  }
};
