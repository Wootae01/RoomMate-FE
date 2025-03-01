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
    <View>
      <View style={styles.header}>
        <View style={styles.number}>
          <Text style={styles.numberText}>{header.number}</Text>
        </View>
        <Text style={styles.title}>{header.title}</Text>
      </View>

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
                radioStyle={{}}
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
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    marginTop: 20,
  },
  number: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: PRIMARY.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginLeft: 15,
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 18,
  },
});

export default QuestionItem;
