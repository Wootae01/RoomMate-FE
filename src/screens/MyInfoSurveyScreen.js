import { StyleSheet, Text, View } from 'react-native';

import Input from '../components/Input';
import RadioBox from '../components/RadioBox';
import { useState } from 'react';
import BirthYearDropdown from '../components/BirthYearDropDown';
import DormDropDown from '../components/DormDropDown';
import Button from '../components/Button';
import { PRIMARY } from '../colors';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { SignRoutes } from '../navigations/routes';
const MyInfoSurveyScreen = () => {
  const [isSelected, setIsSelected] = useState(null);
  const navigation = useNavigation();
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
          title="다음"
          onPress={() => navigation.navigate(SignRoutes.LIFESTLYE_SURVEY)}
          buttonStyle={{ marginTop: 15, backgroundColor: PRIMARY.DEFAULT }}
        />
      </View>
    </SafeAreaView>
  );
};
MyInfoSurveyScreen.prototypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
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
