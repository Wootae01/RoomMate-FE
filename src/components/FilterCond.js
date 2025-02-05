import { FlatList, StyleSheet } from 'react-native';
import { BLACK, PALETTES, WHITE } from '../colors';
import { SURVEY } from '../surveyConstants';
import Button from './Button';

{
  /**추천 목록 상단에 나오는 검색 조건 */
}
const FilterCond = () => {
  return (
    <FlatList
      data={Object.entries(SURVEY)}
      keyExtractor={([key]) => key}
      renderItem={({ item: [key, { name }] }) => (
        <Button
          key={key}
          title={name}
          onPress={() => {}}
          customStyles={{
            button: {
              backgroundColor: WHITE,
              borderWidth: 1,
              width: 90,
              paddingVertical: 5,
              marginRight: 10,
              borderRadius: 5,
            },
            title: { color: BLACK, fontSize: 10 },
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
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 30 },
});

export default FilterCond;
