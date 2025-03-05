import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PALETTES } from '../colors';
import Button from '../components/Button';
import QuestionItem from '../components/QuestionItem';
import { SignRoutes } from '../navigations/routes';
import { SURVEY } from '../surveyConstants';
import PropTypes from 'prop-types';
import { useState } from 'react';

//회원 가입 생활패턴 입력
const LifeStyleSurveyScreen = ({ route }) => {
  const navigation = useNavigation();
  const [answers, setAnswers] = useState({});
  const prevParams = route.params || {};
  //특정 질문의 값이 변경되면 호출
  const changeAnswer = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
      <ScrollView>
        {/**설문 영역 */}
        {Object.keys(SURVEY).map((key, index) => {
          const data = SURVEY[key];
          return (
            <QuestionItem
              key={key}
              header={{ number: index + 1, title: SURVEY[key].name }}
              items={data.details}
              buttonType={SURVEY[key].buttonType}
              onChangeValue={(value) => changeAnswer(key, value)}
            />
          );
        })}

        {/**하단 버튼 영역 */}
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
            title="다음"
            onPress={() => {
              console.log('lifeStyle: ', answers);

              navigation.navigate(SignRoutes.PREFERENCE_SURVEY, {
                ...prevParams,
                lifeStyle: answers,
              });
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

LifeStyleSurveyScreen.propTypes = {
  route: PropTypes.object,
};

const styles = StyleSheet.create({
  buttton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 20,
  },
});

export default LifeStyleSurveyScreen;
