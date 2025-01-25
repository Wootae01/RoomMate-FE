import {
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

const LoginScreen = () => {
  const width = useWindowDimensions().width;
  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={() => {
          console.log('naver button');
        }}
        style={styles.container}
      >
        <Image
          source={require('../../assets/login/naver.png')}
          style={{ width: width * 0.9, height: width * 0.2 }}
          resizeMode="contain"
        />
      </Pressable>
      <Pressable
        onPress={() => {
          console.log('google button');
        }}
        style={styles.container}
      >
        <Image
          source={require('../../assets/login/kakao.png')}
          style={{ width: width * 0.9, height: width * 0.2 }}
          resizeMode="contain"
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});

export default LoginScreen;
