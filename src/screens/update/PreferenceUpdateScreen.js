import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { editPreference } from '../../api/editinformation';
import Button from '../../components/Button';
import QuestionItem, { ButtonTypes } from '../../components/QuestionItem';
import { SURVEY } from '../../surveyConstants';

const PreferenceUpdateScreen = () => {
  const navigation = useNavigation();
  const [answers, setAnswers] = useState({});

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

        {/**버튼 영역 */}
        <View style={styles.buttton}>
          <Button
            title="수정"
            onPress={async () => {
              try {
                const response = await editPreference(1, answers); //테스트용 id ★★★★★★★★★
                console.log(response);
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
