import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useContext, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { editLifeStyle } from '../../api/editinformation';
import { getLifeStyle } from '../../api/getinformation';
import Button from '../../components/Button';
import QuestionItem, { ButtonTypes } from '../../components/QuestionItem';
import UserContext from '../../contexts/UserContext';
import { SURVEY } from '../../surveyConstants';

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

const LifeStyleUpdateScreen = () => {
  const [answers, setAnswers] = useState({});
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const data = await getLifeStyle(user.userId);
          setAnswers(data.options);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [user.userId])
  );

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
              initData={answers[item.key]}
            />
          );
        })}

        {/**버튼 영역 */}
        <View style={styles.buttton}>
          <Button
            title="수정"
            onPress={async () => {
              try {
                const response = await editLifeStyle(user.userId, answers);
                console.log(response);
                navigation.goBack();
              } catch (error) {
                console.log(error);
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

export default LifeStyleUpdateScreen;
