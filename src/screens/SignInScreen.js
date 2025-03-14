import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import {
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { kakaoLogin } from '../api/auth';
import { MainRoutes, SignRoutes } from '../navigations/routes';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

const SignInScreen = () => {
  const width = useWindowDimensions().width;
  const navigation = useNavigation();
  const { setUser } = useContext(UserContext);
  const pressKakao = async () => {
    const response = await kakaoLogin();
    setUser({ userId: response.userId, accessToken: response.accessToken });
    if (!response.isFirstLogin) {
      navigation.navigate(MainRoutes.CONTENT_TAB); //이미 회원가입 했으면 홈화면으로
    } else {
      navigation.navigate(SignRoutes.PROFILE_SURVEY); //아니면 회원가입 화면으로
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.wrapper}>
        <Pressable
          onPress={() => navigation.navigate(SignRoutes.PROFILE_SURVEY)}
          style={styles.container}
        >
          <Image
            source={require('../../assets/login/naver.png')}
            style={{
              width: width * 0.95,
              height: width * 0.2,
            }}
            resizeMode="cover"
          />
        </Pressable>
        <Pressable onPress={pressKakao} style={styles.container}>
          <Image
            source={require('../../assets/login/kakao.png')}
            style={{ width: width * 0.95, height: width * 0.2 }}
            resizeMode="cover"
          />
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
