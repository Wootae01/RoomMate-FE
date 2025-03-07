import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useContext, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { editPreference } from '../../api/editinformation';
import { getPreference } from '../../api/getinformation';
import Button from '../../components/Button';
import QuestionItem from '../../components/QuestionItem';
import UserContext from '../../contexts/UserContext';
import { SURVEY_PREFERENCE } from '../../surveyConstants';

const PreferenceUpdateScreen = () => {
  const navigation = useNavigation();
  const [answers, setAnswers] = useState({});
  const { user, setUser } = useContext(UserContext);
  //특정 질문의 값이 변경되면 호출
  const changeAnswer = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  //초기 데이터 초기화
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const data = await getPreference(user.userId);
          setAnswers(data.options);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [user.userId])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {/**설문 영역 */}
        {Object.keys(SURVEY_PREFERENCE).map((key, index) => {
          const data = SURVEY_PREFERENCE[key];
          return (
            <QuestionItem
              key={key}
              header={{ number: index + 1, title: SURVEY_PREFERENCE[key].name }}
              items={data.details}
              buttonType={SURVEY_PREFERENCE[key].buttonType}
              onChangeValue={(value) => changeAnswer(key, value)}
              initData={answers[key]}
            />
          );
        })}

        {/**버튼 영역 */}
        <View style={styles.buttton}>
          <Button
            title="수정"
            onPress={async () => {
              try {
                const response = await editPreference(user.userId, answers);
                console.log(response);
                setUser((prev) => ({
                  ...prev,
                  lastUpdate: new Date().toISOString(),
                }));
                navigation.goBack();
              } catch (error) {
                console.error(error);
              }
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

const styles = StyleSheet.create({
  buttton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 20,
  },
});
export default PreferenceUpdateScreen;
