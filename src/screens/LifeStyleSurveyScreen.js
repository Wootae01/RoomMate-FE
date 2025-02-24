import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PALETTES } from '../colors';
import Button from '../components/Button';
import QuestionItem, { ButtonTypes } from '../components/QuestionItem';
import { SignRoutes } from '../navigations/routes';
import { SURVEY } from '../surveyConstants';
import PropTypes from 'prop-types';
import { useState } from 'react';

// 랜더링할 설문 항목
const surveyItems = [
  { key: 'BED_TIME', buttonType: ButtonTypes.CHECK },
  { key: 'WAKEUP_TIME', buttonType: ButtonTypes.CHECK },
  { key: 'HEATING', buttonType: ButtonTypes.CHECK },
  { key: 'COOLING', buttonType: ButtonTypes.CHECK },
  { key: 'SLEEP_HABIT', buttonType: ButtonTypes.RADIO },
  { key: 'SMOKING', buttonType: ButtonTypes.RADIO },
  { key: 'NOISE', buttonType: ButtonTypes.RADIO },
  { key: 'INDOOR_CALL', buttonType: ButtonTypes.RADIO },
  { key: 'EATING', buttonType: ButtonTypes.RADIO },
  { key: 'DRINKING', buttonType: ButtonTypes.RADIO },
  { key: 'SCENT', buttonType: ButtonTypes.RADIO },
  { key: 'CLEANING', buttonType: ButtonTypes.RADIO },
  { key: 'RELATIONSHIP', buttonType: ButtonTypes.RADIO },
];

const LifeStyleSurveyScreen = ({ route }) => {
  const navigation = useNavigation();
  const [answers, setAnswers] = useState({});
  const prevParams = route.params || {};
  //특정 질문의 값이 변경되면 호출
  const changeAnswer = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {/**설문 영역 */}
        {surveyItems.map((item, index) => {
          const data = SURVEY[item.key];
          return (
            <QuestionItem
              key={item.key}
              header={{ number: index + 1, title: SURVEY[item.key].name }}
              items={data.details}
              buttonType={item.buttonType}
              onChangeValue={(value) => changeAnswer(item.key, value)}
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
              const result = Object.values(answers).flat();
              navigation.navigate(SignRoutes.PREFERENCE_SURVEY, {
                ...prevParams,
                lifeStyle: result,
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
