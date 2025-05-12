import * as Google from 'expo-auth-session/providers/google';
import { useEffect, useState, useContext } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  useWindowDimensions,
  View,
  Alert,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { SignRoutes } from '../navigations/routes';
import UserContext from '../contexts/UserContext';
import { BLACK } from '../colors';
import { getServerToken } from '../api/auth';

export default function GoogleLoginButton() {
  const width = useWindowDimensions().width;
  const navigation = useNavigation();
  const { setUser } = useContext(UserContext);

  //console.log('최종 redirectUri:', redirectUri);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    useProxy: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loginWithGoogle = async () => {
      if (response?.type === 'success') {
        try {
          setIsLoading(true);

          //console.log('response:', response);
          console.log('구글 Login API accessToken:', response?.authentication?.accessToken); 
          const GaccessToken = response.authentication.accessToken;
          // accessToken 저장
          await SecureStore.setItemAsync('googleAccessToken', GaccessToken);
          
          // 사용자 정보 요청
          const userInfoResponse = await axios.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            {
              headers: {
                Authorization: `Bearer ${GaccessToken}`,
              },
            }
          );

          const googleId = userInfoResponse.data.sub;
          console.log("googleId 확인:", googleId);

          const token = await getServerToken();
          console.log('server token=', token);

          // 백엔드 로그인 요청
          const backendResponse = await axios.post(
            `${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/login`,
            { username: `google@${googleId}` },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.accessToken}`,
              },
            }
          );

          console.log('백엔드 응답:', backendResponse.data); 

          const { isFirstLogin, memberId } = backendResponse.data;

          await SecureStore.setItemAsync('accessToken', backendResponse.data.accessToken);
          await SecureStore.setItemAsync('refreshToken', backendResponse.data.refreshToken);
          await AsyncStorage.setItem('username', `google@${googleId}`);

          if (!isFirstLogin) {
            setUser({ userId: memberId });
          } else {
            navigation.navigate(SignRoutes.PROFILE_SURVEY, { userId: memberId });
          }
        } catch (err) {
          console.log('Google login error:', err);
          Alert.alert('에러 발생', '구글 로그인 실패');
        } finally {
          setIsLoading(false);
        }
      }
    };

    loginWithGoogle();
  }, [response]);

  return (
    <Pressable
      onPress={() => {
        if (!request) return;
        promptAsync({ useProxy: false, showInRecents: true }).then(console.log);
      }}
      style={{ alignItems: 'center', paddingVertical: 20 }}
    >
      {isLoading ? (
        <View
          style={{
            width: width * 0.95,
            height: width * 0.2,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: 8,
            borderColor: BLACK,
            borderWidth: 1.5,
          }}
        >
          <ActivityIndicator size="large" color="#4285F4" />
        </View>
      ) : (
        <View
        style={{
          width: width * 0.95,
          height: width * 0.2,
          borderRadius: 7,
          borderColor: '#C0C0C0',  // 후보 : BBBBBB, B0BEC5
          borderWidth: 1.5,  
        }}
        >
        <Image
          source={require('../../assets/login/google.png')}
          style={{
            width: '100%',
            height: '103%',
          }}
          resizeMode="cover"
        />
        </View>
      )}
    </Pressable>
  );
}
