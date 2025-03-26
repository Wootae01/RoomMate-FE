import { StyleSheet, View } from 'react-native';
import MainStack from './MainStack';
import { useContext, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import { isUserLoggedIn } from '../api/auth';
import SignUpStack from './SignUpStack';

const Navigation = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const checkLoggedIn = async () => {
      console.log('로그인 여부 확인');
      const result = await isUserLoggedIn(setUser);
      console.log('Login result:', result);
    };
    checkLoggedIn();
  }, [setUser]);
  return (
    <View style={styles.container}>
      {user?.userId ? <MainStack /> : <SignUpStack />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Navigation;
