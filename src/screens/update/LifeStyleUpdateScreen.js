import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useContext, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { editLifeStyle } from '../../api/editinformation';
import { getLifeStyle } from '../../api/getinformation';
import Button from '../../components/Button';
import QuestionItem from '../../components/QuestionItem';
import UserContext from '../../contexts/UserContext';
import { SURVEY } from '../../surveyConstants';

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
        {Object.keys(SURVEY)
          .filter((key) => key !== 'AGE')
          .map((key, index) => {
            const data = SURVEY[key];
            return (
              <QuestionItem
                key={key}
                header={{ number: index + 1, title: SURVEY[key].name }}
                items={data.details}
                buttonType={SURVEY[key].buttonType}
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
