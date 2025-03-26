import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

/**
 * axios 기본 설정
 * 요청 시 access 토큰을 같이 보낸다.
 * 토큰 만료 시 refresh 토큰으로 access 토큰 갱신신
 */
const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const accessToken = await SecureStore.getItemAsync('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.data.code === 'EXPIRED_TOKEN' &&
      !originalRequest._retry //무한 루프 방지. 재시도 안했을 때만 수행
    ) {
      try {
        console.log('token 재발급 시도');
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        originalRequest._retry = true;
        if (refreshToken) {
          const response = await axios.post(
            `${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/reissue`,
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
                'Content-Type': 'application/json',
              },
            }
          );
          await SecureStore.setItemAsync(
            'accessToken',
            response.data.accessToken
          );
          await SecureStore.setItemAsync(
            'refreshToken',
            response.data.refreshToken
          );
          return api(originalRequest);
        } else {
          // refreshToken이 없을 경우  (로그인 화면으로 이동)
          console.log('Refresh token 없음');
        }
      } catch (error) {
        //refresh token 만료 시시
        if (error.response && error.response.data.code === 'EXPIRED_TOKEN') {
          console.log('refresh token 만료됨', error);
          //추후 로그인 화면으로 이동 구현
        } else {
          console.log('리프레시 토큰 요청 에러');
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
