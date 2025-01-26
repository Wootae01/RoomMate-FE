import { StyleSheet, View } from 'react-native';
import { PRIMARY, WHITE } from '../colors';
import DropDownPicker from 'react-native-dropdown-picker';
import { useEffect, useState } from 'react';

export const DORMS = {
  //기숙사 정보
  GAE_SUNG_JAE: {
    name: '개성재',
    details: [
      { label: '진리관', value: 'JINLI' },
      { label: '정의관', value: 'JEONGUI' },
      { label: '개척관', value: 'GAECHUCK' },
      { label: '계양원', value: 'GAEYANG' },
    ],
  },
  YANG_SUNG_JAE: {
    name: '양성재',
    details: [
      { label: '신민관', value: 'SINMIN' },
      { label: '지선관', value: 'JISUN' },
    ],
  },
  YANG_JIN_JAE: {
    name: '양진재',
    details: [
      { label: '인의관', value: 'INUI' },
      { label: '예지관', value: 'YEJI' },
    ],
  },
  YANG_HYEON_JAE: {
    name: '양현재',
    details: [
      { label: '청운관', value: 'CHEONGWOON' },
      { label: '등용관', value: 'DEUNGYOUNG' },
    ],
  },
};

const DormDropDown = () => {
  const [dormOpen, setDormOpen] = useState(false);
  const [dormValue, setDormValue] = useState(null); //처음 선택한 기숙사
  const [dormItems] = useState(getDormItems());

  const [detailOpen, setDetailOpen] = useState(false);
  const [detailValue, setDetailValue] = useState(null);
  const [detaliItems, setDetailItems] = useState([
    { label: '기숙사를 먼저 선택해 주세요', value: null },
  ]);

  //선택한 기숙사 변경되면 그 세부 목록도 바뀜
  useEffect(() => {
    if (dormValue) {
      setDetailItems(getDetailItmes(dormValue));
      setDetailValue(null);
    }
  }, [dormValue]);
  return (
    <View style={styles.container}>
      <View style={styles.dropDwonWrapper}>
        <DropDownPicker
          open={dormOpen}
          value={dormValue}
          items={dormItems}
          setOpen={setDormOpen}
          setValue={setDormValue}
          placeholder="기숙사"
          style={styles.dropdown}
          selectedItemLabelStyle={{ color: WHITE }}
          selectedItemContainerStyle={{ backgroundColor: PRIMARY.DEFAULT }}
          dropDownContainerStyle={styles.dropdownContainer}
          showTickIcon={false}
          zIndex={2000}
        />
      </View>

      <View style={styles.dropDwonWrapper}>
        <DropDownPicker
          open={detailOpen}
          value={detailValue}
          items={detaliItems}
          setOpen={setDetailOpen}
          setValue={setDetailValue}
          placeholder="기숙사 세부 목록"
          style={styles.dropdown}
          selectedItemLabelStyle={{ color: WHITE }}
          selectedItemContainerStyle={{ backgroundColor: PRIMARY.DEFAULT }}
          dropDownContainerStyle={styles.dropdownContainer}
          showTickIcon={false}
          zIndex={1000}
        />
      </View>
    </View>
  );
};
const getDormItems = () =>
  Object.entries(DORMS).map(([key, value]) => ({
    label: value.name,
    value: key,
  }));

const getDetailItmes = (dormKey) =>
  DORMS[dormKey]?.details || ['기숙사를 먼저 선택해 주세요'];

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flexDirection: 'row',
  },
  dropDwonWrapper: {
    flex: 1,
    margin: 5,
  },
  dropdown: {
    backgroundColor: WHITE,
    borderColor: '#cccccc',
    borderRadius: 5,
    marginTop: -55,
    marginBottom: 10,
  },
  dropdownContainer: {
    backgroundColor: WHITE,
    marginTop: -55,
  },
});

export default DormDropDown;
