import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import DefaultProfile from '../components/DefaultProfile';
import SurveyCard from '../components/SurveyCard';
import { SURVEY } from '../surveyConstants';

const OtherUserScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* 프로필 영역*/}
        <View style={styles.profile}>
          <DefaultProfile size={80} />
          <Text style={styles.nickname}>닉네임</Text>
        </View>

        {/* 사용자 정보 영역*/}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>나이 : 22살</Text>
          <Text style={styles.infoText}>기숙사 : 양진재 인의관</Text>
          <Text style={styles.infoText}>
            한줄소개 한줄소개 한줄소개 한줄소개 한줄소개 한줄소개 한줄소개
            한줄소개
          </Text>
        </View>

        {/* 생활 패턴 영역 */}
        <Text style={styles.sectionTitle}>생활 패턴</Text>
        <View style={styles.surveyContainer}>
          {Object.entries(SURVEY).map(([key, item]) => (
            <SurveyCard item={item} key={key} />
          ))}
        </View>

        {/** 선호하는 룸메 영역 */}
        <Text style={styles.sectionTitle}>선호하는 룸메</Text>
        <View style={styles.surveyContainer}>
          {Object.entries(SURVEY).map(([key, item]) => (
            <SurveyCard item={item} key={key} />
          ))}
        </View>

        {/* 버튼 영역 */}
        <View style={styles.buttonContainer}>
          <Button
            title="채팅 하기"
            onPress={() => {}}
            customStyles={{ button: styles.buttonSpacing }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
});

export default OtherUserScreen;
