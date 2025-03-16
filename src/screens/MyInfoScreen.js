import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { WHITE } from '../colors';
import DefaultProfile from '../components/DefaultProfile';
import HR from '../components/HR';
import TextButton from '../components/TextButton';
import { MainRoutes, MyInfoRoutes } from '../navigations/routes';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../contexts/UserContext';
import { getNickName } from '../api/getinformation';
import { kakaoLogout, reSign } from '../api/auth';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from '../utils/notifications';

/**
 * 내 정보 화면
 */
const MyInfoScreen = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const [nickname, setNickname] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNickName(user.userId);
        setNickname(data);
      } catch (error) {
        console.error('Fail to get nickname', error);
      }
    };
    fetchData();
  }, [user.userId, setNickname]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profile}>
        <DefaultProfile size={60} />
        <Text
          style={[{ fontSize: 20, fontWeight: '700', paddingVertical: 15 }]}
        >
          {nickname}
        </Text>
      </View>

      <View style={styles.update}>
        <HR customStyles={{ container: { paddingVertical: 10 } }} />
        <Text style={styles.title}>내 정보 수정</Text>

        <TextButton
          text="기본 정보 수정"
          onPress={() => {
            navigation.navigate(MainRoutes.MY_INFO, {
              screen: MyInfoRoutes.MY_INFO_UPDATE,
            });
          }}
        />
        <TextButton
          text="생활 패턴 정보 수정"
          onPress={() => {
            navigation.navigate(MainRoutes.MY_INFO, {
              screen: MyInfoRoutes.LIFE_STYLE,
            });
          }}
        />
        <TextButton
          text="선호하는 룸메 수정"
          onPress={() => {
            navigation.navigate(MainRoutes.MY_INFO, {
              screen: MyInfoRoutes.PREFERENCE,
            });
          }}
        />
      </View>
      <HR customStyles={{ container: { paddingVertical: 10 } }} />
      <Text style={styles.title}>기타</Text>
      <TextButton
        text="알림 설정"
        onPress={async () => {
          const { status } = await Notifications.getPermissionsAsync();
          console.log(status);
          if (status === 'granted') {
            navigation.navigate(MainRoutes.MY_INFO, {
              screen: MyInfoRoutes.NOTIFICATION,
            });
          } else {
            registerForPushNotificationsAsync();
          }
        }}
      />
      <TextButton
        text="로그 아웃"
        onPress={async () => {
          try {
            await kakaoLogout();
          } catch (error) {
            console.error('로그아웃 실패, 오류 발생:', error);
          }
        }}
      />
      <TextButton
        text="회원 탈퇴"
        onPress={async () => {
          try {
            await reSign(user.userId);
          } catch (error) {
            console.error('회원탈퇴 실패, 오류 발생:', error);
          }
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
});

export default MyInfoScreen;
