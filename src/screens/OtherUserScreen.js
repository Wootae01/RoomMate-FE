import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createChatRoom } from '../api/chat';
import { getFriendInformation } from '../api/getinformation';
import Button from '../components/Button';
import DefaultProfile from '../components/DefaultProfile';
import { DORMS, getDorm } from '../components/DormDropDown';
import SurveyCard from '../components/SurveyCard';
import UserContext from '../contexts/UserContext';
import { ChatRoutes, MainRoutes } from '../navigations/routes';
import { BLACK } from '../colors';

const OtherUserScreen = ({ route }) => {
  const { memberId } = route.params;
  const [data, setData] = useState({});
  const [dorm, setDorm] = useState('');
  const [detailDorm, setDetailDorm] = useState('');
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState();

  //상대 프로필 정보 가져옴
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getFriendInformation(memberId);
        console.log('response: ', response);
        setData(response);
        const dormKey = getDorm(response.dormitory, response.gender);
        setDorm(DORMS[dormKey].name);
        setDetailDorm(
          DORMS[dormKey]?.[response.gender].find(
            (item) => item.value === response.dormitory
          ).label
        );
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
     
    };
    fetchData();
  }, [memberId]);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={BLACK} />
        </View>
      ) : (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* 프로필 영역*/}
        <View style={styles.profile}>
          <DefaultProfile size={80} />
          <Text style={styles.nickname}>{data.nickname}</Text>
        </View>

        {/* 사용자 정보 영역*/}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>출생년도: {data.age}년</Text>
          <Text style={styles.infoText}>
            성별: {data.gender === 'MALE' ? '남' : '여'}
          </Text>
          <Text style={styles.infoText}>
            기숙사: {dorm} {detailDorm}
          </Text>

          <Text style={styles.infoText}>{data.introduce}</Text>
        </View>

        {/* 생활 패턴 영역 */}
        <Text style={styles.sectionTitle}>생활 패턴</Text>
        <View style={styles.surveyContainer}>
          {data.lifeStyle &&
            Object.entries(data.lifeStyle).map(([key, values]) => (
              <SurveyCard values={values} surveyKey={key} key={key} />
            ))}
        </View>

        {/** 선호하는 룸메 영역 */}
        {data.preference && Object.keys(data.preference).length > 0 && (
          <>
            <Text style={styles.sectionTitle}>선호하는 룸메</Text>
            <View style={styles.surveyContainer}>
              {Object.entries(data.preference).map(([key, values]) => {
                if (values && values.every((value) => value > 100)) {
                  //상관 없음 항목 출력 x
                  return (
                    <SurveyCard values={values} key={key} surveyKey={key} />
                  );
                }
                return null;
              })}
            </View>
          </>
        )}

        {/* 버튼 영역 */}
        <View style={styles.buttonContainer}>
          <Button
            title="채팅 하기"
            onPress={async () => {
              const { chatRoomId } = await createChatRoom(
                user.userId,
                memberId
              );
              console.log('chatRoomId: ', chatRoomId);
              navigation.navigate(MainRoutes.CHAT_STACK, {
                screen: ChatRoutes.CHAT_ROOM,
                params: { nickname: `${data.nickname}`, chatRoomId },
              });
            }}
            customStyles={{ button: styles.buttonSpacing }}
          />
        </View>
      </ScrollView>
      )}
    </SafeAreaView>
  );
};

OtherUserScreen.propTypes = {
  route: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  scrollContainer: {
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  nickname: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 10,
    color: '#333',
  },
  infoContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    //그림자
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 30,
  },
  infoText: {
    fontSize: 18,
    paddingVertical: 5,
    color: '#555',
    fontWeight: '400',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  surveyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },

  buttonContainer: {
    marginBottom: 5,
  },
  buttonSpacing: {
    marginBottom: 15,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OtherUserScreen;
