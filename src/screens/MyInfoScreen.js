import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { WHITE } from '../colors';
import DefaultProfile from '../components/DefaultProfile';
import HR from '../components/HR';
import TextButton from '../components/TextButton';
import { MainRoutes, MyInfoRoutes } from '../navigations/routes';
const MyInfoScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profile}>
        <DefaultProfile size={60} />
        <Text
          style={[{ fontSize: 20, fontWeight: '700', paddingVertical: 15 }]}
        >
          닉네임
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
        text="로그 아웃"
        onPress={() => {
          console.log('로그아웃');
        }}
      />
      <TextButton
        text="회원 탈퇴"
        onPress={() => {
          console.log('탈퇴');
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
