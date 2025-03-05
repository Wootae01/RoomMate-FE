import { ScrollView, StyleSheet, View } from 'react-native';
import QuestionItem from '../components/QuestionItem';
import { SURVEY_PREFERENCE } from '../surveyConstants';
import { PALETTES } from '../colors';
import Button from '../components/Button';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MainRoutes } from '../navigations/routes';
import { useContext, useState } from 'react';
import { signUp } from '../api/register';
import UserContext from '../contexts/UserContext';

//회원 가입 선호하는 사람 입력
const PreferenceSurveyScreen = ({ route }) => {
  const navigation = useNavigation();
  const [answers, setAnswers] = useState({});
  const prevParams = route.params || {};
  const { user } = useContext(UserContext);
  //특정 질문의 값이 변경되면 호출
  const changeAnswer = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
      <ScrollView>
        {/**설문 영역 */}
        {Object.keys(SURVEY_PREFERENCE).map((key, index) => {
          const data = SURVEY_PREFERENCE[key];
          return (
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
            onPress={async () => {
              const result = {
                ...prevParams,
                preference: answers,
                userId: user.userId,
              };
              console.log('전체 data: ', result);
              await signUp(result);
              navigation.navigate(MainRoutes.CONTENT_TAB);
            }}
            customStyles={{
              button: {
                marginTop: 15,
                flex: 1,
                margin: 5,
              },
            }}
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
