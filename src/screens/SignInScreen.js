import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import { useContext, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { kakaoLogin } from '../api/auth';
import { PALETTES } from '../colors';
import UserContext from '../contexts/UserContext';
import { SignRoutes } from '../navigations/routes';
import GoogleLoginButton from '../components/GoogleLoginButton';
//import { naverLogin } from '../api/naverLogin';

const SignInScreen = () => {
  const width = useWindowDimensions().width;
  const navigation = useNavigation();
  const { setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState();

  const pressKakao = async () => {
    if (isLoading == true) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await kakaoLogin();

      if (!response.isFirstLogin) {
        setUser({ userId: response.memberId });
      } else {
        navigation.navigate(SignRoutes.PROFILE_SURVEY, {
          userId: response.memberId,
        }); //아니면 회원가입 화면으로
      }
    } catch (e) {
      console.log(e.message);
      Alert.alert('에러', '카카오 로그인 실패');
    } finally {
      setIsLoading(false);
    }
  };

  // const pressNaver = async () => {
  //   if (isLoading) return;
  //   setIsLoading(true);
  //   try {
  //     const response = await naverLogin(); // Naver 로그인 수행

  //     if (!response.isFirstLogin) {
  //       // 기존 가입자
  //       setUser({ userId: response.memberId });
  //     } else {
  //       // 신규 가입자
  //       navigation.navigate(SignRoutes.PROFILE_SURVEY, {
  //         userId: response.memberId,
  //       });
  //     }
  //   } catch (e) {
  //     Alert.alert('에러', '네이버 로그인 실패');
  //     console.log('네이버 로그인 오류', e);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
//   <Pressable onPress={pressNaver} style={styles.container}>
//   {isLoading ? (
//     <ActivityIndicator size="large" color="green" />
//   ) : (
//     // 네이버 버튼 이미지
//     <Image
//       source={require('../../assets/login/naver.png')}
//       style={{ width: width * 0.95, height: width * 0.2 }}
//       resizeMode="cover"
//     />
//   )}
// </Pressable>
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.wrapper}>

        <GoogleLoginButton />
        
        <Pressable onPress={pressKakao} style={styles.container}>
          {isLoading ? (
            <View
              style={{
                width: width * 0.95,
                height: width * 0.2,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FEE500',
                borderRadius: 8,
              }}
            >
              <ActivityIndicator size="large" color={PALETTES.SECONDARY[60]} />
            </View>
          ) : (
            <Image
              source={require('../../assets/login/kakao.png')}
              style={{ width: width * 0.95, height: width * 0.2 }}
              resizeMode="cover"
            />
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

SignInScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
  },
});

export default SignInScreen;
