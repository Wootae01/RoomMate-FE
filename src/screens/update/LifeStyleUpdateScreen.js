import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useContext, useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { editLifeStyle } from '../../api/editinformation';
import { getLifeStyle } from '../../api/getinformation';
import Button from '../../components/Button';
import QuestionItem from '../../components/QuestionItem';
import UserContext from '../../contexts/UserContext';
import { SURVEY } from '../../surveyConstants';
import { validateLifeStyle } from '../../utils/validators';

const LifeStyleUpdateScreen = () => {
  const [answers, setAnswers] = useState({});
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const scrollViewRef = useRef(null);
  const questionRefs = useRef({});

  const handelNext = async () => {
    const errors = validateLifeStyle({ lifeStyle: answers });
    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors).join('\n');
      Alert.alert('입력 오류', errorMessages);

      //해당 질문 스크롤로 이동
      const firstKey = Object.keys(errors)[0];
      if (questionRefs.current[firstKey] !== undefined) {
        scrollViewRef.current.scrollTo({
          y: questionRefs.current[firstKey],
          animated: true,
        });
      }
      return;
    }
    try {
      const response = await editLifeStyle(user.userId, answers);
      console.log(response);
      navigation.goBack();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        '생활 패턴 수정 중 오류가 발생했습니다.';
      Alert.alert('생활패턴 수정 요류', errorMessage);
    }
  };

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
      <ScrollView ref={scrollViewRef}>
        {/**설문 영역 */}
        {Object.keys(SURVEY)
          .filter((key) => key !== 'AGE')
          .map((key, index) => {
            const data = SURVEY[key];
            return (
              <View
                key={key}
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
                  initData={answers[key]}
                />
              </View>
            );
          })}

        {/**버튼 영역 */}
        <View style={styles.buttton}>
          <Button
            title="수정"
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

const styles = StyleSheet.create({
  buttton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 20,
  },
});

export default LifeStyleUpdateScreen;
