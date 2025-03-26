import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import QuestionItem from '../components/QuestionItem';
import { SURVEY_PREFERENCE } from '../surveyConstants';
import { PALETTES } from '../colors';
import Button from '../components/Button';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MainRoutes } from '../navigations/routes';
import { useContext, useRef, useState } from 'react';
import { signUp } from '../api/register';
import UserContext from '../contexts/UserContext';
import { validatePreference } from '../utils/validators';

//회원 가입 선호하는 사람 입력
const PreferenceSurveyScreen = ({ route }) => {
  const navigation = useNavigation();
  const [answers, setAnswers] = useState({});
  const prevParams = route.params || {};
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const questionRefs = useRef({});
  const scrollViewRef = useRef(null);

  //회원 가입 완료 버튼 시 동작하는 메서드
  const handelNext = async () => {
    if (isLoading == true) {
      return; 
    }

    setIsLoading(true);

    console.log('preference: ', answers);
    const errors = validatePreference({ preference: answers });
    if (Object.keys(errors).length > 0) {
      const messages = Object.values(errors).join('\n');
      Alert.alert('입력 오류', messages);

      const firstErrorKey = Object.keys(errors)[0];

      //해당 질문 스크롤로 이동
      if (questionRefs.current[firstErrorKey] !== undefined) {
        scrollViewRef.current.scrollTo({
          y: questionRefs.current[firstErrorKey],
          animated: true,
        });
      }

      setIsLoading(false);
      return;
    }
    try {
      const result = {
        ...prevParams,
        preference: answers,
        userId: user.userId,
      };
      console.log('전체 데이터: ', result);
      await signUp(result);
      navigation.navigate(MainRoutes.CONTENT_TAB);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || '회원가입 중 오류가 발생했습니다.';
      Alert.alert('회원 가입 오류', errorMessage);
    } 

    
    setIsLoading(false);
  };

  //특정 질문의 값이 변경되면 호출
  const changeAnswer = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
      <ScrollView ref={scrollViewRef}>
        {/**설문 영역 */}
        {Object.keys(SURVEY_PREFERENCE).map((key, index) => {
          const data = SURVEY_PREFERENCE[key];
          return (
            <View
              key={key}
              onLayout={(event) => {
                const { y } = event.nativeEvent.layout;
                questionRefs.current[key] = y; //질문 위치의 y값 저장
              }}
            >
              <QuestionItem
                key={key}
                header={{
                  number: index + 1,
                  title: SURVEY_PREFERENCE[key].name,
                }}
                items={data.details}
                buttonType={SURVEY_PREFERENCE[key].buttonType}
                onChangeValue={(value) => changeAnswer(key, value)}
              />
            </View>
          );
        })}

        {/** 버튼 영역 */}
        <View style={styles.buttton}>
          <Button
            title="이전"
            onPress={() => navigation.goBack()}
            customStyles={{
              button: {
                marginTop: 15,
                flex: 1,
                backgroundColor: PALETTES.NEUTRALVARIANT[40],
                margin: 5,
              },
            }}
          />
          <Button
            title="완료"
            onPress={handelNext}
            customStyles={{
              button: {
                marginTop: 15,
                flex: 1,
                margin: 5,
              },
            }}
            isLoading={isLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
PreferenceSurveyScreen.propTypes = {
  route: PropTypes.object,
};
const styles = StyleSheet.create({
  buttton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 20,
  },
});
export default PreferenceSurveyScreen;
