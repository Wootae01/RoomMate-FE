import PropTypes from 'prop-types';

import {
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignInScreen = ({ navigation }) => {
  const width = useWindowDimensions().width;

  const onSubmit = () => navigation.navigate('MyInfoSurvey'); //나중에 로그인 api 요쳥 부분 추가 하면 될듯

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.wrapper}>
        <Pressable onPress={onSubmit} style={styles.container}>
          <Image
            source={require('../../assets/login/naver.png')}
            style={{
              width: width * 0.95,
              height: width * 0.2,
            }}
            resizeMode="cover"
          />
        </Pressable>
        <Pressable onPress={onSubmit} style={styles.container}>
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

SignInScreen.prototypes = {
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
    height: 100,
    paddingVertical: 20,
    marginVertical: 10,
  },
});

export default SignInScreen;
