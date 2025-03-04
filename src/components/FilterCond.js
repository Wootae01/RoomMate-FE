import PropTypes from 'prop-types';
import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { BLACK, PALETTES, WHITE } from '../colors';
import DetailCondScreen from '../screens/DetailCondScreen';
import { SURVEY } from '../surveyConstants';
import Button from './Button';

{
  /**추천 목록 상단에 나오는 검색 조건 */
}
const FilterCond = ({ onSearch }) => {
  const [visible, setVisible] = useState(false); //모달 창 보여줄지 결정할 변수

  const [surveyKey, setSurveyKey] = useState(''); //선택한 필터 항목 키 값 저장

  return (
    <View>
      <DetailCondScreen
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        surveyKey={surveyKey}
        onSearch={onSearch}
      />
      <FlatList
        data={Object.entries(SURVEY)}
        keyExtractor={([key]) => key}
        renderItem={({ item: [key, { name }] }) => (
          <Button
            key={key}
            title={name}
            onPress={() => {
              setVisible(true);
              setSurveyKey(key);
            }}
            customStyles={{
              button: {
                backgroundColor: WHITE,
                borderWidth: 1,
                width: 90,
                paddingVertical: 5,
                marginRight: 10,
                borderRadius: 5,
              },
              title: { color: BLACK, fontSize: 11 },
            }}
            icon={{
              name: 'chevron-right',
              size: 15,
              color: PALETTES.NEUTRALVARIANT[0],
              style: {
                transform: [{ rotate: '90deg' }],
                position: 'absolute',
                right: 0,
              },
              right: true,
            }}
          />
        )}
        horizontal={true}
        contentContainerStyle={styles.container}
        removeClippedSubviews={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
FilterCond.propTypes = {
  onSearch: PropTypes.func,
};

const styles = StyleSheet.create({
  container: { paddingVertical: 30 },
});

export default FilterCond;
