import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import BirthYearDropdown from '../components/BirthYearDropDown';
import Button from '../components/Button';
import DormDropDown from '../components/DormDropDown';
import Input from '../components/Input';
import RadioBox from '../components/RadioBox';
import { SignRoutes } from '../navigations/routes';
import { validateMyInfo } from '../validation/validators';
const MyInfoSurveyScreen = () => {
  const [gender, setGender] = useState(null);
  const [nickname, setNickname] = useState(''); //닉네임
  const [age, setAge] = useState(null); //출생년도
  const [dorm, setDorm] = useState(null); //기숙사
  const [introduce, setIntroduce] = useState(''); //한출 소개
  const [inputHeight, setInputHeight] = useState(45); // 한줄 소개 입력창 기본 높이
  const navigation = useNavigation();

  //다음 버튼 클릭 시 검증 후 다음 화면으로 데이터 전달
  const handelNext = () => {
    console.log(
      `gender: ${gender} nickname: ${nickname} age: ${age} dorm: ${dorm} introduce: ${introduce}`
    );
    const errors = validateMyInfo({ nickname, gender, age, dorm, introduce });
    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors).join('\n');
      Alert.alert('입력 오류', errorMessages);
      return;
    }

    navigation.navigate(SignRoutes.LIFESTLYE_SURVEY, {
      nickname: nickname,
      gender: gender,
      dormitory: dorm,
      age: age,
      introduce: introduce,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {/**닉네임 입력 영역 */}
        <View style={styles.container}>
          <Input
            title="닉네임"
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            onChangeText={(nickname) => setNickname(nickname)}
          />

          {/**성별 선택 영역 */}
          <View style={styles.gender}>
            <Text style={styles.text}>성별</Text>
            <View style={styles.radio}>
              <RadioBox
                name="남"
                isSelected={gender === 'MALE'}
                onPress={() => setGender('MALE')}
                radioStyle={{ alignItems: 'flex-start' }}
              />
              <RadioBox
                name="여"
                isSelected={gender === 'FEMALE'}
                onPress={() => setGender('FEMALE')}
                radioStyle={{ alignItems: 'flex-start' }}
              />
            </View>
          </View>

          {/**나이 선택 영역 */}
          <View style={styles.age}>
            <Text style={[styles.text]}>출생년도</Text>
            <BirthYearDropdown value={age} setValue={setAge} />
          </View>

          {/**기숙사 선택 영역 */}
          <Text style={[styles.text]}>기숙사</Text>
          <DormDropDown detailValue={dorm} setDetailValue={setDorm} />

          {/**한줄소개 입력 영역 */}
          <Input
            title="한줄 소개"
            placeholder="한줄 소개를 입력하세요"
            value={introduce}
            onChangeText={(introduce) => setIntroduce(introduce)}
            multiline={true}
            onContentSizeChange={(event) =>
              setInputHeight(event.nativeEvent.contentSize.height)
            }
            customStyle={{ height: Math.max(45, inputHeight) }}
            maxLength={60}
          />

          {/**하단 버튼영 */}
          <Button
            title="다음"
            customStyles={{ button: { marginTop: 15 } }}
            onPress={handelNext}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    overflow: 'visible',
    flex: 1,
  },
  text: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 10,
  },
  gender: {
    paddingVertical: 20,
  },
  radio: {
    flexDirection: 'row',
  },
  age: {},
  dorm: {},
});
export default MyInfoSurveyScreen;
