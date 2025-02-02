import { StyleSheet, Text, View } from 'react-native';
import RadioBox from './RadioBox';
import CheckBox from './CheckBox';
import { BLACK, PRIMARY, WHITE } from '../colors';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const ButtonTypes = {
  RADIO: 'RADIO',
  CHECK: 'CHECK',
};

const QuestionItem = ({ header, items, buttonType }) => {
  const [isSelected, setIsSelected] = useState(null); //라디오 버튼 선택 여부

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
                isSelected={isSelected === item.value}
                onPress={() => {
                  setIsSelected(item.value);
                }}
                radioStyle={{}}
              />
            );
          } else if (buttonType === ButtonTypes.CHECK) {
            return <CheckBox key={index} name={item.label} />;
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
