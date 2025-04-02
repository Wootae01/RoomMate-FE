import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useContext, useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { editPreference } from '../../api/editinformation';
import { getPreference } from '../../api/getinformation';
import Button from '../../components/Button';
import QuestionItem from '../../components/QuestionItem';
import UserContext from '../../contexts/UserContext';
import { SURVEY_PREFERENCE } from '../../surveyConstants';
import { validatePreference } from '../../utils/validators';

const PreferenceUpdateScreen = () => {
  const navigation = useNavigation();
  const [answers, setAnswers] = useState({});
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState();

  const scrollViewRef = useRef(null);
  const questionRefs = useRef({});

  //특정 질문의 값이 변경되면 호출
  const changeAnswer = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handelNext = async () => {
    if(isLoading == true){
      return;
    }
    setIsLoading(true);

    const errors = validatePreference({ preference: answers });
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
      setIsLoading(false);
      return;
    }
    try {
      const response = await editPreference(user.userId, answers);
      console.log(response);
      setUser((prev) => ({
        ...prev,
        lastUpdate: new Date().toISOString(),
      }));
      navigation.goBack();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        '선호하는 룸메 수정 중 오류가 발생했습니다.';
      Alert.alert('선호하는 룸메 수정 요류', errorMessage);
    } finally {
      setIsLoading(false);
    }
    
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
      <ScrollView ref={scrollViewRef}>
        {/**설문 영역 */}
        {Object.keys(SURVEY_PREFERENCE).map((key, index) => {
          const data = SURVEY_PREFERENCE[key];
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
                header={{
                  number: index + 1,
                  title: SURVEY_PREFERENCE[key].name,
                }}
                items={data.details}
                buttonType={SURVEY_PREFERENCE[key].buttonType}
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
            isLoading={isLoading}
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
