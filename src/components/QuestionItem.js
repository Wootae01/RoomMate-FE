import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BLACK, PRIMARY, WHITE } from '../colors';
import CheckBox from './CheckBox';
import RadioBox from './RadioBox';

export const ButtonTypes = {
  RADIO: 'RADIO',
  CHECK: 'CHECK',
};

const QuestionItem = ({
  header,
  items,
  buttonType,
  onChangeValue,
  initData,
}) => {
  const [isSelected, setIsSelected] = useState([]); //라디오 버튼 선택 여부
  const [values, setValues] = useState([]); //check 박스에서 선택한 설문의 id 값들

  const onChangeValueRef = useRef(onChangeValue);
  useEffect(() => {
    onChangeValueRef.current = onChangeValue;
  }, [onChangeValue]);

  useEffect(() => {
    onChangeValueRef.current(values);
  }, [values]);

  useEffect(() => {
    if (buttonType === ButtonTypes.RADIO && initData) {
      setIsSelected(initData[0]);
    } else if (buttonType === ButtonTypes.CHECK && initData) {
      setValues(initData);
    }
  }, [initData, buttonType]);

  return (
    <View style={styles.container}>
      {/**설문 번호, 설문 제목 영역 */}
      <View style={styles.header}>
        <View style={styles.number}>
          <Text style={styles.numberText}>{header.number}</Text>
        </View>
        <Text style={styles.title}>{header.title}</Text>
      </View>

      {/**설문 버튼, 내용 영역 */}
      <View style={styles.button}>
        {items.map((item, index) => {
          if (buttonType === ButtonTypes.RADIO) {
            return (
              <RadioBox
                key={index}
                name={item.label}
                isSelected={isSelected === item.id}
                onPress={() => {
                  onChangeValue([item.id]);
                  setIsSelected(item.id);
                }}
                customStyles={{
                  container: {
                    padding: 10,
                  },
                }}
              />
            );
          } else if (buttonType === ButtonTypes.CHECK) {
            return (
              <CheckBox
                key={index}
                name={item.label}
                onChangeValues={(isCheck) => {
                  setValues((prev) =>
                    isCheck
                      ? [...prev, item.id]
                      : prev.filter((value) => value !== item.id)
                  );
                }}
                isChecked={values.includes(item.id)}
                customStyles={{
                  container: {
                    padding: 10,
                  },
                }}
              />
            );
          } else {
            return null;
          }
        })}
      </View>
    </View>
  );
};

QuestionItem.propTypes = {
  header: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  buttonType: PropTypes.oneOf(Object.values(ButtonTypes)).isRequired,
  onChangeValue: PropTypes.func,
  initData: PropTypes.array,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    width: '96%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  number: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: PRIMARY.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginLeft: 0,
  },
  title: {
    color: BLACK,
    fontSize: 20,
    fontWeight: '700',
  },
  numberText: {
    color: WHITE,
    fontSize: 20,
    fontWeight: '700',
  },
  button: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginTop: 18,
  },
});

export default QuestionItem;
