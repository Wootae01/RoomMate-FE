import { Alert, StyleSheet, Switch, Text, View } from 'react-native';
import Button from '../../components/Button';
import { useContext, useEffect, useState } from 'react';
import { BLACK, PALETTES, PRIMARY, WHITE } from '../../colors';
import { getNotificationAsync } from '../../api/getinformation';
import UserContext from '../../contexts/UserContext';
import { editNotification } from '../../api/editinformation';
import { useNavigation } from '@react-navigation/native';

const NotificationUpdateScreen = () => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState();
  const [chatToggle, setChatToggle] = useState(false);
  const toggleSwitch = () => setChatToggle((prev) => !prev);
  const naviagtion = useNavigation();

  const handelNext = async (userId, chatToggle) => {
    if(isLoading == true){
      return;
    }
    setIsLoading(true);

    try {
      await editNotification(userId, chatToggle);
      naviagtion.goBack();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || '알림 설정 중 오류가 발생했습니다.';
      Alert.alert('오류', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  //초기 데이터 설정
  useEffect(() => {
    const fetchData = async (userId) => {
      try {
        const data = await getNotificationAsync(userId);
        setChatToggle(data.permission);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(user.userId);
  }, [user.userId]);

  return (
    <View style={styles.container}>
      {/**채팅 알림 설정 영역 */}
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>채팅 알림</Text>
            <Switch
              trackColor={{ false: '#767577', true: PRIMARY.DEFAULT }}
              thumbColor={chatToggle ? PALETTES.NEUTRALVARIANT[98] : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              value={chatToggle}
              onValueChange={toggleSwitch}
            />
          </View>
        </View>
      </View>

      {/**버튼 영역 */}
      <Button
        title="수정"
        customStyles={{ button: styles.button }}
        onPress={() => handelNext(user.userId, chatToggle)}
        isLoading={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: WHITE,
    justifyContent: 'space-between',
  },
  content: {
    alignItemsL: 'center',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 20,
  },
  card: {
    width: '100%',
    backgroundColor: WHITE,
    padding: 16,
    borderRadius: 10,
    shadowColor: BLACK,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
  },
  button: {
    width: '100%',
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default NotificationUpdateScreen;
