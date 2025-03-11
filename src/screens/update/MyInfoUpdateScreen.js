import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { editProfile } from '../../api/editinformation';
import { getProfile } from '../../api/getinformation';
import BirthYearDropdown from '../../components/BirthYearDropDown';
import Button from '../../components/Button';
import DormDropDown from '../../components/DormDropDown';
import Input from '../../components/Input';
import RadioBox from '../../components/RadioBox';
import UserContext from '../../contexts/UserContext';
import { validateMyInfo } from '../../utils/validators';
const MyInfoUpdateScreen = () => {
  const [gender, setGender] = useState(''); //성별별
  const [nickname, setNickname] = useState(''); //닉네임
  const [age, setAge] = useState(null); //출생년도
  const [dormitory, setDormitory] = useState(''); //기숙사
  const [introduce, setIntroduce] = useState(''); //한출 소개
  const [inputHeight, setInputHeight] = useState(45); // 한줄 소개 입력창 기본 높이

  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);

  //수정 버튼 클릭 시 메서드드
  const handelNext = async () => {
    const errors = validateMyInfo({
      nickname,
      gender,
      age,
      dorm: dormitory,
      introduce,
    });
    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors).join('\n');
      Alert.alert('입력 오류', errorMessages);
      return;
    }
    try {
      const response = await editProfile(
        user.userId,
        nickname,
        gender,
        age,
        dormitory,
        introduce
      );
      console.log(response);
      setUser((prev) => ({
        ...prev,
        lastUpdate: new Date().toISOString(),
      }));
      navigation.goBack();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        '회원 정보 수정 중 오류가 발생했습니다.';
      Alert.alert('회원 정보 수정 오류', errorMessage);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const data = await getProfile(user.userId);
          setNickname(data.nickname);
          setIntroduce(data.introduce);
          setAge(data.age);
          setDormitory(data.dormitory);
          setGender(data.gender);
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
        <View style={styles.container}>
          {/**닉네임 입력 영역 */}
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
            <Text style={[styles.text]}>출생연도</Text>
            <BirthYearDropdown value={age} setValue={setAge} />
          </View>

          {/**기숙사 선택 영역 */}
          <Text style={[styles.text]}>기숙사</Text>
          <DormDropDown detailValue={dormitory} setDetailValue={setDormitory} />

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

          <Button
            title="수정"
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
export default MyInfoUpdateScreen;
