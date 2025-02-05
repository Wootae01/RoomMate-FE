import { StyleSheet, Text, View } from 'react-native';

import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import BirthYearDropdown from '../../components/BirthYearDropDown';
import Button from '../../components/Button';
import DormDropDown from '../../components/DormDropDown';
import Input from '../../components/Input';
import RadioBox from '../../components/RadioBox';
const MyInfoUpdateScreen = () => {
  const [isSelected, setIsSelected] = useState(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Input title="닉네임" placeholder="닉네임을 입력해주세요" />

        <View style={styles.gender}>
          <Text style={styles.text}>성별</Text>
          <View style={styles.radio}>
            <RadioBox
              name="남"
              isSelected={isSelected === '남'}
              onPress={() => setIsSelected('남')}
              radioStyle={{ alignItems: 'flex-start' }}
            />
            <RadioBox
              name="여"
              isSelected={isSelected === '여'}
              onPress={() => setIsSelected('여')}
              radioStyle={{ alignItems: 'flex-start' }}
            />
          </View>
        </View>
        <View style={styles.age}>
          <Text style={[styles.text]}>출생연도</Text>
          <BirthYearDropdown />
        </View>
        <Text style={[styles.text]}>기숙사</Text>
        <DormDropDown />
        <Button
          title="수정"
          customStyles={{ button: { marginTop: 15 } }}
          onPress={() => {}}
        />
      </View>
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
