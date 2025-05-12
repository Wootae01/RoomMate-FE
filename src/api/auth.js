import AsyncStorage from '@react-native-async-storage/async-storage';
import { getKeyHashAndroid } from '@react-native-kakao/core';
import { isLogined, login, logout, me, unlink } from '@react-native-kakao/user';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import api from './api';
import * as AuthSession from 'expo-auth-session';


export const getServerToken = async () => {
  try {
    const hash = await getKeyHashAndroid();
    console.log(hash);
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/token`,
      { identifier: hash }
    );
    return response.data;
  } catch (error) {
    console.error('서버 토큰 요청 실패', error);
  }
};

//로그인 상태 확인 메서드
export const isUserLoggedIn = async (setUser) => {
  try {
    const username = await AsyncStorage.getItem('username');
    if (username == null) {
      console.log('user name null');
      return false;
    }

    const response = await api.post(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/check-login`,
      { username: username }
    );
    const userId = response.data.memberId;
    console.log(userId);
    if (userId === -1) {
      console.log('존재x');
      return false;
    } else {
      setUser({ userId: response.data.memberId });
      return true;
    }
  } catch (e) {
    console.log(e);
  }
};

export const kakaoLogin = async () => {
  try {
    getKeyHashAndroid().then(console.log);
    await login();

    const result = await me();
    console.log('카카오 로그인 성공!', result);

    const token = await getServerToken();
    console.log('server token=', token);
    
    // axios 요청 확인을 위해 try-catch 블록을 추가
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/login`,
        { username: `kakao@${result.id}` },
        {
          headers: {
            'Content-Type': 'application/json', // JSON 형식으로 명시
            Authorization: `Bearer ${token.accessToken}`,
          },
        }
      );

      console.log('백엔드 응답:', response.data);
      await SecureStore.setItemAsync('accessToken', response.data.accessToken);
      await SecureStore.setItemAsync(
        'refreshToken',
        response.data.refreshToken
      );

      await AsyncStorage.setItem('username', `kakao@${result.id}`);

      return response.data;
    } catch (axiosError) {
      console.log(
        '백엔드 요청 실패:',
        axiosError.response?.data || axiosError.message
      );
    }
  } catch (error) {
    console.log('KaKao login error:', error.message);
  }
};

export const defaultLogout = async () => {
  try {
    const refreshToken = await SecureStore.getItemAsync('refreshToken');
    await axios.post(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    SecureStore.deleteItemAsync('refreshToken');
    SecureStore.deleteItemAsync('accessToken');
  } catch (error) {
    console.log('로그아웃 실패', error);
  }
};

// Kakao Logout
export const kakaoLogout = async () => {
  try {
    await defaultLogout();

    const checkLoggedIn = isLogined();
    if (checkLoggedIn) {
      console.log('카카오 로그아웃 실행');
      const result = await logout();
      console.log('Kakao Logout 성공 : ', result);
    }
  } catch (err) {
    console.log('Logout error', err?.response?.data);
    throw err;
  }
};

/**
 * 구글 로그아웃
 * @returns 성공 여부  : success : true
 */
export const googleLogout = async () => {
  try {
    await defaultLogout();

    const checkLoggedIn = isLogined();
    if (checkLoggedIn) {
      console.log('구글 로그아웃 실행');
      const googleAccessToken = await SecureStore.getItemAsync('googleAccessToken');

    if (googleAccessToken) {
            const result = await AuthSession.revokeAsync(
              { token: googleAccessToken },
              { revocationEndpoint: 'https://oauth2.googleapis.com/revoke' }
            );
            console.log('Google Logout 성공 : ', result);
          } 
          // accessToken 삭제
          await SecureStore.deleteItemAsync('googleAccessToken');
        }
      } catch (err) {
        console.log('Logout error', err?.response?.data || err.message);
        throw err;
      }
};

/**
 * 카카오 회원 탈퇴 처리
 * @param {number} memberId 사용자 id
 * @returns 성공 여부  : success : true
 */
export const reSign = async (memberId) => {
  try {
    console.log('회원탈퇴 실행');
    const refreshToken = await SecureStore.getItemAsync('refreshToken');

    const response = await axios.delete(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/members/${memberId}/resign`,

      { headers: { Authorization: `Bearer ${refreshToken}` } }
    );
    console.log('회원탈퇴에 대한 백엔드 응답 : ', response.data);

    SecureStore.deleteItemAsync('accessToken');
    SecureStore.deleteItemAsync('refreshToken');

    await unlinkKakao();

    return response.data;
  } catch (error) {
    console.log('회원탈퇴 error', error?.response?.data);
    throw error;
  }
};

export const unlinkKakao = async () => {
  try {
    console.log('카카오 Unlink 실행');

    const result = await unlink();

    console.log('Kakao unlink 성공 : ', result);
    return result;
  } catch (err) {
    console.error('unlink error', err);
  }
};
