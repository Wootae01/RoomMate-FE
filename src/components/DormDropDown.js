import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { PRIMARY, WHITE } from '../colors';

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

const DormDropDown = ({ detailValue, setDetailValue }) => {
  const [dormOpen, setDormOpen] = useState(false);
  const [dormValue, setDormValue] = useState(null); //처음 선택한 기숙사
  const [dormItems] = useState(getDormItems());

  const [detailOpen, setDetailOpen] = useState(false);
  const [detaliItems, setDetailItems] = useState([
    { label: '기숙사를 먼저 선택해 주세요', value: null },
  ]);

  // 부모에서 전달받은 detailValue가 변경될 때 dormValue와 세부 목록을 동기화
  useEffect(() => {
    if (detailValue) {
      const dormKey = getDorm(detailValue);
      if (dormKey) {
        setDormValue(dormKey);
      }
    }
  }, [detailValue]);

  //선택한 기숙사 변경되면 그 세부 목록도 바뀜.
  //부모에서 detailValue를 전달 받아 dormValue 값이 바뀌었다면, detailValue null로 초기화 안함
  useEffect(() => {
    if (dormValue) {
      const newDetailItems = getDetailItmes(dormValue);
      setDetailItems(newDetailItems);

      if (!newDetailItems.find((item) => item.value === detailValue)) {
        setDetailValue(null);
      }
    }
  }, [dormValue, setDetailValue, detailValue]);

  return (
    <View style={styles.container}>
      <View style={styles.dropDwonWrapper}>
        <DropDownPicker
          listMode="SCROLLVIEW"
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
          listMode="SCROLLVIEW"
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

DormDropDown.propTypes = {
  detailValue: PropTypes.string,
  setDetailValue: PropTypes.func,
};

const getDormItems = () =>
  Object.entries(DORMS).map(([key, value]) => ({
    label: value.name,
    value: key,
  }));

const getDetailItmes = (dormKey) =>
  DORMS[dormKey]?.details || ['기숙사를 먼저 선택해 주세요'];

const getDorm = (value) => {
  for (const key in DORMS) {
    const details = DORMS[key].details;
    for (let i = 0; i < details.length; i++) {
      if (details[i].value === value) {
        return key;
      }
    }
  }
  return undefined;
};

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
