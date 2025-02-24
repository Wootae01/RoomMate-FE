import { ScrollView, StyleSheet, View } from 'react-native';
import QuestionItem, { ButtonTypes } from '../components/QuestionItem';
import { SURVEY } from '../surveyConstants';
import { PALETTES } from '../colors';
import Button from '../components/Button';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MainRoutes } from '../navigations/routes';
import { useContext, useState } from 'react';
import { signUp } from '../api/information';
import UserContext from '../contexts/UserContext';

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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {/**설문 영역 */}
        {Object.keys(SURVEY).map((key, index) => {
          const data = SURVEY[key];
          return (
            <QuestionItem
              key={key}
              header={{ number: index + 1, title: SURVEY[key].name }}
              items={data.details}
              buttonType={ButtonTypes.CHECK}
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
              const preference = Object.values(answers).flat();
              const result = {
                ...prevParams,
                preference: preference,
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
