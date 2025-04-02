import { useNavigation } from '@react-navigation/native';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PALETTES } from '../colors';
import Button from '../components/Button';
import QuestionItem from '../components/QuestionItem';
import { SignRoutes } from '../navigations/routes';
import { SURVEY } from '../surveyConstants';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { validateLifeStyle } from '../utils/validators';

//회원 가입 생활패턴 입력
const LifeStyleSurveyScreen = ({ route }) => {
  const navigation = useNavigation();
  const [answers, setAnswers] = useState({});

  const prevParams = route.params || {};

  const scrollViewRef = useRef(null);
  const questionRefs = useRef({});


  const handelNext = () => {

    console.log('lifeStyle: ', answers);

    const errors = validateLifeStyle({ lifeStyle: answers });
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

      return;
    }

    navigation.navigate(SignRoutes.PREFERENCE_SURVEY, {
      ...prevParams,
      lifeStyle: answers,
    });

  };

  //특정 질문의 값이 변경되면 호출
  const changeAnswer = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
      <ScrollView ref={scrollViewRef}>
        {/**설문 영역 */}
        {Object.keys(SURVEY)
          .filter((key) => key !== 'AGE')
          .map((key, index) => {
            const data = SURVEY[key];
            return (
              <View
                key={key}
                ref={questionRefs}
                onLayout={(event) => {
                  const { y } = event.nativeEvent.layout;
                  questionRefs.current[key] = y;
                }}
              >
                <QuestionItem
                  key={key}
                  header={{ number: index + 1, title: SURVEY[key].name }}
                  items={data.details}
                  buttonType={SURVEY[key].buttonType}
                  onChangeValue={(value) => changeAnswer(key, value)}
                />
              </View>
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
            onPress={handelNext}
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
