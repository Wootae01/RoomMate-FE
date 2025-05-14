import { useNavigation } from '@react-navigation/native';
import {
  ActivityIndicator,
  Alert,
  Linking,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import * as Notifications from 'expo-notifications';
import { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { googleLogout, kakaoLogout, reSignGoogle, reSignKakao } from '../api/auth';
import { getNickName } from '../api/getinformation';
import { BLACK, WHITE } from '../colors';
import DefaultProfile from '../components/DefaultProfile';
import HR from '../components/HR';
import TextButton from '../components/TextButton';
import UserContext from '../contexts/UserContext';
import { MainRoutes, MyInfoRoutes } from '../navigations/routes';
import { disconnect } from '../api/stompClient';
import AsyncStorage from '@react-native-async-storage/async-storage';


/**
 * 내 정보 화면
 */
const MyInfoScreen = () => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);
  const [nickname, setNickname] = useState('');
  const [isLoading, setIsLoading] = useState();

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
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={BLACK} />
        </View>
      ) : (
        <>
          <View style={styles.profile}>
            <DefaultProfile size={60} />
            <Text
              style={{ fontSize: 20, fontWeight: '700', paddingVertical: 15 }}
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
                Alert.alert(
                  '권한 요청',
                  '앱의 알림 권한을 허용해 주세요.\n 알림 -> 권한 허용',
                  [{ text: 'OK', onPress: () => Linking.openSettings() }]
                );
              }
            }}
          />

          <TextButton
            text="로그 아웃"
            onPress={async () => {
              setIsLoading(true);
              try {
                const username = await AsyncStorage.getItem('username');
                const splitusername = username.split('@');
                const loginmethod = splitusername[0];

                if (loginmethod === 'kakao' ) {
                  await kakaoLogout();
                } else if (loginmethod === 'google') {
                  await googleLogout();
                } else {
                  console.log("비정상적인 로그인방법", loginmethod);
                }

                disconnect();
                setUser(null);
              } catch (error) {
                console.log('로그아웃 실패, 오류 발생:', error);
              } finally {
                setIsLoading(false);
              }
            }}
          />

          <TextButton
            text="회원 탈퇴"
            onPress={() => {
              Alert.alert('회원탈퇴', '회원탈퇴를 진행하시겠습니까?', [
                {
                  text: '아니오',
                  style: 'cancel',
                  onPress: () => {
                    console.log('회원탈퇴 취소');
                  },
                },
                {
                  text: '예',
                  style: 'default',
                  onPress: async () => {
                    setIsLoading(true);
                    try {
                      const username = await AsyncStorage.getItem('username');
                      const splitusername = username.split('@');
                      const loginmethod = splitusername[0];

                      if (loginmethod === 'kakao' ) {
                        await reSignKakao(user.userId);
                      } else if (loginmethod === 'google') {
                        await reSignGoogle(user.userId);
                      } else {
                        console.log("비정상적인 로그인방법", loginmethod);
                      }

                      disconnect();
                      setUser(null);
                    } catch (error) {
                      console.log('회원탈퇴 실패, 오류 발생:', error);
                    } finally {
                      setIsLoading(false);
                    }
                  },
                },
              ]);
            }}
          />
        </>
      )}
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyInfoScreen;
